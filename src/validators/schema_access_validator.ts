import InputValidatorUtil                       from "@ui/version_2/utils/input_validator_util";
import { SchemaAccessDefinitionInterface }      from "@/types/schema_type";
import { SCHEMA_PERMISSIONS_ACTIONS }           from "@/enums/constants.enums";
import { 
    SchemaAccessFormInputInterface,
    SchemaAccessUpdateFormInputInterface
} from "@/types/api_service_type";



interface ValidationResult {
    v_state: boolean;
    v_msg: string;
}

class SchemaAccessValidator {

    /** Validate registered app input */
    public static validateSchemaAccessInput(
        schema_access_input: SchemaAccessFormInputInterface,
        old_record: Record<string, any>
    ): ValidationResult {
        const { csrf_token, app_public_id, schema_access_array } = schema_access_input;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (InputValidatorUtil.isEmpty(app_public_id)) {
            return { v_state: false, v_msg: "invalid_input_app_schema_app_id" };
        }
        
        if(!schema_access_array || !Array.isArray(schema_access_array) || schema_access_array.length === 0) { 
            return { v_state: false, v_msg: "invalid_input_app_schemas" };
        }

        for (const schema of schema_access_array) {
            const { schema_name, schema_id, permissions = [] } = schema;

            if(!schema_name || isNaN(schema_id)) {
                return { v_state: false, v_msg: `invalid_input_app_schemas_[${schema_name}]` };
            }

            const is_duplicate_row = schema_access_array.find(
                (obj) => { return ( Number(obj.schema_id) === Number(schema_id)); }
            );

            if(is_duplicate_row) { continue }

            if (!Array.isArray(permissions) || permissions.length === 0) {
                return { v_state: false, v_msg: "invalid_input_app_schema_permissions" };
            }

            const is_valid_permissions = permissions.every((el: string) => { return SCHEMA_PERMISSIONS_ACTIONS.find((obj) => { return obj.value === el}); });

            if(!is_valid_permissions) {
                return { v_state: false, v_msg: "invalid_input_app_schema_permissions" };
            }
        }

        return { v_state: true, v_msg: "valid_input" };
    }


}

export default SchemaAccessValidator