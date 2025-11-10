
import BaseListViewEventHandler     from "@/base_classes/list_view/base_list_view_event_handler";
import DatasourceTableColumnConfig  from "@/configs/table_column_config/datasource_table_column_config";
import DatasourceFormView           from "../form_view/datasource_form_view.vue";
import DatasourceProfileView        from "../profile_view/datasource_profile_view.vue";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

class DatasourceListViewEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, DatasourceTableColumnConfig, DatasourceProfileView, DatasourceFormView);
    }

    // Method to handle delete confim
    public async handleConfirmCreateInstance (event: Event | InputEvent, record: Record<string, any> = {}) {
        const { is_active, is_created, name } = record;

        if(is_active || is_created) { return };

        const on_confirm_click = (event: MouseEvent) => { this.handleCreateRecordInstance(event, record); }
        
        this.handleOpenConfirmModal("confirm_create_instance_modal", name, on_confirm_click);
        return;
    }

    // Method to handle delete confim
    public async handleConfirmDestroyInstance (event: Event | InputEvent, record: Record<string, any> = {}) {
        const { is_active, is_created, name } = record;

        if(is_active || !is_created) { return };

        const on_confirm_click = (event: MouseEvent) => { this.handleDestroyRecordInstance(event, record); }
        
        this.handleOpenConfirmModal("confirm_destroy_instance_modal", name, on_confirm_click);
        return;
    }

    // Method to handle create a datasource instance on confirm btn click
    public async handleCreateRecordInstance (event: MouseEvent | InputEvent, record: Record<string, any> = {}) {
        if(record.is_active || record.is_created) { return };

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

            const { s_state, s_msg, logout }    = await this.controller.service?.executeChangeRecordCreatedState(record_id);
            const formmated_status_msg          = this.content_manager?.getAPIResponseValue(s_msg);

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) {
                status_alert_payload.message = formmated_status_msg
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            status_alert_payload.status     = "success";
            status_alert_payload.message    = formmated_status_msg
            const event_payload             = { record_id, record: { is_created: true } };

            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            this.controller.event_bus.emit(event_name, event_payload);
            return;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to create record instance`, { error })
        }
    }

    // Method to handle destroy a datasource instance on confirm btn click
    public async handleDestroyRecordInstance (event: MouseEvent | InputEvent, record: Record<string, any> = {}) {
        if(record.is_active || !record.is_created) { return };

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

            const { s_state, s_msg, logout }    = await this.controller.service?.executeChangeRecordCreatedState(record_id);
            const formmated_status_msg          = this.content_manager?.getAPIResponseValue(s_msg);

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) {
                status_alert_payload.message = formmated_status_msg
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            status_alert_payload.status     = "success";
            status_alert_payload.message    = formmated_status_msg
            const event_payload             = { record_id, record: { is_created: false } };

            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            this.controller.event_bus.emit(event_name, event_payload);
            return;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to create record instance`, { error })
        }
    }

}

export default DatasourceListViewEventHandler;