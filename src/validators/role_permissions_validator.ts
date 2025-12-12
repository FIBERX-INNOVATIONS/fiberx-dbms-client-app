import InputValidatorUtil                       from "@ui/version_2/utils/input_validator_util";
import { 
    ValidationResult,
    RolePermissionsFormDataInputData 
} from "@/types/validation_type";


class RolePermissionsValidator {

    /** Validate registered app input */
    public static validateRolePermissionsInput(
        role_perms_input: RolePermissionsFormDataInputData,
    ): ValidationResult { 
        const { role_id, permission_ids = [] } = role_perms_input

        if(InputValidatorUtil.isEmpty(role_id) || !Number.isInteger(Number(role_id))) {
            return { v_state: false, v_msg: "invalid_input_role" };
        }

        const is_valid_permission_ids_array = Array.isArray(permission_ids) && permission_ids.every(id => typeof id === "number" && !isNaN(id));

        if(!is_valid_permission_ids_array || !permission_ids.length) {
            return { v_state: false, v_msg: "invalid_input_permission_array" };
        }

        // 🔥 Validate uniqueness of permission IDs
        const unique_ids = new Set(permission_ids);

        if (unique_ids.size !== permission_ids.length) {
            return { v_state: false, v_msg: "permission_ids_not_unique" };
        }

        return { v_state: true, v_msg: "valid_input" }
    }


}

export default RolePermissionsValidator