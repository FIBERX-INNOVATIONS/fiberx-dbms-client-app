import { reactive  }                    from "vue";
import GlobalVariableManager            from "@ui/version_2/utils/global_variable_manager_util";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import SVGIcons                         from "@ui/version_2/resources/svg_icon_resource";
import { NavLinkUIPropsInterface }      from "@ui/version_2/types/props_builder_type";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import { LOCAT_STORAGE_FIELDS }          from "@/enums/constants.enums";


class SidebarMenuListConfig {
    public readonly name = "sidebar_menu_list config";

    private static checkIfMenuIsActive = (menu_id: string): boolean => {
        const global_vars       = GlobalVariableManager.getInstance();
        const current_page_id   = global_vars.getVariable("CURRENT_PAGE_ID")
        // console.log({ current_page_id, menu_id})

        return menu_id === current_page_id;
    }

    private static getMenuItem (
        menu_id: string, 
        menu_text: string, 
        menu_link: string, 
        menu_icon_name?: keyof typeof SVGIcons
    ): NavLinkUIPropsInterface {
        const class_styles      = ClassStyles?.sidebar_menu_list_ui?.menu_list_item_ui
        const icon              = menu_icon_name ? SVGIcons[menu_icon_name] : undefined;
        const icon_class_style  = "";
        const is_active         = (menu_id: string) => { return this.checkIfMenuIsActive(menu_id) };

        return reactive({
            id: menu_id, 
            link: menu_link, 
            icon,
            is_active,
            content: menu_text,
            ...class_styles
        })
    }

    public static getSidebarMenuList (): NavLinkUIPropsInterface[] {
        const member_auth_manager   = MemberAuthManagerUtil.getInstance();
        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.side_bar_ui");
        const { menu_list = [] }    = content_data;
        const reactive_menu_list    = [];

        if(!menu_list || !menu_list.length) { return [] }

        for (const menu of menu_list) {
            const { menu_link, svg_icon, menu_text, menu_id, menu_permission_text = "" } = menu;

            const member_key                = LOCAT_STORAGE_FIELDS.MEMBER_PERMISSIONS_KEY;
            const can_member_access_menu    = member_auth_manager.canMemberAccess(menu_permission_text, member_key)

            if(menu_permission_text && !can_member_access_menu) { continue }

            const reactive_menu = this.getMenuItem(menu_id, menu_text, menu_link, svg_icon);

            reactive_menu_list.push(reactive_menu);
        }
    

       return reactive(reactive_menu_list)
    }
}

export default SidebarMenuListConfig