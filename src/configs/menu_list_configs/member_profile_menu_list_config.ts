
import { reactive  }                from "vue";
import ClassStyles                  from "@/enums/class_styles.enums";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import SVGIcons                     from "@ui/version_2/resources/svg_icon_resource";

import { NavLinkUIPropsInterface }      from "@ui/version_2/types/props_builder_type";
import { CurrentMemberInterface }       from "@ui/version_2/types/util_type";


class MemberProfileMenuListconfig {
    public readonly name = "menu_profile_menu_list_config";

    private static getMenuItem (
        menu_id: string, 
        menu_text: string, 
        menu_link: string, 
        menu_icon_name?: keyof typeof SVGIcons
    ): NavLinkUIPropsInterface {
        const class_styles  = ClassStyles?.profile_dropdown_menu_list_ui?.menu_list_item_ui
        const icon = menu_icon_name ? SVGIcons[menu_icon_name] : undefined;
        const icon_class_style = "";
        return reactive({
            id: menu_id, 
            link: menu_link, 
            icon,
            content: menu_text,
            ...class_styles
        })
    }

    public static getMemberProfileMenuList (current_member: CurrentMemberInterface | null): NavLinkUIPropsInterface[] {
        if(!current_member?.public_id) { return []}

        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.top_bar_ui") ?? {};

        const { 
            profile_menu_text, profile_menu_svg_icon, profile_menu_link,
            logout_menu_text, logout_menu_svg_icon, logout_menu_link 
        } = content_data

        const updated_profile_link  = profile_menu_link.replace("%", current_member?.public_id);
        const profile_menu          = this.getMenuItem("MemberProfileMenu", profile_menu_text, updated_profile_link, profile_menu_svg_icon);
        const logout_menu           = this.getMenuItem("LogoutMenu", logout_menu_text, logout_menu_link, logout_menu_svg_icon);

       return reactive([profile_menu, logout_menu])
    }
}

export default MemberProfileMenuListconfig