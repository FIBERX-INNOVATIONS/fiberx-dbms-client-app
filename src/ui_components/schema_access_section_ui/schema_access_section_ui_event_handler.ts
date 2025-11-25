
import { markRaw }                              from "vue";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                         from "@ui/version_2/base_classes/base_event_handler";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import RegisteredAppSchemaAPIService            from "@/api_services/registered_app_schema_api_service";
import { BaseControllerInterface }              from "@ui/version_2/types/component_type";
import { InputUIEventMethodsPropsInterface }    from "@ui/version_2/types/props_builder_type";
import { RequestQueryInputInterface }           from "@/types/api_service_type";


class SchemaAccessSectionUIEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private registered_app_schema_api_service: RegisteredAppSchemaAPIService

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager                    = ContentManagerUtil.getInstance();
        this.form_data                          = {};
        this.registered_app_schema_api_service  = new RegisteredAppSchemaAPIService();
    }

    // Method to update form data on input changed
    private updateFormDataOnInputChange (new_form_data: Record<string, any>) {
        const combined_form_data = { ...this.form_data, ...new_form_data };
        const { schema_access_array } = combined_form_data;

        for (const schema_access of schema_access_array) {
            const { schema } = schema_access;

            if(!schema?.id) { continue }
            
            schema_access["schema_id"]      = schema?.id;
            schema_access["schema_name"]    = schema?.name;
        }

        console.log({ combined_form_data })
        this.form_data = combined_form_data;
        this.controller.state_refs.schema_access_array.value = [...combined_form_data.schema_access_array];
    }

    // Method to send schema access array updated event
    public onSchemaAccessArrayUpdated (): boolean {
        const schema_access_array = this.form_data.schema_access_array;
        this.controller.event_bus.emit("on_schema_access_array_updated", {schema_access_array});
        return true
    }

    // Method to handle Add new indexes field
    public handleAddNewObjectField (event: MouseEvent) {
        const new_row = { schema_id: 0, schema_name: "", permissions: [] };

        this.controller.state_refs.schema_access_array.value.push(new_row);
        this.form_data.schema_access_array = [ ...this.controller.state_refs.schema_access_array.value ];
        
        this.onSchemaAccessArrayUpdated();
    }

    // Method to remove indexes field
    public handleRemoveObjectField (event: MouseEvent, index_index: number, index_input_id: string) {
        this.controller.state_refs.schema_access_array.value.splice(Number(index_index), 1);
        this.form_data.schema_access_array.splice(Number(index_index), 1);
        this.onSchemaAccessArrayUpdated();
    }


    // Method to fetch preview registered app schemas
    public async fetchPreviewSchemas (params: Record<string, any>): Promise<any> {
        return this.registered_app_schema_api_service.getAllRegisteredAppSchemas(params as RequestQueryInputInterface);
    }

    // Method to render registered app schema label in select search
    public renderSchemaLabel (record: Record<string, any>): string {
        if(!record || !record?.id || !record?.name) { return "" }

        const { id, name } = record;
        return `[${id}] ${name}`;
    }
    
    // Method to get registered app value
    public getSchemaValue (record: Record<string, any>): Record<string, any> { return record }
    

    // Method to handle on input change event
    public handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!target) { return; }

        const input_id          = target.id;
        const input_value       = input_model_value === undefined ? target.value : input_model_value;
        const new_form_data     = InputTransformerUtil.buildFormDataObject(input_id, input_value, this.form_data);
        
        this.updateFormDataOnInputChange(new_form_data);
        this.onSchemaAccessArrayUpdated();
    }

    // Method to get input field event methods 
    public getInputEventMethods (input_type: string = "text"): InputUIEventMethodsPropsInterface {
        const on_change = this.handleOnInputchanged.bind(this);
        
        let event_methods:  InputUIEventMethodsPropsInterface = { on_change };

        if(input_type === "select_search") {
            const fetch_method                      = this?.fetchPreviewSchemas?.bind(this);
            const render_option_label               = this?.renderSchemaLabel?.bind(this);
            const get_option_value                  = this?.getSchemaValue?.bind(this);

            event_methods = { ...event_methods, render_option_label, get_option_value, fetch_method }
        }

        return event_methods
    }

}

export default SchemaAccessSectionUIEventHandler;
