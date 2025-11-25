import { ref, }                                 from "vue";
import { 
    Router, 
    useRouter, 
    useRoute, 
    RouteLocationNormalizedGeneric }            from "vue-router";
import { LOCAT_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import ImgAvatarUI                              from "@ui/version_2/components/ImgAvatarUI/img_avatar_ui.vue";


class BaseProfileViewController extends BaseController {
    public router: Router;
    public route: RouteLocationNormalizedGeneric;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;
    public content_field_key: string = "";
    public route_query_key: string = "schema_profile";

    constructor(component_name: string, props: Record<string, any> = {}) {
        super(component_name, props);

        this.router                     = useRouter();
         this.route                     = useRoute();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_manager            = ContentManagerUtil.getInstance();
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

    // Method to get custom child compnents
    protected getCustomChildComponents(): Record<string, any> { return {} }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        const custom_child_components = this.getCustomChildComponents();

        return  { ...custom_child_components, ImgAvatarUI }; 
    }

    // Method to get custom child compnents
    protected getCustomChildUIStateData(): Record<string, any> { return {} }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {      
        const custom_child_state_data = this.getCustomChildUIStateData();
        return {
            profile_content_data: this.content_manager.get(`content_resource.${this.content_field_key}.profile_view_ui`),

            ...custom_child_state_data
        } 
    }

    // Method to get custom child compnents
    protected getCustomChildComputedData(): Record<string, any> { return {} }

    // Method to to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        const { 
            created_at = null, 
            updated_at = null ,
            creator = {}, 
            updator = {},
            registered_app = {},
            schema_app = {},
            schema = {},
            permissions = [],
            datasource_app = {}
        } = this.props.record ?? {};

        const custom_child_scomputed_data = this.getCustomChildComputedData();
        const _registered_app = 
            Object.keys(registered_app).length ? registered_app : 
            Object.keys(schema_app).length ? schema_app :
            Object.keys(datasource_app).length ? datasource_app : {}

        return {
            formatted_permissions: () => { return permissions?.length ? permissions.join(", ").toUpperCase() : "NONE" },

            formatted_schema: () => { return this.renderSchemaLink(schema) },

            formatted_registered_app: () => { return this.renderRegisteredAppLink(_registered_app) },

            formatted_created_at: () => { return InputTransformerUtil.formatReadableDateTime(created_at); },

            formatted_updated_at: () => { return InputTransformerUtil.formatReadableDateTime(updated_at); },

            formatted_creator: () => { return this.renderMemberLink(creator) },

            formatted_updator: () => { return this.renderMemberLink(updator) },

            ...custom_child_scomputed_data
        }; 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }
    }

    // Method to handle before on mount logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {

        if(!this.route_query_key) { return }

        const current_route_query   = this.route.query
        const new_route_query       = { ...current_route_query };

        delete new_route_query[this.route_query_key];

        this.router.replace({ path: this.route.path, query: new_route_query });
    }

}

export default BaseProfileViewController;
