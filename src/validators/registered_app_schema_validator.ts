import InputValidatorUtil                           from "@ui/version_2/utils/input_validator_util";
import { ValidationResult }                         from "@/types/validation_type";                 
import { RegisteredAppSchemaFormDataInterface }     from "@/types/api_service_type";


class RegisteredAppSchemaValidator {

    /** Validate connection info input */
    public static validateColumnsRecord(key: string, url_value: string): ValidationResult {
        if (InputValidatorUtil.isEmpty(key)) {
            return { v_state: false, v_msg: "invalid_input_connection_info_key" };
        }

        if (
            InputValidatorUtil.isEmpty(url_value)
        ) {
            return { v_state: false, v_msg: "invalid_input_connection_info_value" };
        }

        if (!InputValidatorUtil.isLowerSnakeCase(key)) {
            return { v_state: false, v_msg: "invalid_input_connection_info_key_case" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }

    /** Validate registered app input */
    public static validateRegisteredAppSchemaInput(
        schema_input: RegisteredAppSchemaFormDataInterface,
        old_record: Record<string, any>
    ): ValidationResult {
        const { 
            csrf_token, model_name
        } = schema_input;

        const keys_to_check     = ["model_name"];
        const has_input_changed = old_record?.id ? InputValidatorUtil.hasInputChanged(schema_input, old_record, keys_to_check) : true;

        if (!has_input_changed) {  return { v_state: false, v_msg: "input_has_not_changed" }; }

        const is_update_mode        = !!(old_record?.id && old_record.id > 0);
        const isValidOrInherited    = (value: any, old_value?: any) => { 
            return !(InputValidatorUtil.isEmpty(value) && InputValidatorUtil.isEmpty(old_value)); 
        }

    

        return { v_state: true, v_msg: "valid_input" };
    }


}

export default RegisteredAppSchemaValidator