import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAT_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import { IndexDefinitionInterface } from "@/types/schema_type";


class RegisteredAppSchemaProfileViewController extends BaseController {
    public router: Router;
    public content_field_key: string;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;

    constructor(props: Record<string, any> = {}) {
        super("registered_app_schema_profile_view", props);

        this.router                 = useRouter();
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
        this.content_manager        = ContentManagerUtil.getInstance();
        this.content_field_key      = "registered_app_schema_view_ui";
    }

    // Member link (creator/updator)
    private renderMemberLink(member: { public_id?: string; full_name?: string }): string {
        const { public_id = "", full_name = "" } = member;

        if (!public_id) { return ""; }

        const text = `(${public_id}) ${full_name}`;
        return InputTransformerUtil.formatURLToAnchorHtml(text, `/members?member_profile=${public_id}`);
    }

    // App link
    private renderAppLink(app: { public_id?: string; name?: string }): string {
        const { public_id = "", name = "" } = app;

        if (!public_id) { return ""; }

        return InputTransformerUtil.formatURLToAnchorHtml(`(${public_id}) ${name}`, `/registered-apps`);
    }

    // Computed formatted data
    protected getUIComputedData(): Record<string, () => any> {
        const {
            permissions = [],
            columns = {},
            indexes = [],
            created_at = null,
            updated_at = null,
            creator = {},
            updator = {},
            schema_app = {},
            schema_datasource = {},
        } = this.props.record ?? {};

        return {
            formatted_permissions: () => { 
                return permissions.map(
                    (permission:string) => { return InputTransformerUtil.toTitleCase(permission) }
                ).join(", "); 
            },

            formatted_columns: () => {
                return Object.keys(columns).map(
                    (col_name: string) => {
                        const col = columns[col_name];
                        return `<strong>${col_name}</strong> (${col.type?.name}${col.type?.length ? `:${col.type.length}` : ""})`;
                    }
                );
            },

            formatted_indexes: () => { 
                return indexes.map(
                    (idx: IndexDefinitionInterface) => { return idx.fields.join(", "); } 
                ).join(" | ");
            },

            formatted_created_at: () => { return InputTransformerUtil.formatReadableDateTime(created_at) },

            formatted_updated_at: () => { return InputTransformerUtil.formatReadableDateTime(updated_at) },

            formatted_creator: () => { return this.renderMemberLink(creator); },

            formatted_updator: () => { return this.renderMemberLink(updator); },

            formatted_schema_app: () => { return this.renderAppLink(schema_app); },

            formatted_schema_datasource: () => {
                return `${schema_datasource?.name} (${schema_datasource?.datasource_type?.toUpperCase()})`
            },
        };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {        
        return {
            profile_content_data: this.content_manager.get("content_resource.registered_app_schema_view_ui.profile_view_ui"),
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }
    }
}

export default RegisteredAppSchemaProfileViewController;
