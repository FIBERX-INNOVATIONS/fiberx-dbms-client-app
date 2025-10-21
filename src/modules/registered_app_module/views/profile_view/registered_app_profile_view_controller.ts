import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAT_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import ImgAvatarUI                              from "@ui/version_2/components/ImgAvatarUI/img_avatar_ui.vue";
import RegisteredAppProfileViewPropsBuilder from "./registered_app_profile_view_props_builder";



class RegisteredAppProfileViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_field_key: string;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;


    constructor(props: Record<string, any> = {}) {
        super("registered_app_profile_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_manager            = ContentManagerUtil.getInstance();
        this.content_field_key          = "registered_app_view_ui";
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { ImgAvatarUI }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {        
        return {
            profile_content_data: this.content_manager.get("content_resource.registered_app_view_ui.app_profile"),

            img_avatar_ui_props: RegisteredAppProfileViewPropsBuilder.getImgAvatarUIProps(this.props.record),
        } 
    }

    // Method to to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        const { 
            base_url = "" , social_links = {}, 
            created_at = null, updated_at = null 
        } = this.props.record ?? {};

        return {
            formatted_base_url: () => { return InputTransformerUtil.formatURLToAnchorHtml(base_url, base_url); },

            formatted_social_links: () => { 
                return Object.keys(social_links)
                .map(
                    (social_key: string) => { 
                        return InputTransformerUtil.formatURLToAnchorHtml(social_key, social_links[social_key]); 
                    }
            )},

            formatted_created_at: () => { return InputTransformerUtil.formatReadableDateTime(created_at); },

            formatted_updated_at: () => { return InputTransformerUtil.formatReadableDateTime(updated_at); }
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

export default RegisteredAppProfileViewController;