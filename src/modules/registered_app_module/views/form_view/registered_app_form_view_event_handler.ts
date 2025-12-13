
import BaseFormViewEventHandler                 from "@/base_classes/form_view/base_form_view_event_handler";
import { RegisteredAppRecordInterface } from "@/types/api_service_type";
import { RegisteredAppFormDataInputInterface }   from "@/types/validation_type";
import RegisteredAppValidator                   from "@/validators/regsitered_app_validator";

class RegisteredAppFormViewEventHandler extends BaseFormViewEventHandler {

    private buildSocialLinksObject (social_links_array: { key: string; value: string; }[]): Record<string, string> {
        if(!social_links_array || !social_links_array.length) { return {} }

        const social_link_obj: Record<string, string> = {};

        for (const link of social_links_array) {
            const { key = "", value = "" } = link;

            if(!key || !value) { continue };

            social_link_obj[key] = value; 
        }

        return social_link_obj
    }

    protected onFormDataUpdated() {
        if(!this.form_data?.social_links_array?.length) { return }
        
        this.controller.state_refs.social_links_array.value = [ ...this.form_data?.social_links_array ]
    }

    protected validateFormData(form_data: RegisteredAppFormDataInputInterface, record: RegisteredAppRecordInterface) {
        form_data.social_links = this.buildSocialLinksObject(form_data?.social_links_array || []);

        form_data.urls = form_data?.urls_string ? form_data?.urls_string?.split(",").map(url => url.trim()) ?? [] : [];

        const validation_result = RegisteredAppValidator.validateRegisteredAppInput(form_data, record);

        if(validation_result.v_state) { this.form_data.social_links = { ...this.form_data.social_links, ...form_data.social_links }}

        return validation_result;
    }

    // Method to build connection info array
    public buildSocialLinkArray( social_links: Record<string, string> = {}): Record<string, string>[] {

        if (!social_links || Object.keys(social_links).length === 0) {
            return [];
        }

        const social_links_array: Record<string, string>[] = [];

        // Correct iteration using for...of
        Object.entries(social_links).forEach(([key, value], index) => {
            social_links_array.push({ key, value })
        });

        return social_links_array;
    }

    // Method to add new social link on btn clicked
    public handleAddNewObjectField (event: MouseEvent) {
        this.hideErrorAlert();

        const social_links_array = this.controller.state_refs?.social_links_array?.value || [];

        if(social_links_array.length) {
            const last_index                = (social_links_array?.length - 1);
            const { key = "", value = "" }  = social_links_array?.[last_index];
            const { v_state, v_msg }        = RegisteredAppValidator.validateSocialLinkRecord(key, value);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }
        }
        
        this.controller.state_refs.social_links_array.value.push({ key: "", value: ""});
    }

    // Method to remove social link on btn clicked
    public handleRemoveObjectField (event: MouseEvent, social_links_index: string, social_links_key_input_id: string) {
        this.hideErrorAlert();

        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        const number_social_links_index = Number(social_links_index);

        if (!social_links_index || !social_links_key_input_id || !Number.isInteger(number_social_links_index)) { return; }

       this.controller.state_refs.social_links_array.value.splice(number_social_links_index, 1);
       this.form_data.social_links_array.splice(number_social_links_index, 1);
    }
}

export default RegisteredAppFormViewEventHandler;