

import BaseFormViewEventHandler         from "@/base_classes/form_view/base_form_view_event_handler";
import DatasourceValidator              from "@/validators/datasource_validator";
import { 
    DatasourceFormDataInterface, 
    RequestQueryInputInterface 
} from "@/types/api_service_type";


class DatasourceFormViewEventHandler extends BaseFormViewEventHandler {

    // Method to update controller social links object with form data
    private handleUpdateConnectionInfoObjects (): boolean {
        const form_data_connection_info = this.form_data?.connection_info;

        if(!form_data_connection_info || !Object.keys(form_data_connection_info).length) { return false }

        const updated_connection_info = this.controller.buildConnectionInfoObject(form_data_connection_info);

        this.controller.state_refs.connection_info_obj.value = updated_connection_info;

        return true;
    }

    protected onFormDataUpdated() {
        if (this.form_data?.connection_info) { this.handleUpdateConnectionInfoObjects(); }
    }

    protected validateFormData(form_data: DatasourceFormDataInterface, record: Record<string, any>) {
        return DatasourceValidator.validateDatasourceInput(form_data, record);
    }

    protected async executeSubmitAction(record_id: string, form_data: DatasourceFormDataInterface) {
        if (!this.controller.service) { return {}; }

        if (record_id) {
            return await this.controller.service.executeUpdateDatasource(Number(record_id), form_data);
        }

        return await this.controller.service.executeRegisterNewDatasource(form_data);
    }

    // Method to add new social link on btn clicked
    public handleAddNewConnectionInfo (event: MouseEvent) {
        this.hideErrorAlert();

        const connection_info               = { ...this.controller.state_refs.connection_info_obj.value };
        const all_connection_info_keys      = Object.keys(connection_info)
        const active_connection_info_keys   = all_connection_info_keys.filter(key => !connection_info[key]?.is_deleted);
        const all_keys_length               = all_connection_info_keys.length;
        const active_keys_length            = active_connection_info_keys.length;
        const keys_last_index               = active_keys_length > 0 ? active_keys_length - 1 : 0;


        if(active_keys_length > 0) {
            const last_link_id = active_connection_info_keys[keys_last_index];

            const { key, value } = connection_info[last_link_id];

            const { v_state, v_msg } = DatasourceValidator.validateConnectionInfoRecord(key, value);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }
        }

        const new_link_id               = `Connection_Info_${all_keys_length + 1}`;
        connection_info[new_link_id]   = { key: "", value: "", is_deleted: false }

        // update reactive ref
        this.controller.state_refs.connection_info_obj.value = connection_info;
    }

    // Method to remove social link on btn clicked
    public handleRemoveConnectionInfo (event: MouseEvent, connection_info_id: string, connection_info_key_input_id: string) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!connection_info_id || !connection_info_key_input_id) { return; }

        const connection_info       = { ...this.controller.state_refs.connection_info_obj.value };
        const link_to_delete        = connection_info[connection_info_id];

        if(!link_to_delete) { return }

        const { key, value } = link_to_delete

        if (this.form_data?.connection_info?.[key]) { 
            delete this.form_data?.connection_info[key]
        }

        connection_info[connection_info_id].is_deleted = true;

       this.controller.state_refs.connection_info_obj.value = connection_info;
    }

    // Method to fetch preview registered apps
    public async fetchPreviewRegisteredApps (params: RequestQueryInputInterface) {
       return this.registered_app_api_service.getAllRegisteredApps(params);
    }

    // Method to handle login submit btn click
    public async handleSubmitBtnClick (event: MouseEvent) {
        this.hideErrorAlert()
        try {
            const record                = this.controller.props?.record ?? {}
            const record_id             = record?.id;
            const event_name            = record_id ? "on_record_updated" : "on_new_record_created";
            const form_data             = this.form_data  as DatasourceFormDataInterface;
            const { v_state, v_msg }    = DatasourceValidator.validateDatasourceInput(form_data, record);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }

            if(!this.controller?.service) { return }

            let s_state, s_msg, s_data, logout;

            if(record_id) {
                ({ s_state, s_msg, s_data, logout } = await this.controller.service?.executeUpdateDatasource(Number(record_id), form_data))
            }
            else {
                ({ s_state, s_msg, s_data, logout } = await this.controller.service?.executeRegisterNewDatasource(form_data))
            }

            const formmated_status_msg = this.content_manager?.getAPIResponseValue(s_msg);

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) { return this.showErrorAlert("error", formmated_status_msg); }

            const status_alert_payload  = { status: "success", message: formmated_status_msg, options: this.status_alert_options };
            const event_payload         = { record_id, record: {...form_data, ...s_data} }

            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            this.controller.event_bus.emit(event_name, event_payload);
            return;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error })
        }
    }
}

export default DatasourceFormViewEventHandler;