import { reactive  }                from "vue";
import ClassStyles                  from "@/enums/class_styles.enums";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import SVGIcons                     from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil               from "@ui/version_2/utils/render_html_util";
import BreadCrumbMenuListConfig     from "@/configs/menu_list_configs/bread_crumn_menu_list_config";    

import { BaseListViewClassStyleinterface } from "@/types/props_builder_type";

import { BreadCrumbUIPropsInterface } from "@ui/version_2/types/props_builder_type"


class BaseListViewPropsBuilder {
    public readonly name = "base_list_view_props_builder";

    // Method to get header class style
    public static getBaseClassStyle (): BaseListViewClassStyleinterface  {
        return ClassStyles?.main_dashboard_ui;
    }

    // Method to get header text 
    public static getHeaderText (content_field_key: string): string {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager.get(`content_resource.${content_field_key}`);

        const { title_page_text, title_page_icon }  = content_data;
        const icon_name = title_page_icon as keyof typeof SVGIcons

        return RenderHtmlUtil.renderHtml({icon: SVGIcons[icon_name], text: title_page_text});
    }

    // Method to get page breadcrumb props
    public static getPageBreadCrumnProps (content_field_key: string): BreadCrumbUIPropsInterface {
        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager.get(`content_resource.${content_field_key}`);
        const { breadcrumb_list }   = content_data;
        const class_styles          = ClassStyles.bread_crumb_ui;
        const divider_content       = "\\";
        const menu_list             = BreadCrumbMenuListConfig.getPageBreadCrumbList(breadcrumb_list);

        const { wrapper_class_style, list_class_style, list_item_class_style, divider_class_style } = class_styles;

        return reactive({ 
            wrapper_class_style, list_class_style, list_item_class_style, 
            divider_class_style, menu_list , divider_content
        })
    }

}

export default BaseListViewPropsBuilder;