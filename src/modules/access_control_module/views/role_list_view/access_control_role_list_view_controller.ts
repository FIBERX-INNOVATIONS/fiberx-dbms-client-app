import BaseListViewController                       from "@/base_classes/list_view/base_list_view_controller";
import AccessControlRoleListViewEventHandler        from "@/modules/access_control_module/views/role_list_view/access_control_role_list_view_event_handler";
import RoleMenuListConfig                           from "@/configs/menu_list_configs/role_menu_list_config";
import RoleTableColumnConfig                        from "@/configs/table_column_config/roles_table_column_config";
import AccessControlUIService                       from "@/modules/access_control_module/base_logic/access_control_ui_service";

class AccessControlRoleListViewController extends BaseListViewController {
    constructor(props: Record<string, any> = {}) {
        super("access_control_role_list_view", props);

        this.initializeDependencies();
        this.allowed_update_records = false;
    }
    
    protected getMenuListConfig() { return RoleMenuListConfig; }

    protected getTableColumnConfig() { return RoleTableColumnConfig; }

    protected initializeDependencies(): void {
        this.event_handler          = new AccessControlRoleListViewEventHandler(this);
        this.service                = new AccessControlUIService(this);
        this.content_field_key      = "access_control_view_ui";
        this.record_id_key          = "id";
        this.bulk_action_btn_id     = "AccessControlRoleListBulkActionBtn";
        this.bulk_action_menu_id    = "AccessControlRoleListBulkActionMenu";
        this.show_create_btn        = this.canShowCreateBtn("");
    }
}

export default AccessControlRoleListViewController;