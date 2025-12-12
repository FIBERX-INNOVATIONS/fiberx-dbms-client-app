import InputValidatorUtil           from "@ui/version_2/utils/input_validator_util";
import { MemberRecordInterface }    from "@/types/api_service_type";
import { 
    MemberFormDataInputInterface
} from "@/types/validation_type";


interface ValidationResult {
    v_state: boolean;
    v_msg: string;
}

class MemberValidator {

    /** Validate registered app input */
    public static validateMemberInput (
        member_input: MemberFormDataInputInterface,
        old_record: MemberRecordInterface
    ): ValidationResult {
        const { 
            csrf_token, first_name, last_name, email, role_name,
            phone, dob, gender, profile_photo_link, password 
        } = member_input;

        const keys_to_check     = ["first_name", "last_name", "email", "role_name", "phone", "dob", "gender", "profile_photo_link", "password"];
        const has_input_changed = old_record?.public_id ? InputValidatorUtil.hasInputChanged(member_input, old_record, keys_to_check) : true;

        if (!has_input_changed) {  return { v_state: false, v_msg: "input_has_not_changed" }; }

        const is_update_mode        = !!(old_record?.public_id);
        const isValidOrInherited    = (value: any, old_value?: any) => { 
            return !(InputValidatorUtil.isEmpty(value) && InputValidatorUtil.isEmpty(old_value)); 
        }

        if (!isValidOrInherited(first_name, old_record?.first_name)) {
			return { v_state: false, v_msg: "invalid_input_member_first_name" };
		}

        if (first_name && !InputValidatorUtil.isValidName(first_name)) {
			return { v_state: false, v_msg: "invalid_input_member_first_name" };
		}

        if (!isValidOrInherited(last_name, old_record?.last_name)) {
			return { v_state: false, v_msg: "invalid_input_member_last_name" };
		}

        if (last_name && !InputValidatorUtil.isValidName(last_name)) {
			return { v_state: false, v_msg: "invalid_input_member_last_name" };
		}

        if (!isValidOrInherited(email, old_record?.email)) {
			return { v_state: false, v_msg: "invalid_input_member_email" };
		}

        if (email && !InputValidatorUtil.isValidEmail(email)) {
			return { v_state: false, v_msg: "invalid_input_member_email" };
		}

        if(email && is_update_mode && email.trim() !== old_record.email.trim()) {
            return { v_state: false, v_msg: "invalid_input_member_email_cannot_update" };
        }

        if (!isValidOrInherited(role_name, old_record?.role_name)) {
			return { v_state: false, v_msg: "invalid_input_member_role_name" };
		}

        if (role_name && InputValidatorUtil.isSuperAdmin(role_name)) {
			return { v_state: false, v_msg: "invalid_input_member_role_name" };
		}

        if (role_name && !InputValidatorUtil.isAdmin(role_name)) {
			return { v_state: false, v_msg: "invalid_input_member_role_name" };
		}

        if (phone && !InputValidatorUtil.isValidPhoneNumber(phone)) {
            return { v_state: false, v_msg: "invalid_input_member_phone" };
        }

        const dob_date_obj = InputValidatorUtil.isValidDateAndDifference(dob)

        if (dob && !dob_date_obj) {
            return { v_state: false, v_msg: "invalid_input_member_dob" };
        }

        if (gender && !["male", "female"].includes(gender.toLowerCase())) {
            return { v_state: false, v_msg: "invalid_input_member_gender" };
        }

        if(profile_photo_link && !InputValidatorUtil.isValidURL(profile_photo_link))  {
            return { v_state: false, v_msg: "invalid_input_member_profile_photo_link" };
        }

        if(!is_update_mode && !password) {
            return { v_state: false, v_msg: "invalid_input_member_password" };
        }

        if(password && !InputValidatorUtil.isValidPassword(password))  {
            return { v_state: false, v_msg: "invalid_input_member_password_not_secure" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }


}

export default MemberValidator