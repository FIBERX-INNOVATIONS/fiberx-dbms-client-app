import { ref, }                         from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAT_STRAGE_FIELDS }          from "@/enums/constants.enums";
import DashboardBaseViewPropsBuilder    from "./dashboard_base_view_props_builder";
import DashboardBaseViewEventHandler    from "./dashboard_base_view_event_handler";
import BaseController                   from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import TopBarUI                         from "@ui/version_2/components/NavigationUI/TopBarUI/top_bar_ui.vue";
import ButtonUI                         from "@ui/version_2/components/ButtonUI/button_ui.vue";
import NavLinkUI                        from "@ui/version_2/components/NavigationUI/NavLinkUI/nav_link_ui.vue";
import ImgAvatarUI                      from "@ui/version_2/components/ImgAvatarUI/img_avatar_ui.vue";
import MenuListUI                       from "@ui/version_2/components/NavigationUI/MenuListUI/menu_list_ui.vue";
import ModalSidebarUI                   from "@ui/version_2/components/NavigationUI/ModalSideBarUI/modal_sidebar_ui.vue";
import ImageTextUI                      from "@ui/version_2/components/ImageTextUI/image_text_ui.vue";


class DashboardBaseViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public event_handler: DashboardBaseViewEventHandler;

    constructor(props: Record<string, any> = {}) {
        super("auth_base_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = new MemberAuthManagerUtil();
        this.event_handler              = new DashboardBaseViewEventHandler(this);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { TopBarUI, ButtonUI, NavLinkUI, ImgAvatarUI, MenuListUI, ModalSidebarUI, ImageTextUI }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {  
        const current_member = this.member_auth_manager.getCurrentMember(LOCAT_STRAGE_FIELDS.MEMBER);       
        return {
            base_class_styles: DashboardBaseViewPropsBuilder.getBaseClassStyle(),

            top_bar_props: DashboardBaseViewPropsBuilder.getTopBarProps(),

            hamburger_btn_props: DashboardBaseViewPropsBuilder.getHamburgerBtnProps(this.event_handler),

            logo_link_props: DashboardBaseViewPropsBuilder.getLogoNavLinkProps(),

            img_avatar_ui_props: DashboardBaseViewPropsBuilder.getImgAvatarUIProps(this.event_handler, current_member),

            profile_dropdown_list_props: DashboardBaseViewPropsBuilder.getProfileDropdownUIProps(current_member),

            sidebar_props: DashboardBaseViewPropsBuilder.getModalSidebarUIProps(this.event_handler),

            sidebar_logo_props: DashboardBaseViewPropsBuilder.getSidebaLogoProps(),

            sidebar_menu_list_props: DashboardBaseViewPropsBuilder.getSidebarMenuListProps(),
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }
    }
}

export default DashboardBaseViewController;