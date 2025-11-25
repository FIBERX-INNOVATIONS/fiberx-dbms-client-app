
import BaseListViewEventHandler                 from "@/base_classes/list_view/base_list_view_event_handler";
import SchemaAccessTableColumnConfig            from "@/configs/table_column_config/schema_access_table_column_config";
import SchemaAccessFormView                     from "../form_view/schema_access_form_view.vue";
import SchemaAccessProfileView                  from "../profile_view/schema_access_profile_view.vue";
import RegisteredAppAPIService                  from "@/api_services/registered_app_api_service";
import { BaseControllerInterface }              from "@ui/version_2/types/component_type";
import { RequestQueryInputInterface }           from "@/types/api_service_type";
import InputTransformerUtil from "@ui/version_2/utils/input_formatter_util";

class SchemaAccessListViewEventHandler extends BaseListViewEventHandler {
    public registered_app_api_service: RegisteredAppAPIService;

    constructor(controller: BaseControllerInterface) {
        super(controller, SchemaAccessTableColumnConfig, SchemaAccessProfileView, SchemaAccessFormView);

        this.form_modal_config              = { position: "center", width_class: "w-[60%]" };
        this.registered_app_api_service     = new RegisteredAppAPIService();
    }

    // Method to get modal_title value
    public getModalTitleValue (record: Record<string, any>): string | null  { 
        if(!record?.registered_app && !record?.schema) { return null }

        return `${record?.registered_app?.name ?? ""} - ${InputTransformerUtil.spaceCamelCase(record?.schema?.name ?? "")}`
    }

     // Method to fetch preview registered apps
    public async fetchPreviewRegisteredApps (params: Record<string, any>): Promise<any> {
        return this.registered_app_api_service.getAllRegisteredApps(params as RequestQueryInputInterface);
    }

     // Method to render registered app label in select search
    public renderRegisteredAppLabel (record: Record<string, any>): string {
        if(!record || !record?.public_id || !record?.name) { return "" }

        const { public_id, name, logo_utl } = record;
        return `[${public_id}] ${name}`;
    }

    // Method to get registered app value
    public getRegisteredAppValue (record: Record<string, any>): string { return record?.public_id ?? "" }

    /** Handle form input changes */
    public async handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!target) return;

        const input_value       = input_model_value === undefined ? target.value : input_model_value;
        
        this.updateControllerAttributes({ app_id: input_value })

        await this.handleFetchRecords();
    }

    // Method to handle oepning confirm modal to grant or revoke access
    public async handleConfirmGrantOrRevokeAccess (event: Event | InputEvent, record: Record<string, any> = {}) {
        const { is_granted }        = record;
        const record_title_text     = this.getModalTitleValue(record);  

        if(!record_title_text) { return }

        const content_data_key      = is_granted ? "confirm_revoke_access_modal" : "confirm_grant_access_modal";
        const on_confirm_click      = (event: MouseEvent) => { this.handleExecuteGrantOrRevokeEvent(event, record); }
        
        this.handleOpenConfirmModal(content_data_key, record_title_text, on_confirm_click);
        return;
    }

    // Method to handle executing grant or revoke access event
    public async handleExecuteGrantOrRevokeEvent (event: MouseEvent | InputEvent, record: Record<string, any> = {}) {
        try {
            const { record_id_key }     = this.controller;
            const record_id             = record?.[record_id_key];
            const event_name            = "on_record_updated";
            const status_alert_payload  = { status: "error", message: "", options: this.status_alert_options };

            if(!record_id) {
                status_alert_payload.message = this.content_manager?.getAPIResponseValue("invalid_record_not_found");
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            if(!this.controller?.service) { return }

            const { s_state, s_msg, logout }    = await this.controller.service?.executeChangeRecordState(record_id);
            const formmated_status_msg          = this.content_manager?.getAPIResponseValue(s_msg);

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) {
                status_alert_payload.message = formmated_status_msg
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            status_alert_payload.status     = "success";
            status_alert_payload.message    = formmated_status_msg
            const event_payload             = { record_id, record: { is_granted: !record.is_granted } };

            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            this.controller.event_bus.emit(event_name, event_payload);
            return;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute grant or revoke event`, { error })
        }
    }
}

export default SchemaAccessListViewEventHandler