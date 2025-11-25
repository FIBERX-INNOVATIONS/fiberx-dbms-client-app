
import BaseProfileViewController            from "@/base_classes/profile_view/base_profile_view_controller";


class SchemaAccessProfileViewController extends BaseProfileViewController {

    constructor(props: Record<string, any> = {}) {
        super("schema_access_profile_view", props);

        this.content_field_key  = "schema_access_view_ui"
        this.route_query_key    = "";
    }

    // Method to to get ui computed data
    protected getCustomChildComputedData(): Record<string, () => any> {
        const {
            is_owner,
            is_granted
        } = this.props.record ?? {};

        return {
            formatted_is_owner: () => { return (is_owner ? "YES" : "NO") },

            formatted_is_granted: () => { return (is_granted ? "YES" : "NO") },
        };
    }
}

export default SchemaAccessProfileViewController;