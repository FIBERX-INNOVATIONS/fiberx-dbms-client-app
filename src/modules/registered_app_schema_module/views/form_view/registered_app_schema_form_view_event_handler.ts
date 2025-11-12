

import BaseFormViewEventHandler         from "@/base_classes/form_view/base_form_view_event_handler";
import RegisteredAppSchemaValidator     from "@/validators/registered_app_schema_validator";
import { 
    RegisteredAppSchemaFormDataInterface, 
    RequestQueryInputInterface 
} from "@/types/api_service_type";


class RegisteredAppSchemaFormViewEventHandler extends BaseFormViewEventHandler {


    protected onFormDataUpdated() { }

    protected validateFormData(form_data: RegisteredAppSchemaFormDataInterface, record: Record<string, any>) {
        return RegisteredAppSchemaValidator.validateRegisteredAppSchemaInput(form_data, record);
    }

    // Method to fetch preview registered apps
    public async fetchPreviewRegisteredApps (params: Record<string, any>): Promise<any> {
       return this.registered_app_api_service.getAllRegisteredApps(params as RequestQueryInputInterface);
    }

    // Method to fetch preview registered apps
    public async fetchPreviewDatasources(params: Record<string, any>): Promise<any> {
       return this.datasource_api_service.getAllDatasources(params as RequestQueryInputInterface);
    }

    // Method to render registered app label in select search
    public renderRegisteredAppLabel (record: Record<string, any>): string {
        if(!record || !record?.public_id || !record?.name) { return "" }

        const { public_id, name, logo_utl } = record;
        return `[${public_id}] ${name}`;
    }

    // Method to get registered app value
    public getRegisteredAppValue (record: Record<string, any>): string { return record?.public_id ?? "" }

    // Method to render registered app label in select search
    public renderDatasourceLabel (record: Record<string, any>): string {
        if(!record || !record?.id || !record?.name) { return "" }

        const { id, name } = record;
        
        return `[${id}] ${name}`;
    }

    // Method to get datasource value
    public getDatasourceValue (record: Record<string, any>): string { return record?.id ?? "" }

    // Method to add new social link on btn clicked
    public handleAddNewObjectField (event: MouseEvent) {
        this.hideErrorAlert();

        
        // update reactive ref
        this.controller.state_refs.columns_obj.value.push({
            id: `col_${Date.now()}`,
            name: "",
            type: { name: "" },
            nullable: false,
            unique: false,
            primary_key: false,
            auto_increment: false,
        });
    }

    // Method to remove social link on btn clicked
    public handleRemoveObjectField (event: MouseEvent, column_index: string, column_key_input_id: string) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        const number_column_index = Number(column_index)
        if (!column_index || !column_key_input_id || !Number.isInteger(number_column_index)) { return; }

        

       this.controller.state_refs.columns_obj.value.splice(number_column_index, 1);
    }
}

export default RegisteredAppSchemaFormViewEventHandler;