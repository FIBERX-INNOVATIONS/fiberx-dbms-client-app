

import BaseFormViewEventHandler                 from "@/base_classes/form_view/base_form_view_event_handler";
import RolePermissionsValidator                 from "@/validators/role_permissions_validator";
import { InputUIEventMethodsPropsInterface }    from "@ui/version_2/types/props_builder_type";
import { 
    RolePermissionsFormDataInputData, 
    RequestQueryInputInterface 
} from "@/types/validation_type";



class AccessControlRolePermissionsFormViewEventHandler extends BaseFormViewEventHandler {

    protected validateFormData(form_data: RolePermissionsFormDataInputData, record: Record<string, any>) {
    
        const validation_result = RolePermissionsValidator.validateRolePermissionsInput(form_data);

        return validation_result
    }

    protected getRecordId(record: any): any { return null }

    protected async executeSubmitAction(record_id: string, form_data: RolePermissionsFormDataInputData) {
        if (!this.controller.service) { return {}; }

        return await this.controller.service.executeAssignPermissionRecords(form_data);
    }

    // Method to handle fetch member activities
    public async handleFetchRecords () {
        this.controller.state_refs.is_loading.value = true;
        try {
            if(!this.controller?.service) { return }

            const { record } = this.controller.props;

            const { current_page: page, page_size, unassigned_permissions } = this.controller.state_refs;
            
            const params: RequestQueryInputInterface  = { page: page.value, size: page_size.value, preview_only: true, order_by: "created_at", order_direction: "desc" }

            const { s_state, s_msg, s_data, logout }    = await this.controller.service?.executeFetchRoleUnAssignedPermissionRecords?.(record?.id, params);

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(s_msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(logout) { return await this.controller.router.push("/logout"); }

            else if(!s_state) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            const { current_page, records, total_items, total_pages } = s_data;

            this.controller.state_refs.total_pages.value                = total_pages;
            this.controller.state_refs.current_page.value               = current_page;
            this.controller.state_refs.has_more.value                   = (current_page < total_pages);
            this.controller.state_refs.unassigned_permissions.value     = [ ...unassigned_permissions.value, ...records ];
        }
        catch(error: unknown) {
            this.logger.error(`Failed to fetch records`, { error })
        }
        finally { this.controller.state_refs.is_loading.value = false }
    }

    // Method to get input field event methods 
    public getInputEventMethods (input_type: string = "text"): InputUIEventMethodsPropsInterface {
        const on_change = this.handleOnInputchanged.bind(this);
        
        let event_methods:  InputUIEventMethodsPropsInterface = { on_change };

        return event_methods
    }

}

export default AccessControlRolePermissionsFormViewEventHandler;