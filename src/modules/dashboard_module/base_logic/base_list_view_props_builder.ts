import { reactive  }                        from "vue";
import ClassStyles                          from "@/enums/class_styles.enums";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import SVGIcons                             from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil                       from "@ui/version_2/utils/render_html_util";
import BreadCrumbMenuListConfig             from "@/configs/menu_list_configs/bread_crumn_menu_list_config";   
import SearchFieldUIPropsBuilder            from "@ui/version_2/props_builder/search_field_ui_props_builder"; 

import { BaseEventHandlerInterface }        from "@ui/version_2/types/component_type";
import { BaseListViewClassStyleinterface }  from "@/types/props_builder_type";
import { 
    BreadCrumbUIPropsInterface, 
    ButtonType, 
    SearchFieldUIPropsInterface 
} from "@ui/version_2/types/props_builder_type"

import {
    InputGroupPropsInterface,
    ButtonUIPropsInterface,
} from "@ui/version_2/types/props_builder_type";



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

    // Method to get page search input group props
    public static getPageSearchInputGroupProps (content_field_key: string, event_handler: BaseEventHandlerInterface,): SearchFieldUIPropsInterface {
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.search_field`) ?? {};
        const class_styles              = ClassStyles.search_field_ui;
        const input_ui_class_styles     = ClassStyles.input_ui;
        const search_label_text         = content_data?.search_label_text ?? "";
        const search_placeholder_text   = content_data?.search_placeholder_text ?? "";

        const { label_class_style, label_required_class_style, input_class_style } = input_ui_class_styles;

        const { 
            wrapper_class_style, search_wrapper_class_style, btn_wrapper_class_style, input_wrapper_class_style,
            btn_class_style, icon_class_style
        } = class_styles;


        const button_type               = "button" as ButtonType;
        const ui_wrapper_class_styles   = { wrapper_class_style, label_class_style, label_required_class_style, search_wrapper_class_style, btn_wrapper_class_style, input_wrapper_class_style };
        const label_config              = { label_text: search_label_text, label_required_text: "" };
        const loader_content_text       = RenderHtmlUtil.renderLoaderHtml({});
        const content_text              = RenderHtmlUtil.renderHtml({ icon: SVGIcons.search_svg_icon, icon_class_style })
        const input_config              = { id: "RegisteredAppSearchInput", type: "text", value: "", placeholder: search_placeholder_text, input_class_style, on_change: null };

        const btn_config                = { id: "RegisteredAppSearchBtn", type: button_type, btn_class_style, clicked: false, show_loader: false, loader_content_text, content_text, on_click: null };

        return SearchFieldUIPropsBuilder.buildSearchFieldProps(ui_wrapper_class_styles, label_config, input_config, btn_config);
    }

    // Method to get page form action button props
    public static getFormActionBtnProps (
        content_field_key: string, 
        event_handler: BaseEventHandlerInterface,
        disabled: boolean = false,
        show_loader: boolean = true,
    ): ButtonUIPropsInterface {
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.form_action_btn`) ?? {};
        const { btn_text, btn_icon }    = content_data;
        const btn_icon_name             = btn_icon as keyof typeof SVGIcons;
        const class_styles              = ClassStyles?.form_button_ui ?? {};
        const icon_class_style          = class_styles?.icon_class_style;
        const btn_class_style           = class_styles?.auto_width_btn_class_style
        const btn_type                  = "button";
        const content_text              = RenderHtmlUtil.renderHtml({ text: btn_text, icon: SVGIcons[btn_icon_name], icon_class_style, order: "text-first" })
        const loader_content_text       = RenderHtmlUtil.renderLoaderHtml({});
        const on_click                  = event_handler?.handleFormActionBtnClick.bind(event_handler);

        return reactive({
            type: btn_type, disabled, show_loader, 
            content_text, loader_content_text, btn_class_style, on_click
        })
    }

}

export default BaseListViewPropsBuilder;