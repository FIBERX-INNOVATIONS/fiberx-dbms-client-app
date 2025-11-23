import { ref, }                             from "vue";
import BaseFormViewController               from "@/base_classes/form_view/base_form_view_controller";
import DatasourceUIService                    from "@/modules/datasource_module/base_logic/datasource_ui_service";
import DatasourceFormEventHandler           from "@/modules/datasource_module/views/form_view/datasource_form_view_event_handler";
import { CSRF_TOKEN_FOR }                   from "@/enums/constants.enums";


class DatasourceFormViewController extends BaseFormViewController {
    public service: DatasourceUIService;
    public event_handler: DatasourceFormEventHandler;
    public record_id_key: string = "id";

    constructor(props: Record<string, any> = {}) {
        super("datasource_form_view_ui", props);

        this.service            = new DatasourceUIService(this);
        this.event_handler      = new DatasourceFormEventHandler(this);

        this.initializeDependencies();
    }

    protected initializeDependencies(): void {
        this.csrf_token_for         = CSRF_TOKEN_FOR.DATASOURCE;
        this.form_content_data =     this.content_manager?.get("content_resource.datasource_view_ui.form_view_ui.fieldset") ?? {};
    };

    // Method to get ui state data
    protected getFormUIStateData (): Record<string, any> {  
        const { record = {} } = this.props;
        const { 
            name = "", datasource_type = "",  host = "", username = "", 
            database_name = "", port = 0, connection_info = {}, datasource_app = {}
        } =  record

        const registered_app_public_id  = datasource_app?.public_id ?? "";
        const connection_info_array     = this.event_handler.buildConnectionInfoArray(connection_info);
        const on_change                 = this.event_handler.handleOnInputchanged.bind(this.event_handler);
        const fetch_method              = this.event_handler?.fetchPreviewRegisteredApps?.bind(this.event_handler);
        const render_option_label       = this.event_handler?.renderRegisteredAppLabel?.bind(this.event_handler);
        const get_option_value          = this.event_handler?.getRegisteredAppValue?.bind(this.event_handler);
        const event_methods             = { on_change, render_option_label, get_option_value, fetch_method };
        this.form_data                  = { name, datasource_type,  host, username, database_name, port, connection_info, connection_info_array };
        this.event_handler.form_data    = JSON.parse(JSON.stringify(this.form_data));

        return {
            csrf_token: ref(null), 
            
            connection_info_array: ref(connection_info_array),

            connection_info_label_text: this.form_content_data["connection_info_label_text"],

            no_info_text: this.form_content_data["no_connection_info_text"],

            registered_app_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "registered_app_public_id", registered_app_public_id, "select_search", false, datasource_app, event_methods),

            name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "name", name, "text", false, record, event_methods),

            datasource_type_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "datasource_type", datasource_type, "text", false, record, event_methods),

            host_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "host", host, "text", false, record, event_methods),

            port_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "port", port, "text", false, record, event_methods),

            username_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "username", username, "text", false, record, event_methods),

            database_name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "database_name", database_name, "text", false, record, event_methods),

            add_connection_info_btn_props: this.props_builder.getObjectAddNewFieldBtnProps(this.event_handler),
        } 
    }

}

export default DatasourceFormViewController;

