import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAT_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import DatasourceProfileViewPropsBuilder        from "./datasource_profile_view_props_builder";



class DatasourceProfileViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_field_key: string;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;


    constructor(props: Record<string, any> = {}) {
        super("datasource_profile_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_manager            = ContentManagerUtil.getInstance();
        this.content_field_key          = "datasource_view_ui";
    }

    // Method to format member render
    private renderMemberLink (member_record: { public_id?: string, full_name?: string}): string {
        const { public_id = "", full_name = "" } = member_record;

        if(!public_id) { return "" }

        const member_text   = `(${public_id}) ${full_name}`;
        const member_link   = `/members?member_profile=${public_id}`;
        return InputTransformerUtil.formatURLToAnchorHtml(member_text, member_link);
    }

    // Method to format member render
    private renderRegisteredAppLink (app_record: { public_id?: string, name?: string}): string {
        const { public_id = "", name = "" } = app_record;

        if(!public_id) { return "" }

        const member_text   = `(${public_id}) ${name}`;
        const member_link   = `/registered-apps`;
        return InputTransformerUtil.formatURLToAnchorHtml(member_text, member_link);
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {        
        return {
            profile_content_data: this.content_manager.get("content_resource.datasource_view_ui.profile_view_ui"),
        } 
    }

    // Method to to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        const { 
            connection_info = {}, host = "", database_name, datasource_type = "",
            created_at = null, updated_at = null, creator = {}, updator = {},
            datasource_app = {}
        } = this.props.record ?? {};

        return {
            formatted_databse_name_type: () => { return `${database_name} (${datasource_type?.toUpperCase()})` },

            formatted_host: () => { return InputTransformerUtil.formatURLToAnchorHtml(host, host); },

            formatted_connection_info: () => { 
                return Object.keys(connection_info)
                .map(
                    (connection_info_key: string) => { 
                        return `
                        <strong>${connection_info_key.toUpperCase()}:</strong> 
                        <span>${connection_info[connection_info_key]}</span>
                        `
                    }
            )},

            formatted_registered_app: () => { return this.renderRegisteredAppLink(datasource_app) },

            formatted_created_at: () => { return InputTransformerUtil.formatReadableDateTime(created_at); },

            formatted_updated_at: () => { return InputTransformerUtil.formatReadableDateTime(updated_at); },

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

export default DatasourceProfileViewController;