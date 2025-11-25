import { markRaw }                          from "vue";
import AuthPropsBuilder                     from "@/modules/auth_module/base_logic/auth_props_builder";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";
import BaseEventHandler                     from "@ui/version_2/base_classes/base_event_handler";
import RegisteredAppAPIService              from "@/api_services/registered_app_api_service";
import DatasourceAPIService                 from "@/api_services/datasource_api_service";
import { BaseControllerInterface }          from "@ui/version_2/types/component_type";
import { 
    OpenNewModalPayloadInterface, 
    StatusPayloadOptionsInterface 
} from "@/types/app_event_type";

class BaseFormViewEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    protected redirect_timer: ReturnType<typeof setTimeout> | null = null;
    protected status_alert_options: StatusPayloadOptionsInterface;
    public registered_app_api_service: RegisteredAppAPIService;
    public datasource_api_service: DatasourceAPIService;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager                = ContentManagerUtil.getInstance();
        this.status_alert_options           = { duration: 3000, close_modal: true };
        this.registered_app_api_service     = new RegisteredAppAPIService();
        this.datasource_api_service         = new DatasourceAPIService();
    }

    /** Hook to allow derived classes to react to form updates */
    protected onFormDataUpdated(): void { }

    /** Hooks subclasses must override */
    protected validateFormData(form_data: any, record: any): { v_state: boolean; v_msg: string } {
        throw new Error("validateFormData() must be implemented by subclass");
    }

    protected async executeSubmitAction(record_id: string, form_data: Record<string, any>) {
       if (!this.controller.service) { return {}; }

        if (record_id) {
            return await this.controller.service.executeUpdateRecord(record_id, form_data);
        }

        return await this.controller.service.executeCreateRecord(form_data);
    }

    protected getRecordId(record: any): any { 
        const { record_id_key = "id" } = this.controller;
        return record?.id ?? record?.public_id ?? record?.[record_id_key]
    }
    

    // Method to hide error alert
    public hideErrorAlert() {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
    }

    // Method to show error alert
    public showErrorAlert(status: string, message: string) {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this, status, message);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
    }

    /** Reset toast alert */
    public handleOnCloseToastAlertClick() {
        this.controller.state_refs.toast_alert_props.status = "";
        this.controller.state_refs.toast_alert_props.message = "";
    }

    /** Handle form input changes */
    public handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
        if (!target) return;

        const input_id          = target.id;
        const input_value       = input_model_value === undefined ? target.value : input_model_value;
        const new_form_data     = InputTransformerUtil.buildFormDataObject(input_id, input_value, this.form_data);
        this.form_data          = { ...this.form_data, ...new_form_data };

        this.onFormDataUpdated();
    }

    /** Generic submit handler — subclasses override hooks */
    public async handleSubmitBtnClick(event: MouseEvent) {
        this.hideErrorAlert();
        try {
            const record                = this.controller.props?.record ?? {};
            const record_id             = this.getRecordId(record);
            const event_name            = record_id ? "on_record_updated" : "on_new_record_created";
            const { v_state, v_msg }    = this.validateFormData(this.form_data, record);

            if (!v_state) {
                const msg = this.content_manager.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", msg);
            }

            const { s_state, s_msg, s_data, logout }    = await this.executeSubmitAction(record_id, this.form_data);
            const formatted_msg                         = this.content_manager.getAPIResponseValue(s_msg);

            if (logout) { return await this.controller.router.push("/logout"); }

            if (!s_state) { return this.showErrorAlert("error", formatted_msg); }

            const payload           = { status: "success", message: formatted_msg, options: this.status_alert_options };
            const event_payload     = { record_id, record: s_data };

            this.controller.event_bus.emit("statusChanged", payload);
            this.controller.event_bus.emit(event_name, event_payload);
        } 
        catch (error) {
            this.logger.error("Form submit failed", { error });
        }
    }

}

export default BaseFormViewEventHandler;

