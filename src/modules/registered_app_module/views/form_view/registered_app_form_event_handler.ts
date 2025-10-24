
import { markRaw }                      from "vue";
import AuthPropsBuilder                 from "@/modules/auth_module/base_logic/auth_props_builder";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";
import RegisteredAppValidator           from "@/validators/regsitered_app_validator";
import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }      from "@ui/version_2/types/component_type";
import { RegisterAppFormDataInterface } from "@/types/api_service_type";
import { 
    OpenNewModalPayloadInterface, 
    StatusPayloadOptionsInterface }     from "@/types/app_event_type";


class RegisteredAppFormEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;
    private status_alert_options: StatusPayloadOptionsInterface;


    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager                = ContentManagerUtil.getInstance();
        this.status_alert_options           = { duration: 3000, close_modal: true };
    }
    

    // Method to hide error alert
    private hideErrorAlert() {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
    }

    // Method to show error alert
    private showErrorAlert(status: string, message: string) {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this, status, message);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
    }

    // Method to update controller social links object with form data
    private handleUpdateSocialLinksObjects (): boolean {
        const form_data_social_links = this.form_data?.social_links;

        if(!form_data_social_links || !Object.keys(form_data_social_links).length) { return false }

        const updated_social_link = this.controller.buildSocialLinkObject(form_data_social_links);

        this.controller.state_refs.social_links_obj.value = updated_social_link;

        return true;
    }

    // Method to add new social link on btn clicked
    public handleAddNewSocialLink (event: MouseEvent) {
        this.hideErrorAlert();

        const social_links              = { ...this.controller.state_refs.social_links_obj.value };
        const all_social_links_keys     = Object.keys(social_links)
        const active_social_links_keys  = all_social_links_keys.filter(key => !social_links[key]?.is_deleted);
        const all_keys_length           = all_social_links_keys.length;
        const active_keys_length        = active_social_links_keys.length;
        const keys_last_index           = active_keys_length > 0 ? active_keys_length - 1 : 0;


        if(active_keys_length > 0) {
            const last_link_id = active_social_links_keys[keys_last_index];

            const { key, url_value } = social_links[last_link_id];

            const { v_state, v_msg } = RegisteredAppValidator.validateSocialLinkRecord(key, url_value);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }
        }

        const new_link_id           = `Link_${all_keys_length + 1}`;
        social_links[new_link_id]   = { key: "", url_value: "", is_deleted: false }

        // update reactive ref
        this.controller.state_refs.social_links_obj.value = social_links;
    }

    // Method to remove social link on btn clicked
    public handleRemoveSocialLink (event: MouseEvent, social_link_id: string, social_link_key_input_id: string) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!social_link_id || !social_link_key_input_id) { return; }

        const social_links          = { ...this.controller.state_refs.social_links_obj.value };
        const link_to_delete        = social_links[social_link_id];

        if(!link_to_delete) { return }

        const { key, url_value } = link_to_delete

        if (this.form_data?.social_links?.[key]) { 
            delete this.form_data?.social_links[key]
        }

        social_links[social_link_id].is_deleted = true;

       this.controller.state_refs.social_links_obj.value = social_links;
    }

    // Method to handle on toast alert close button
    public handleOnCloseToastAlertClick (event: MouseEvent) {
        this.controller.state_refs.toast_alert_props.status = "";
        this.controller.state_refs.toast_alert_props.message = "";
    }

    // Method to handle on input changed
    public handleOnInputchanged (event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!target) { return; }

        const input_id          = target.id;
        const input_value       = input_model_value ?? target.value;
        const new_form_data     = InputTransformerUtil.buildFormDataRecord(input_id, input_value, this.form_data );
        this.form_data          = JSON.parse(JSON.stringify(new_form_data));

        if(this.form_data?.social_links) { this.handleUpdateSocialLinksObjects(); }
    }

    // Method to handle login submit btn click
    public async handleSubmitBtnClick (event: MouseEvent) {
        this.hideErrorAlert()
        try {
            const record                = this.controller.props?.record ?? {}
            const record_id             = record?.public_id;
            const event_name            = record_id ? "on_record_updated" : "on_new_record_created";
            const form_data             = this.form_data  as RegisterAppFormDataInterface;
            const { v_state, v_msg }    = RegisteredAppValidator.validateRegisteredAppInput(form_data, record);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }

            if(!this.controller?.service) { return }

            let s_state, s_msg, s_data, logout;

            if(record_id) {
                ({ s_state, s_msg, s_data, logout } = await this.controller.service?.executeUpdateRegisteredApp(record_id, form_data))
            }
            else {
                ({ s_state, s_msg, s_data, logout } = await this.controller.service?.executeRegisterNewApp(form_data))
            }

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(s_msg);
                return this.showErrorAlert("error", error_msg)
            }

            const status_alert_payload  = { status: "success", message: s_msg, options: this.status_alert_options };
            const event_payload         = { record_id, record: {...form_data, ...s_data} }

            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            this.controller.event_bus.emit(event_name, event_payload);
            return;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error })
        }
    }
}

export default RegisteredAppFormEventHandler;