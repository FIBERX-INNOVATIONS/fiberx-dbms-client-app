import { reactive  }                from "vue";
import ClassStyles                  from "@/enums/class_styles.enums";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import SVGIcons                     from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil               from "@ui/version_2/utils/render_html_util";
import MemberProfileMenuListconfig  from "@/configs/menu_list_configs/member_profile_menu_list_config";
import SidebarMenuListConfig        from "@/configs/menu_list_configs/sidebar_menu_list_config";
import { DEFAULT_PROFILE_PHOTO }    from "@/enums/constants.enums";

import { 
    BaseEventHandlerInterface,
} from "@ui/version_2/types/component_type";

import { 
    DashboardBaseClassStyleInterface,
    TopBarPropsInterface
 } from "@/types/props_builder_type";

 import {
    ButtonUIPropsInterface,
    NavLinkUIPropsInterface,
    ImgAvatarUIPropsInterface,
    MenuListUIPropsInterface,
    ModalSidebarUIPropsInterface,
    ImageTextUIPropsInterface
} from "@ui/version_2/types/props_builder_type";

import { CurrentMemberInterface } from "@ui/version_2/types/util_type";



class DashboardBaseViewPropsBuilder {
    public readonly name = "dashboard_base_view_props_builder";

    // Method to get header class style
    public static getBaseClassStyle (): DashboardBaseClassStyleInterface  {
        return ClassStyles?.dashboard_base_ui;
    }

    // Method to get top bar props
    public static getTopBarProps (): TopBarPropsInterface {
        const class_styles = ClassStyles.top_bar_ui;
        return reactive({ ...class_styles })
    }

    // Method to get hamburger btn props
    public static getHamburgerBtnProps (event_handler: BaseEventHandlerInterface): ButtonUIPropsInterface {
        const class_styles          = ClassStyles?.hamburger_btn_ui ?? {};
        const btn_class_style       = class_styles?.hamburger_btn_class_style;
        const icon_class_style      = class_styles?.icon_class_style;

        const btn_type              = "button";
        const content_text          = RenderHtmlUtil.renderHtml({ icon_class_style, icon: SVGIcons.hamburger_svg_icon })
        const loader_content_text   = RenderHtmlUtil.renderLoaderHtml({});
        const on_click              = event_handler?.toggleSidebarModal.bind(event_handler);

        return reactive({
            type: btn_type, disabled: false, show_loader: false, 
            content_text, loader_content_text, btn_class_style, on_click
        })
    }

    // Method to get logo nav link props
    public static getLogoNavLinkProps (): NavLinkUIPropsInterface {
        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.top_bar_ui") ?? {};
        const class_styles          = ClassStyles?.logo_link_ui ?? {};
        const { logo_text }         = content_data;
        
        return reactive({
            id: "LogoNavLink", link: "/", content: logo_text, ...class_styles
        });
    }

    // Method to get img avatar ui props
    public static getImgAvatarUIProps (event_handler: BaseEventHandlerInterface, current_member: CurrentMemberInterface | null): ImgAvatarUIPropsInterface {
        const id = "MemberProfileAvatar";

        if(!current_member) { return { id } }

        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.top_bar_ui") ?? {};
        const class_styles          = ClassStyles?.img_avatar_ui ?? {};

        const { 
            full_name, first_name, last_name, public_id, profile_photo_link,
            role_name
        } = current_member;

        const { 
            wrapper_class_style, avatar_circle_class_style, img_class_style, 
            initials_class_style, right_slot_class_style, right_slot_wrapper_class_style,
            right_slot_title_text_class_style, right_slot_sub_title_class_style
        } = class_styles;

        const on_click              = event_handler.toggleProfileDropdown.bind(event_handler);
        const img_src               = DEFAULT_PROFILE_PHOTO ?? profile_photo_link;
        const img_alt_text          = `${full_name} Profile Photo`;
        const initials              = `${first_name?.[0]} ${last_name?.[0]}`;
        const title_text            = full_name ?? `${first_name} ${last_name}`;
        const sub_title_text        = role_name;
        const right_slot_content    = RenderHtmlUtil.renderTitleAndSubtitleHTML({ 
            title_text, sub_title_text, wrapper_class_style: right_slot_wrapper_class_style,
            title_class_style: right_slot_title_text_class_style, sub_title_class_style: right_slot_sub_title_class_style
        })

        return reactive({
            id: "MemberProfileAvatar",  img_src, img_alt_text, initials, right_slot_content,
            wrapper_class_style, avatar_circle_class_style, img_class_style, initials_class_style,
            right_slot_class_style, on_click
        })
    }

    // Method to get Profile dropdown ui props
    public static getProfileDropdownUIProps (current_member: CurrentMemberInterface | null): MenuListUIPropsInterface {
        const id                    = "MemberProfileMenuList";
        const parent_id             = "MemberProfileAvatar";
        const class_styles          = ClassStyles?.profile_dropdown_menu_list_ui ?? {};
        const menu_list             = MemberProfileMenuListconfig.getMemberProfileMenuList(current_member);

        const { wrapper_class_style, list_class_style, list_item_class_style } = class_styles;

        return reactive({ id, parent_id, wrapper_class_style, list_class_style, list_item_class_style, menu_list  })
    }

    // Method to get sidebar ui props
    public static getModalSidebarUIProps (
        event_handler: BaseEventHandlerInterface, 
        visible: boolean = false,
        position: string = "left"
    ): ModalSidebarUIPropsInterface {
        const id                    = "SideBar";
        const class_styles          = ClassStyles?.sidebar_ui ?? {};
        const on_click              = event_handler.toggleSidebarModal.bind(event_handler);

        let {
            wrapper_class_style, sidebar_class_style, left_position_class_style,
            section_1_wrapper_class_style, section_2_wrapper_class_style, right_position_class_style,
            transition_x_class_style, left_transition_x_class_style, right_transition_x_class_style
        } = class_styles;

        const position_class_style      = position === "left" ? left_position_class_style : right_position_class_style;
        const transisiton_class_style   = visible ?transition_x_class_style  : (position === "left" ? left_transition_x_class_style : right_transition_x_class_style);
        sidebar_class_style             = `${sidebar_class_style} ${position_class_style} ${transisiton_class_style}`;
        

        return reactive({
            id, on_click, visible, 
            wrapper_class_style, sidebar_class_style, 
            section_1_wrapper_class_style, section_2_wrapper_class_style
        });
    }

    // Method to get sidebar logo props
    public static getSidebaLogoProps ():ImageTextUIPropsInterface {
        const content_manager       = ContentManagerUtil.getInstance();
        const class_styles          = ClassStyles?.sidebar_logo_ui ?? {};
        const content_data          = content_manager?.get("content_resource.side_bar_ui") ?? {};

        const { logo_img_link, logo_img_alt_text } = content_data;

        return reactive({ image_src: logo_img_link, img_alt_text: logo_img_alt_text, ...class_styles });
    }

    // Method to get sidebar menu list
    public static getSidebarMenuListProps (): MenuListUIPropsInterface {
        const id                    = "SideBarMenuList";
        const class_styles          = ClassStyles?.sidebar_menu_list_ui ?? {};
        const menu_list             = SidebarMenuListConfig.getSidebarMenuList();

        const { wrapper_class_style, list_class_style, list_item_class_style } = class_styles;

        return reactive({ id, wrapper_class_style, list_class_style, list_item_class_style, menu_list  })
    }

}

export default DashboardBaseViewPropsBuilder;