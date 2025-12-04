
import BaseListViewEventHandler     from "@/base_classes/list_view/base_list_view_event_handler";
import MemberTableColumnConfig      from "@/configs/table_column_config/member_table_column_config";
import MemberFormView               from "../form_view/member_form_view.vue";
import MemberProfileView            from "../profile_view/member_profile_view.vue";
import MemberActivitiesView         from "../activities_view/member_activities_view.vue";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

class MemberListViewEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, MemberTableColumnConfig, MemberProfileView, MemberFormView);
    }

     // Method to get modal_title value
    public getModalTitleValue (record: Record<string, any>): string | null { return record?.full_name ? `${record?.full_name ?? ""}`: null}

    // Method to handle delete confim
    public async handleViewMember2FAInfo (event: Event | InputEvent, record: Record<string, any> = {}) {
        
        return;
    }

    // Method to handle delete confim
    public async handleViewMemberActivities (event: Event | InputEvent, record: Record<string, any> = {}) {

        return;
    }

    // Method to handle delete confim
    public async handleConfirmResetMember2FA (event: Event | InputEvent, record: Record<string, any> = {}) {
        const { full_name } = record;

        const on_confirm_click = (event: MouseEvent) => { this.handleResetMmeber2FA(event, record); }
        
        this.handleOpenConfirmModal("confirm_reset_two_fa_info_modal", full_name, on_confirm_click);
        return;
    }

    // Method to handle create a member instance on confirm btn click
    public async handleResetMmeber2FA (event: MouseEvent | InputEvent, record: Record<string, any> = {}) {
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

            const { s_state, s_msg, logout }    = await this.controller.service?.executeFetchMember2FAInfo(record_id, true);
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

}

export default MemberListViewEventHandler;