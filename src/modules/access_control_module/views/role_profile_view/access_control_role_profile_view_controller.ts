import BaseProfileViewController    from "@/base_classes/profile_view/base_profile_view_controller";
import InputTransformerUtil         from "@ui/version_2/utils/input_formatter_util";
import { RoleRecordInterface }      from "@/types/api_service_type";

class AccessControlRoleProfileViewController extends BaseProfileViewController {

    constructor(props: Record<string, any> = {}) {
        super("role_profile_view", props);

        this.content_field_key              = "access_control_view_ui";  
        this.content_component_field_key    = "profile_view_ui"
        this.route_query_key                = "role_profile";
    }

    protected getCustomChildComputedData(): Record<string, () => any> {
        const record = (this.props.record ?? {}) as RoleRecordInterface;

        return {
            formatted_created_at: () =>
                InputTransformerUtil.formatReadableDateTime(record?.created_at ?? ""),

            formatted_updated_at: () =>
                InputTransformerUtil.formatReadableDateTime(record?.updated_at ?? ""),

            formatted_creator: () =>
                record.creator?.full_name
                    ? `${record.creator.full_name} (${record.creator.public_id})`
                    : "—",

            formatted_updator: () =>
                record.updator?.full_name
                    ? `${record.updator.full_name} (${record.updator.public_id})`
                    : "—",
        };
    }
}

export default AccessControlRoleProfileViewController;
