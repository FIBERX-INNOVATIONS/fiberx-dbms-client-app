
import { markRaw }                      from "vue";
import AuthPropsBuilder                 from "@/modules/auth_module/base_logic/auth_props_builder";
import RegisteredAppAPIService          from "@/api_services/registered_app_api_service";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";
import DatasourceValidator              from "@/validators/datasource_validator";
import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }      from "@ui/version_2/types/component_type";

import { 
    DatasourceFormDataInterface, 
    RequestQueryInputInterface }        from "@/types/api_service_type";
    
import { 
    OpenNewModalPayloadInterface, 
    StatusPayloadOptionsInterface }     from "@/types/app_event_type";


class DatasourceFormViewEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;
    private status_alert_options: StatusPayloadOptionsInterface;
    private registereda_app_api_service: RegisteredAppAPIService;


    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager                = ContentManagerUtil.getInstance();
        this.status_alert_options           = { duration: 3000, close_modal: true };
        this.registereda_app_api_service    = new RegisteredAppAPIService();
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
    private handleUpdateConnectionInfoObjects (): boolean {
        const form_data_connection_info = this.form_data?.connection_info;

        if(!form_data_connection_info || !Object.keys(form_data_connection_info).length) { return false }

        const updated_connection_info = this.controller.buildConnectionInfoObject(form_data_connection_info);

        this.controller.state_refs.connection_info_obj.value = updated_connection_info;

        return true;
    }

    // Method to add new social link on btn clicked
    public handleAddNewConnectionInfo (event: MouseEvent) {
        this.hideErrorAlert();

        const connection_info               = { ...this.controller.state_refs.connection_info_obj.value };
        const all_connection_info_keys      = Object.keys(connection_info)
        const active_connection_info_keys   = all_connection_info_keys.filter(key => !connection_info[key]?.is_deleted);
        const all_keys_length               = all_connection_info_keys.length;
        const active_keys_length            = active_connection_info_keys.length;
        const keys_last_index               = active_keys_length > 0 ? active_keys_length - 1 : 0;


        if(active_keys_length > 0) {
            const last_link_id = active_connection_info_keys[keys_last_index];

            const { key, value } = connection_info[last_link_id];

            const { v_state, v_msg } = DatasourceValidator.validateConnectionInfoRecord(key, value);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }
        }

        const new_link_id               = `Connection_Info_${all_keys_length + 1}`;
        connection_info[new_link_id]   = { key: "", value: "", is_deleted: false }

        // update reactive ref
        this.controller.state_refs.connection_info_obj.value = connection_info;
    }

    // Method to remove social link on btn clicked
    public handleRemoveConnectionInfo (event: MouseEvent, connection_info_id: string, connection_info_key_input_id: string) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!connection_info_id || !connection_info_key_input_id) { return; }

        const connection_info       = { ...this.controller.state_refs.connection_info_obj.value };
        const link_to_delete        = connection_info[connection_info_id];

        if(!link_to_delete) { return }

        const { key, value } = link_to_delete

        if (this.form_data?.connection_info?.[key]) { 
            delete this.form_data?.connection_info[key]
        }

        connection_info[connection_info_id].is_deleted = true;

       this.controller.state_refs.connection_info_obj.value = connection_info;
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

        if(this.form_data?.connection_info) { this.handleUpdateConnectionInfoObjects(); }
    }

    // Method to fetch preview registered apps
    public async fetchPreviewRegisteredApps (params: RequestQueryInputInterface) {
       return this.registereda_app_api_service.getAllRegisteredApps(params);
    }

    // Method to handle login submit btn click
    public async handleSubmitBtnClick (event: MouseEvent) {
        this.hideErrorAlert()
        try {
            const record                = this.controller.props?.record ?? {}
            const record_id             = record?.id;
            const event_name            = record_id ? "on_record_updated" : "on_new_record_created";
            const form_data             = this.form_data  as DatasourceFormDataInterface;
            const { v_state, v_msg }    = DatasourceValidator.validateDatasourceInput(form_data, record);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }

            if(!this.controller?.service) { return }

            let s_state, s_msg, s_data, logout;

            if(record_id) {
                ({ s_state, s_msg, s_data, logout } = await this.controller.service?.executeUpdateDatasource(Number(record_id), form_data))
            }
            else {
                ({ s_state, s_msg, s_data, logout } = await this.controller.service?.executeRegisterNewDatasource(form_data))
            }

            const formmated_status_msg = this.content_manager?.getAPIResponseValue(s_msg);

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) { return this.showErrorAlert("error", formmated_status_msg); }

            const status_alert_payload  = { status: "success", message: formmated_status_msg, options: this.status_alert_options };
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

export default DatasourceFormViewEventHandler;