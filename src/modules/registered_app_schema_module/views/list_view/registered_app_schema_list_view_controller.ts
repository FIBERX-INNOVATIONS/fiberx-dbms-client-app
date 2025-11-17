import { ref } from "vue";
import BaseListViewController                       from "@/base_classes/list_view/base_list_view_controller";
import RegisteredAppSchemaListViewEventHandler      from "@/modules/registered_app_schema_module/views/list_view/registered_app_schema_list_view_event_hanlder";
import RegisteredAppSchemaMenuListConfig            from "@/configs/menu_list_configs/registered_app_schema_menu_list_config";
import RegisteredAppSchemaTableColumnConfig         from "@/configs/table_column_config/registered_app_schema_table_column_config";
import RegisteredAppSchemaService                   from "@/modules/registered_app_schema_module/base_logic/registered_app_schema_service";
import BaseFormViewPropsBuilder                     from "@/base_classes/form_view/base_form_view_props_builder";
import ContentManagerUtil                           from "@ui/version_2/utils/content_manager_util";
import { InputUIEventMethodsPropsInterface }        from "@ui/version_2/types/props_builder_type";




class RegisteredAppSchemaListViewController extends BaseListViewController {
    public app_id = null;

    constructor(props: Record<string, any> = {}) {
        super("registered_app_schema_list_view", props);
        this.initializeDependencies();
    }

     // Method to get schema app event methods
    private getSchemaAppEventMethods (): InputUIEventMethodsPropsInterface {
        const on_change                         = this.event_handler.handleOnInputchanged.bind(this.event_handler);
        const fetch_method                      = this.event_handler?.fetchPreviewRegisteredApps?.bind(this.event_handler);
        const render_option_label               = this.event_handler?.renderRegisteredAppLabel?.bind(this.event_handler);
        const get_option_value                  = this.event_handler?.getRegisteredAppValue?.bind(this.event_handler);

        return { on_change, render_option_label, get_option_value, fetch_method };

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

    // Method to get ui state data
    protected getCustomUIStateData(): Record<string, any> { 
        const event_methods                     = this.getSchemaAppEventMethods();
        const content_manager                   = ContentManagerUtil.getInstance();
        const select_filter_field_content_data  = content_manager?.get(`content_resource.${this.content_field_key}.select_filter_field`) ?? {};

        return {
            app_id: ref(this.app_id),

            select_filter_input_props: BaseFormViewPropsBuilder.getInputGroupProps(select_filter_field_content_data, "app_id",  this.app_id ?? "", "select_search", false, {}, event_methods),
        }
    }

}

export default RegisteredAppSchemaListViewController;