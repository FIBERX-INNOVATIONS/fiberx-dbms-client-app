
import BaseListViewEventHandler     from "@/base_classes/list_view/base_list_view_event_handler";
import RolesTableColumnConfig       from "@/configs/table_column_config/roles_table_column_config";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

class AccessControlRoleListViewEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, RolesTableColumnConfig, null, null);
    }

    // Method to get modal_title value
    public getModalTitleValue (record: Record<string, any>): string | null { return record?.name ? `${record?.name ?? ""}`: null}

}

export default AccessControlRoleListViewEventHandler;