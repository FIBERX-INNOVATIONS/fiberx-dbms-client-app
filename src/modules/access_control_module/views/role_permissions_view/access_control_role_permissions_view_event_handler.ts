
import ClassStyles                                  from "@/enums/class_styles.enums";
import BaseListViewEventHandler                     from "@/base_classes/list_view/base_list_view_event_handler";
import { BaseControllerInterface }                  from "@ui/version_2/types/component_type";
import { RequestQueryInputInterface }               from "@/types/validation_type";
import ActivityListUIPropsBuilder                   from "@ui/version_2/props_builder/activity_list_props_builder";
import { ActivityListUIRenderMethodsinterface }     from "@ui/version_2/types/props_builder_type";
import { RoleAssignedPermissionInterface }          from "@/types/api_service_type";
import InputTransformerUtil                         from "@ui/version_2/utils/input_formatter_util";

class AccessControlRolePermissionsViewUIEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, null, null, null);

        this.form_modal_config = { position: "center", width_class: "w-[60%]" }
    }

    private getActivityListRenderMethods (): ActivityListUIRenderMethodsinterface {
        const onSelect  = this.handleOnRecordSelected.bind(this);

        const getRecordId = (record: Record<string, any>): string | number => { 
            const typed_record = (record as RoleAssignedPermissionInterface);
            return typed_record?.permission?.id 
        };

        const renderHeaderSection1Content   = (index: number, record: Record<string, any>): string => {
            const typed_record = (record as RoleAssignedPermissionInterface);
            return `${index + 1}. ${InputTransformerUtil.spaceCamelCase(typed_record?.permission?.module_name)}`;
        };

        const renderHeaderSection2Content   = (index: number, record: Record<string, any>): string => {
            const typed_record = (record as RoleAssignedPermissionInterface)
            return `${InputTransformerUtil.formatReadableDateTime(typed_record?.created_at)}`;
        }

        const renderBodyContent = (index: number, record: Record<string, any>): string => {
            const typed_record = (record as RoleAssignedPermissionInterface)
            return `${typed_record?.permission?.description}`;
        }

        return {
            getRecordId,
            onSelect,
            renderHeaderSection1Content,
            renderHeaderSection2Content,
            renderBodyContent
        }
    }

    // Method to handle fetch member activities
    public async handleFetchRecords () {
        this.controller.state_refs.is_loading.value = true;
        try {
            if(!this.controller?.service) { return }

            const { record } = this.controller.props;

            const { current_page: page, size, order_by, order_direction, keyword = null, preview_only = false,  } = this.controller;
            
            const params: RequestQueryInputInterface  = { page, size, order_by, order_direction, keyword, preview_only }

            const { s_state, s_msg, s_data, logout }    = await this.controller.service?.executeFetchRoleAssignedPermissionRecords?.(record?.id, params);

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(s_msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(logout) { return await this.controller.router.push("/logout"); }

            else if(!s_state) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            const { current_page, records, total_items, total_pages } = s_data;

            this.updateControllerAttributes({ current_page, records, total_items, total_pages })
        }
        catch(error: unknown) {
            this.logger.error(`Failed to fetch records`, { error })
        }
        finally { this.controller.state_refs.is_loading.value = false }
    }

    // Method to handle buidling activity list props
    public handleBuildActivityListProps () {
        const { records, selected_records } = this.controller;

        return ActivityListUIPropsBuilder.getActivityListProps(
            records, 
            selected_records, 
            ClassStyles.activity_list_ui, 
            this.getActivityListRenderMethods(),
            true
        );
    }

    // Method to handle update table body props
    public async updateTableBodyProps (updated_array: Record<string, any>[]) {
        if(!Array.isArray(updated_array)) { return }

        const new_activity_list_props = this.handleBuildActivityListProps();

        Object.assign(this.controller.state_refs.activity_list_props, new_activity_list_props); 
    }

    // Method to handle on record selected 
    public async handleOnRecordSelected (event: Event | InputEvent, record: Record<string, any>, checked: boolean) {
        const { selected_records } = this.controller;

        if (!Array.isArray(selected_records)) { return; }

        const typed_record  = (record as RoleAssignedPermissionInterface);
        const record_value  = typed_record?.permission.id;

        if (!record_value) { return; }

        let new_selected_records    = [...selected_records];

        if (checked && !new_selected_records.includes(record_value)) { 
            new_selected_records.push(record_value); 
        } 

        else if (!checked) {
            new_selected_records = new_selected_records.filter( (id) => id !== record_value);  
        }

        this.updateControllerAttributes({ selected_records: new_selected_records });
    }

}

export default AccessControlRolePermissionsViewUIEventHandler;