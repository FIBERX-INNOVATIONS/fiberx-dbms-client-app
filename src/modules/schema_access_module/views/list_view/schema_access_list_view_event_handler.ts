
import BaseListViewEventHandler                 from "@/base_classes/list_view/base_list_view_event_handler";
import SchemaAccessTableColumnConfig            from "@/configs/table_column_config/schema_access_table_column_config";
import SchemaAccessFormView                     from "../form_view/schema_access_form_view.vue";
import SchemaAccessProfileView                  from "../profile_view/schema_access_profile_view.vue";
import RegisteredAppAPIService                  from "@/api_services/registered_app_api_service";
import { BaseControllerInterface }              from "@ui/version_2/types/component_type";
import { RequestQueryInputInterface }           from "@/types/api_service_type";
import InputTransformerUtil from "@ui/version_2/utils/input_formatter_util";

class SchemaAccessListViewEventHandler extends BaseListViewEventHandler {
    public registered_app_api_service: RegisteredAppAPIService;

    constructor(controller: BaseControllerInterface) {
        super(controller, SchemaAccessTableColumnConfig, SchemaAccessProfileView, SchemaAccessFormView);

        this.form_modal_config              = { position: "center", width_class: "w-[60%]" };
        this.registered_app_api_service     = new RegisteredAppAPIService();
    }

    // Method to get modal_title value
    public getModalTitleValue (record: Record<string, any>): string | null  { 
        if(!record?.registered_app && !record?.schema) { return null }

        return `${record?.registered_app?.name ?? ""} - ${InputTransformerUtil.spaceCamelCase(record?.schema?.name ?? "")}`
    }

     // Method to fetch preview registered apps
    public async fetchPreviewRegisteredApps (params: Record<string, any>): Promise<any> {
        return this.registered_app_api_service.getAllRegisteredApps(params as RequestQueryInputInterface);
    }

     // Method to render registered app label in select search
    public renderRegisteredAppLabel (record: Record<string, any>): string {
        if(!record || !record?.public_id || !record?.name) { return "" }

        const { public_id, name, logo_utl } = record;
        return `[${public_id}] ${name}`;
    }

    // Method to get registered app value
    public getRegisteredAppValue (record: Record<string, any>): string { return record?.public_id ?? "" }

    /** Handle form input changes */
    public async handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!target) return;

        const input_value       = input_model_value === undefined ? target.value : input_model_value;
        
        this.updateControllerAttributes({ app_id: input_value })

        await this.handleFetchRecords();
    }
}

export default SchemaAccessListViewEventHandler