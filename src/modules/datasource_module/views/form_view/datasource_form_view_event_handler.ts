

import BaseFormViewEventHandler         from "@/base_classes/form_view/base_form_view_event_handler";
import DatasourceValidator              from "@/validators/datasource_validator";
import { 
    DatasourceFormDataInterface, 
    RequestQueryInputInterface 
} from "@/types/api_service_type";


class DatasourceFormViewEventHandler extends BaseFormViewEventHandler {

    private buildConnectionInfoObject (connection_info_array: { key: string; value: string; }[]): Record<string, string> {
        if(!connection_info_array || !connection_info_array.length) { return {} }

        const connection_info_obj: Record<string, string> = {};

        for (const conn of connection_info_array) {
            const { key = "", value = "" } = conn;

            if(!key || !value) { continue };

            connection_info_obj[key] = value; 
        }

        return connection_info_obj
    }

    protected onFormDataUpdated() {
        if(!this.form_data?.connection_info_array?.length) { return }

        this.controller.state_refs.connection_info_array.value = [ ...this.form_data?.connection_info_array ]
    }

    protected validateFormData(form_data: DatasourceFormDataInterface, record: Record<string, any>) {
        form_data.connection_info = this.buildConnectionInfoObject(form_data?.connection_info_array || []);

        const validation_result = DatasourceValidator.validateDatasourceInput(form_data, record);

        if(validation_result.v_state) { this.form_data.connection_info = { ...this.form_data.connection_info, ...form_data.connection_info }}

        return validation_result
    }

    protected async executeSubmitAction(record_id: string, form_data: DatasourceFormDataInterface) {
        if (!this.controller.service) { return {}; }

        if (record_id) {
            return await this.controller.service.executeUpdateRecord(Number(record_id), form_data);
        }

        return await this.controller.service.executeCreateRecord(form_data);
    }

    // Method to build connection info array
    public buildConnectionInfoArray( connection_info: Record<string, string> = {}): Record<string, string>[] {

        if (!connection_info || Object.keys(connection_info).length === 0) {
            return [];
        }

        const connection_info_array: Record<string, string>[] = [];

        // Correct iteration using for...of
        Object.entries(connection_info).forEach(([key, value], index) => {
            connection_info_array.push({ key, value })
        });

        return connection_info_array;
    }

    // Method to add new social link on btn clicked
    public handleAddNewObjectField (event: MouseEvent) {
        this.hideErrorAlert();

        const connection_info_array     = this.controller.state_refs?.connection_info_array?.value || [];

        if(connection_info_array.length) {
            const last_index                = (connection_info_array?.length - 1);
            const { key = "", value = "" }  = connection_info_array?.[last_index];
            const { v_state, v_msg }        = DatasourceValidator.validateConnectionInfoRecord(key, value);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }
        }
        
        this.controller.state_refs.connection_info_array.value.push({ key: "", value: ""});
    }

    // Method to remove social link on btn clicked
    public handleRemoveObjectField (event: MouseEvent, connection_info_index: string, connection_info_key_input_id: string) {
        this.hideErrorAlert();
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        const number_connection_info_index = Number(connection_info_index);

        if (!connection_info_index || !connection_info_key_input_id || !Number.isInteger(number_connection_info_index)) { return; }

       this.controller.state_refs.connection_info_array.value.splice(number_connection_info_index, 1);
       this.form_data.connection_info_array.splice(number_connection_info_index, 1);
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
}

export default DatasourceFormViewEventHandler;