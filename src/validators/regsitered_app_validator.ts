import InputValidatorUtil                   from "@ui/version_2/utils/input_validator_util";
import { RegisteredAppRecordInterface }     from "@/types/api_service_type";
import { 
    ValidationResult,
    RegisteredAppFormDataInputInterface
} from "@/types/validation_type";



class RegisteredAppValidator {

    /** Validate social link input */
    public static validateSocialLinkRecord(key: string, url_value: string): ValidationResult {
        if (InputValidatorUtil.isEmpty(key)) {
            return { v_state: false, v_msg: "invalid_input_social_link_key" };
        }

        if (
            InputValidatorUtil.isEmpty(url_value) ||
            (!InputValidatorUtil.isValidEmail(url_value) && !InputValidatorUtil.isValidURL(url_value))
        ) {
            return { v_state: false, v_msg: "invalid_input_social_link_url_value" };
        }

        if (!InputValidatorUtil.isLowerSnakeCase(key)) {
            return { v_state: false, v_msg: "invalid_input_social_link_key_case" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }

    /** Validate registered app input */
    public static validateRegisteredAppInput(
        registered_app_input: RegisteredAppFormDataInputInterface,
        old_record: RegisteredAppRecordInterface
    ): ValidationResult {
        const { csrf_token, name, prefix, base_url, logo_url, description, social_links = {} } = registered_app_input;

        const keys_to_check     = ["name", "description", "base_url", "logo_url", "social_links"]
        const has_input_changed = old_record?.public_id ? InputValidatorUtil.hasInputChanged(registered_app_input, old_record, keys_to_check) : true;

        if (!has_input_changed) {  return { v_state: false, v_msg: "input_has_not_changed" }; }

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if((!prefix || InputValidatorUtil.isEmpty(prefix)) && !old_record?.prefix) {
			return { v_state: false, v_msg: "invalid_input_app_prefix" };
		}

        if((!name || InputValidatorUtil.isEmpty(name)) && !old_record?.name) {
			return { v_state: false, v_msg: "invalid_input_app_name" };
		}

        if(name && !InputValidatorUtil.isValidNamey(name)) {
            return { v_state: false, v_msg: "invalid_input_app_name" };
        }

        if(description &&  !InputValidatorUtil.isValidLongText(description)) {
			return { v_state: false, v_msg: "invalid_input_app_description" };
		}

        if(base_url &&  !InputValidatorUtil.isValidURL(base_url)) {
			return { v_state: false, v_msg: "invalid_input_app_base_url" };
		}

        if(logo_url && !InputValidatorUtil.isValidURL(logo_url)) {
			return { v_state: false, v_msg: "invalid_input_app_logo_url" };
		}

        if(social_links && typeof social_links !== "object") {
			return { v_state: false, v_msg: "invalid_input_app_social_links" };
		}

        const invalid_social_links = Object.entries(social_links).filter(
            ([key, value]) => {
                const is_placeholder_key = /^Key_\d+$/.test(key);
                return ( 
                    (!InputValidatorUtil.isValidURL(value) && !InputValidatorUtil.isValidEmail(value) )
                    || is_placeholder_key
                )
            }).map(([key]) => key);

        if(invalid_social_links.length) {
			return { v_state: false, v_msg: "invalid_input_app_social_links_must_be_valid_links" };
		}

        return { v_state: true, v_msg: "valid_input" };
    }


}

export default RegisteredAppValidator