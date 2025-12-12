import InputValidatorUtil from "@ui/version_2/utils/input_validator_util";
import { 
    ValidationResult,
    LoginFormDataInputInterface,
    TwoFactorFormDataInputInterface 
} from "@/types/validation_type";

class AuthValidator {

    /** Validate login input */
    public static validateLoginInput(member_input: LoginFormDataInputInterface): ValidationResult {
        const { csrf_token, username, password } = member_input;

        if (InputValidatorUtil.isEmpty(csrf_token)) {
            return { v_state: false, v_msg: "invalid_csrf_token" };
        }

        if (InputValidatorUtil.isEmpty(username)) {
            return { v_state: false, v_msg: "invalid_input_username" };
        }

        if (InputValidatorUtil.isEmpty(password)) {
            return { v_state: false, v_msg: "invalid_input_password" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }

    /** Validate two-factor login input */
    public static validateTwoFactorLoginInput(member_input: TwoFactorFormDataInputInterface): ValidationResult {
        const { otp_code } = member_input;

        if (InputValidatorUtil.isEmpty(otp_code) || otp_code.length < 6) {
            return { v_state: false, v_msg: "invalid_input_otp_code" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }
}

export default AuthValidator;
