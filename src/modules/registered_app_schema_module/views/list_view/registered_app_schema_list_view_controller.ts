import BaseListViewController                       from "@/base_classes/base_list_view_controller";
import RegisteredAppSchemaListViewEventHandler      from "@/modules/registered_app_schema_module/views/list_view/registered_app_schema_list_view_event_hanlder";
import RegisteredAppSchemaMenuListConfig            from "@/configs/menu_list_configs/registered_app_schema_menu_list_config";
import RegisteredAppSchemaTableColumnConfig         from "@/configs/table_column_config/registered_app_schema_table_column_config";
import RegisteredAppSchemaService                   from "@/modules/registered_app_schema_module/base_logic/registered_app_schema_service";


class RegisteredAppSchemaListViewController extends BaseListViewController {
    constructor(props: Record<string, any> = {}) {
        super("registered_app_schema_list_view", props);
        this.initializeDependencies();
    }

    protected getMenuListConfig() { return RegisteredAppSchemaMenuListConfig; }

    protected getTableColumnConfig() { return RegisteredAppSchemaTableColumnConfig; }

    protected initializeDependencies(): void {
        this.event_handler          = new RegisteredAppSchemaListViewEventHandler(this);
        this.service                = new RegisteredAppSchemaService(this);
        this.content_field_key      = "registered_app_schema_view_ui";
        this.record_id_key          = "id";
        this.bulk_action_btn_id     = "RegisteredAppSchemaBulkActionBtn";
        this.bulk_action_menu_id    = "RegisteredAppSchemaBulkActionMenu";
    }
}

export default RegisteredAppSchemaListViewController;