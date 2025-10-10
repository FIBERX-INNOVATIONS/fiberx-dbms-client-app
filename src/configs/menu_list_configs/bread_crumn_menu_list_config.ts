
import { reactive  }                from "vue";
import ClassStyles                  from "@/enums/class_styles.enums";
import SVGIcons                     from "@ui/version_2/resources/svg_icon_resource";

import { 
    NavLinkUIPropsInterface,
    BreadCrumgListInterface
} from "@ui/version_2/types/props_builder_type";


class BreadCrumbMenuListConfig {
    public readonly name = "bread_crumg_menu_list_config";

    private static getMenuItem (
        menu_id: string, 
        menu_text: string, 
        menu_link: string | null, 
        menu_icon_name?: keyof typeof SVGIcons
    ): NavLinkUIPropsInterface {
        const class_styles  = ClassStyles?.bread_crumb_ui?.menu_list_item_ui
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

    public static getPageBreadCrumbList (menu_list: BreadCrumgListInterface[] ): NavLinkUIPropsInterface[] {
        if(menu_list.length <= 0) { return [] }

        const nav_link_menu_list    = [];
        let index                   = 0;

        for (const menu_item of menu_list) {
            index += 1;

            const { menu_text, menu_link = "", menu_svg_icon  } = menu_item;

            const icon_name = menu_svg_icon as keyof typeof SVGIcons;

            const nav_link_menu = this.getMenuItem(`BreadCrumbMenu-${index}`, menu_text, menu_link, icon_name);

            nav_link_menu_list.push(nav_link_menu);
        }

       return reactive(nav_link_menu_list)
    }
}

export default BreadCrumbMenuListConfig;