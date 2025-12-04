import BaseProfileViewController from "@/base_classes/profile_view/base_profile_view_controller";
import InputTransformerUtil from "@ui/version_2/utils/input_formatter_util";

class MemberProfileViewController extends BaseProfileViewController {

    constructor(props: Record<string, any> = {}) {
        super("member_profile_view", props);

        this.content_field_key = "member_view_ui";
        this.route_query_key = "member_profile";
    }

    // Member-specific computed data
    protected getCustomChildComputedData(): Record<string, () => any> {
        const record = this.props.record ?? {};
        const auth = record.member_auth ?? {};

        return {
            // Verified / unverified
            formatted_verification_status: () => {
                return record.is_verified
                    ? this.state_refs.profile_content_data?.verified_value_text
                    : this.state_refs.profile_content_data?.unverified_value_text;
            },

            // 2FA
            formatted_two_fa_status: () => {
                return auth.is_2fa_enabled
                    ? this.state_refs.profile_content_data?.two_fa_enabled_value_text
                    : this.state_refs.profile_content_data?.two_fa_disabled_value_text;
            },

            // Active/inactive
            formatted_account_status: () => {
                return (auth.is_active || record.is_active)
                    ? this.state_refs.profile_content_data?.active_value_text
                    : this.state_refs.profile_content_data?.inactive_value_text;
            },

            formatted_last_login: () => {
                return InputTransformerUtil.formatReadableDateTime(auth.last_login_at);
            },

            formatted_account_locked_until: () => {
                return InputTransformerUtil.formatReadableDateTime(auth.account_locked_until);
            },

            formatted_password_changed_at: () => {
                return InputTransformerUtil.formatReadableDateTime(auth.password_changed_at);
            },

            formatted_last_password_reset_request_at: () => {
                return InputTransformerUtil.formatReadableDateTime(auth.last_password_reset_request_at);
            },

            formatted_dob: () => {
                return InputTransformerUtil.formatReadableDate(record.dob);
            },
        };
    }
}

export default MemberProfileViewController;
