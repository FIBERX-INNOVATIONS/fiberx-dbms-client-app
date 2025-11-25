
import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAT_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";



class SchemaAccessProfileViewController extends BaseController {
    public router: Router;
    public content_field_key: string;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;

    constructor(props: Record<string, any> = {}) {
        super("schema_access_profile_view", props);

        this.router                 = useRouter();
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
        this.content_manager        = ContentManagerUtil.getInstance();
        this.content_field_key      = "schema_access_view_ui";
    }

    // Method to render member link
    private renderMemberLink(member: any): string {
        if (!member?.public_id) { return ""; }

        const text = `(${member.public_id}) ${member.full_name}`;
        const link = `/members?member_profile=${member.public_id}`;
        return InputTransformerUtil.formatURLToAnchorHtml(text, link);
    }

    // Method to render schema link
    private renderSchemaLink(schema: any): string {
        if (!schema?.id) { return ""; }

        const text = `(${schema.id}) ${schema.name}`;
        const link = `/registered-app-schemas?schema_profile=${schema.id}`;
        return InputTransformerUtil.formatURLToAnchorHtml(text, link);
    }

    // Method to render register app link
    private renderRegisteredAppLink(app: any): string {
        if (!app?.public_id) { return ""; }

        const text = `(${app.public_id}) ${app.name}`;
        const link = `/registered-apps?registered_app_profile=${app.public_id}`;
        return InputTransformerUtil.formatURLToAnchorHtml(text, link);
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {
        return {
            profile_content_data: this.content_manager.get("content_resource.schema_access_view_ui.profile_view_ui"),
        };
    }

    // Method to to get ui computed data
    protected getUIComputedData(): Record<string, () => any> {
        const {
            schema = {},
            registered_app = {},
            creator = {},
            updator = {},
            permissions = [],
            is_owner,
            is_granted,
            created_at,
            updated_at,
        } = this.props.record ?? {};

        return {
            formatted_schema: () => { return this.renderSchemaLink(schema) },

            formatted_registered_app: () => { return this.renderRegisteredAppLink(registered_app) },

            formatted_permissions: () => { return permissions?.length ? permissions.join(", ").toUpperCase() : "NONE" },

            formatted_is_owner: () => { return (is_owner ? "YES" : "NO") },

            formatted_is_granted: () => { return (is_granted ? "YES" : "NO") },

            formatted_created_at: () => { return InputTransformerUtil.formatReadableDateTime(created_at) },

            formatted_updated_at: () => { return InputTransformerUtil.formatReadableDateTime(updated_at) },

            formatted_creator: () => { return this.renderMemberLink(creator) },

            formatted_updator: () => { return this.renderMemberLink(updator) },
        };
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }
    }

}

export default SchemaAccessProfileViewController;