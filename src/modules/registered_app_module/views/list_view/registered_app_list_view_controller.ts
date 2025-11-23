
import BaseListViewController               from "@/base_classes/list_view/base_list_view_controller";
import RegisteredAppListViewEventHandler    from "./registered_app_list_view_event_handler";
import RegisteredAppMenuListConfig          from "@/configs/menu_list_configs/registered_app_menu_list_config";
import RegisteredAppTableColumnConfig       from "@/configs/table_column_config/registered_app_table_column_config";
import RegisteredAppUIService                 from "../../base_logic/registered_app_ui_service";


class RegisteredAppListViewController extends BaseListViewController {
    constructor(props: Record<string, any> = {}) {
        super("registered_app_list_view", props);
        this.initializeDependencies();
    }

    protected getMenuListConfig() { return RegisteredAppMenuListConfig; }

    protected getTableColumnConfig() { return RegisteredAppTableColumnConfig; }

    protected initializeDependencies(): void {
        this.event_handler          = new RegisteredAppListViewEventHandler(this);
        this.service                = new RegisteredAppUIService(this);
        this.content_field_key      = "registered_app_view_ui";
        this.record_id_key          = "public_id";
        this.bulk_action_btn_id     = "RegisteredAppBulkActionBtn";
        this.bulk_action_menu_id    = "RegisteredAppBulkActionMenu";
    }
}



export default RegisteredAppListViewController;