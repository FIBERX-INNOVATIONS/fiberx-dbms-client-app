import { ref, }                                 from "vue";
import BaseFormViewController                   from "@/base_classes/form_view/base_form_view_controller";
import SchemaAccessUIService                    from "@/modules/schema_access_module/base_logic/schema_access_ui_service";
import SchemaAccessFormEventHandler             from "@/modules/schema_access_module/views/form_view/schema_access_form_view_event_handler";
import { CSRF_TOKEN_FOR }                       from "@/enums/constants.enums";
import { InputUIEventMethodsPropsInterface }    from "@ui/version_2/types/props_builder_type";
import { SchemaAccessDefinitionInterface }      from "@/types/schema_type";
import { SchemaAccessUpdatedPayloadInterface }  from "@/types/app_event_type";




class SchemaAccessFormViewController extends BaseFormViewController {
    public service: SchemaAccessUIService;
    public event_handler: SchemaAccessFormEventHandler;
    public record_id_key: string = "id";

    constructor(props: Record<string, any> = {}) {
        super("schema_access_form_view_ui", props);

        this.service            = new SchemaAccessUIService(this);
        this.event_handler      = new SchemaAccessFormEventHandler(this);

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

    // Method initialize dependencies
    protected initializeDependencies(): void {
        this.csrf_token_for         = CSRF_TOKEN_FOR.SCHEMA_ACCESS;
        this.form_content_data =     this.content_manager?.get("content_resource.schema_access_view_ui.form_view_ui.fieldset") ?? {};
    };

    // Method to get ui state data
    protected getFormUIStateData (): Record<string, any> {  
        const { record = {} } = this.props;
        const { schema_id, permissions = [], schema = {}, registered_app = {} } =  record

        const app_public_id                         = registered_app?.public_id ?? "";
        const schema_access_array                   = schema_id ? [ { schema_id, schema_name: schema?.name, permissions }] : [] as SchemaAccessDefinitionInterface[];
        this.form_data                              = { app_public_id, schema_access_array };
        this.event_handler.form_data                = JSON.parse(JSON.stringify(this.form_data));
        const input_event_methods                   = this.getSchemaAppEventMethods();
        const is_read_only                          = (record && record?.registered_app && record?.registered_app.name ? true : false);

        return {
            csrf_token: ref(null), 

            app_public_id: ref(app_public_id),

            schema_access_array: ref(schema_access_array),

            schema_app_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "app_public_id", app_public_id, "select_search", is_read_only, registered_app, input_event_methods),

            schema_designer_content_data: ref(this.form_content_data?.schema_access_designer_ui ?? {}), 
        } 
    }

    // Method to handle on mount logic
    protected async formMountedLogic (): Promise<void> { 
        this.event_bus.on("on_schema_access_arrayupdated", async (payload: SchemaAccessUpdatedPayloadInterface) => {
            this.event_handler.handleSchemaAccessArrayUpdated(payload);
        });
    }

}

export default SchemaAccessFormViewController;

