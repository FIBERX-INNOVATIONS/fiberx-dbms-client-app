

import BaseFormViewEventHandler                 from "@/base_classes/form_view/base_form_view_event_handler";
import SchemaAccessValidator                    from "@/validators/schema_access_validator";
import { SchemaAccessUpdatedPayloadInterface }  from "@/types/app_event_type";
import { 
    SchemaAccessFormDataInputInterface, 
    RequestQueryInputInterface 
} from "@/types/validation_type";



class SchemaAccessFormViewEventHandler extends BaseFormViewEventHandler {
    protected onFormDataUpdated() {
        this.controller.state_refs.app_public_id.value = this.form_data.app_public_id;
     }

    protected validateFormData(form_data: SchemaAccessFormDataInputInterface, record: Record<string, any>) {
        return SchemaAccessValidator.validateSchemaAccessInput(form_data, record);
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

    // Method to handle update schema access array
    public handleSchemaAccessArrayUpdated (payload: SchemaAccessUpdatedPayloadInterface) {
        const { schema_access_array }                           = payload;
        this.form_data.schema_access_array                      = [...schema_access_array];
        this.controller.state_refs.schema_access_array.value    = [...schema_access_array];
    }
}

export default SchemaAccessFormViewEventHandler;