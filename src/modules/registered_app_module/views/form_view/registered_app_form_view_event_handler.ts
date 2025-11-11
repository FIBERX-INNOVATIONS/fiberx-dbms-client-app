
import BaseFormViewEventHandler             from "@/base_classes/form_view/base_form_view_event_handler";
import { RegisteredAppFormDataInterface }   from "@/types/api_service_type";
import RegisteredAppValidator               from "@/validators/regsitered_app_validator";

class RegisteredAppFormViewEventHandler extends BaseFormViewEventHandler {

    // Method to update controller social links object with form data
    private handleUpdateSocialLinksObjects (): boolean {
        const form_data_social_links = this.form_data?.social_links;

        if(!form_data_social_links || !Object.keys(form_data_social_links).length) { return false }

        const updated_social_link = this.controller.buildSocialLinkObject(form_data_social_links);

        this.controller.state_refs.social_links_obj.value = updated_social_link;

        return true;
    }

    protected onFormDataUpdated() {
        if (this.form_data?.social_links) { this.handleUpdateSocialLinksObjects(); }
    }

    protected validateFormData(form_data: RegisteredAppFormDataInterface, record: Record<string, any>) {
        return RegisteredAppValidator.validateRegisteredAppInput(form_data, record);
    }

    protected async executeSubmitAction(record_id: string, form_data: RegisteredAppFormDataInterface) {
       if (!this.controller.service) { return {}; }

        if (record_id) {
            return await this.controller.service.executeUpdateRegisteredApp(record_id, form_data);
        }

        return await this.controller.service.executeRegisterNewApp(form_data);
    }

    // Method to add new social link on btn clicked
    public handleAddNewObjectField (event: MouseEvent) {
        this.hideErrorAlert();

        const social_links              = { ...this.controller.state_refs.social_links_obj.value };
        const all_social_links_keys     = Object.keys(social_links)
        const active_social_links_keys  = all_social_links_keys.filter(key => !social_links[key]?.is_deleted);
        const all_keys_length           = all_social_links_keys.length;
        const active_keys_length        = active_social_links_keys.length;
        const keys_last_index           = active_keys_length > 0 ? active_keys_length - 1 : 0;


        if(active_keys_length > 0) {
            const last_link_id = active_social_links_keys[keys_last_index];

            const { key, url_value } = social_links[last_link_id];

            const { v_state, v_msg } = RegisteredAppValidator.validateSocialLinkRecord(key, url_value);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }
        }

        const new_link_id           = `Link_${all_keys_length + 1}`;
        social_links[new_link_id]   = { key: "", url_value: "", is_deleted: false }

        // update reactive ref
        this.controller.state_refs.social_links_obj.value = social_links;
    }

    // Method to remove social link on btn clicked
    public handleRemoveObjectField (event: MouseEvent, social_link_id: string, social_link_key_input_id: string) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!social_link_id || !social_link_key_input_id) { return; }

        const social_links          = { ...this.controller.state_refs.social_links_obj.value };
        const link_to_delete        = social_links[social_link_id];

        if(!link_to_delete) { return }

        const { key, url_value } = link_to_delete

        if (this.form_data?.social_links?.[key]) { 
            delete this.form_data?.social_links[key]
        }

        social_links[social_link_id].is_deleted = true;

       this.controller.state_refs.social_links_obj.value = social_links;
    }
}

export default RegisteredAppFormViewEventHandler;