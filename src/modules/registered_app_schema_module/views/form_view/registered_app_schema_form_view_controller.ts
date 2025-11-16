import { ref, }                             from "vue";
import BaseFormViewController               from "@/base_classes/form_view/base_form_view_controller";
import RegisteredAppSchemaService           from "@/modules/registered_app_schema_module/base_logic/registered_app_schema_service";
import RegisteredAppSchemaFormEventHandler  from "@/modules/registered_app_schema_module/views/form_view/registered_app_schema_form_view_event_handler";
import { CSRF_TOKEN_FOR }                   from "@/enums/constants.enums";
import { InputUIEventMethodsPropsInterface } from "@ui/version_2/types/props_builder_type";
import { ColumnsArrayUpdatedPayloadInterface, IndexesArrayUpdatedPayloadInterface } from "@/types/app_event_type";


class RegisteredAppSchemaFormViewController extends BaseFormViewController {
    public service: RegisteredAppSchemaService;
    public event_handler: RegisteredAppSchemaFormEventHandler;
    public record_id_key: string = "id";

    constructor(props: Record<string, any> = {}) {
        super("registered_app_schema_form_view_ui", props);

        this.service            = new RegisteredAppSchemaService(this);
        this.event_handler      = new RegisteredAppSchemaFormEventHandler(this);

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

    // Method to get schema datasource event methods
    private getSchemaDatasourceEventMethods (): InputUIEventMethodsPropsInterface {
        const on_change                         = this.event_handler.handleOnInputchanged.bind(this.event_handler);
        const fetch_method                      = this.event_handler?.fetchPreviewDatasources?.bind(this.event_handler);
        const render_option_label               = this.event_handler?.renderDatasourceLabel?.bind(this.event_handler);
        const get_option_value                  = this.event_handler?.getDatasourceValue?.bind(this.event_handler);

        return { on_change, render_option_label, get_option_value, fetch_method };
    }

    // Method initialize dependencies
    protected initializeDependencies(): void {
        this.csrf_token_for         = CSRF_TOKEN_FOR.DATASOURCE;
        this.form_content_data =     this.content_manager?.get("content_resource.registered_app_schema_view_ui.form_view_ui.fieldset") ?? {};
    };

    // Method to get ui state data
    protected getFormUIStateData (): Record<string, any> {  
        const { record = {} } = this.props;
        const { 
            model_name = "", app_id = "", primary_key = "", migration_priority = 0,
            permissions = [], columns = {}, indexes = [], schema_app = {}, schema_datasource = {}
        } =  record

        const app_public_id                         = schema_app?.public_id ?? "";
        const datasource_id                         = schema_datasource?.id ?? 0;
        const columns_array                         = this.event_handler.buildColumnsArray(columns);
        this.form_data                              = { app_public_id, datasource_id, model_name, primary_key, migration_priority, permissions, columns, indexes, columns_array };
        this.event_handler.form_data                = JSON.parse(JSON.stringify(this.form_data));
        const text_input_event_methods              = { on_change: this.event_handler.handleOnInputchanged.bind(this.event_handler) };
        const schema_app_input_event_methods        = this.getSchemaAppEventMethods();
        const schema_datasource_input_event_methods = this.getSchemaDatasourceEventMethods();

        return {
            csrf_token: ref(null), 

            columns_array: ref(columns_array),

            indexes: ref(indexes),

            schema_designer_content_data: ref(this.form_content_data?.schema_designer_ui ?? {}),

            schema_app_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "app_public_id", app_public_id, "select_search", false, schema_app, schema_app_input_event_methods),

            schema_datasource_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "datasource_id", datasource_id, "select_search", false, schema_datasource, schema_datasource_input_event_methods),

            model_name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "model_name", model_name, "text", false, record, text_input_event_methods),
            
            migration_priority_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "migration_priority", migration_priority, "number", false, record, text_input_event_methods, { min: 1 }),

            add_columns_btn_props: this.props_builder.getObjectAddNewFieldBtnProps(this.event_handler),
            
        } 
    }

    // Method to handle on mount logic
    protected async formMountedLogic (): Promise<void> { 
        this.event_bus.on("on_columns_array_updated", async (payload: ColumnsArrayUpdatedPayloadInterface) => {
            this.event_handler.handleColumnsArrayUpdate(payload);
        });

        this.event_bus.on("on_indexes_array_updated", async (payload: IndexesArrayUpdatedPayloadInterface) => {
            this.event_handler.handleIndexesArrayUpdate(payload);
        });
    }

}

export default RegisteredAppSchemaFormViewController;

