import BaseListViewController               from "@/base_classes/list_view/base_list_view_controller";
import DatasourceListViewEventHandler       from "@/modules/datasource_module/views/list_view/datasource_list_view_event_handler";
import DatasourceMenuListConfig             from "@/configs/menu_list_configs/datasource_menu_list_config";
import DatasourceTableColumnConfig          from "@/configs/table_column_config/datasource_table_column_config";
import DatasourceUIService                  from "@/modules/datasource_module/base_logic/datasource_ui_service";

class DatasourceListViewController extends BaseListViewController {
    constructor(props: Record<string, any> = {}) {
        super("datasource_list_view", props);
        this.initializeDependencies();
    }

    protected getMenuListConfig() { return DatasourceMenuListConfig; }

    protected getTableColumnConfig() { return DatasourceTableColumnConfig; }

    protected initializeDependencies(): void {
        this.event_handler          = new DatasourceListViewEventHandler(this);
        this.service                = new DatasourceUIService(this);
        this.content_field_key      = "datasource_view_ui";
        this.record_id_key          = "id";
        this.bulk_action_btn_id     = "DatasourceBulkActionBtn";
        this.bulk_action_menu_id    = "DatasourceBulkActionMenu";
        this.show_create_btn        = this.canShowCreateBtn("register_new_datasource");
    }
}

export default DatasourceListViewController;