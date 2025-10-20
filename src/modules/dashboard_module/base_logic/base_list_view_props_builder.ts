
import { reactive  }                        from "vue";
import ClassStyles                          from "@/enums/class_styles.enums";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import SVGIcons                             from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil                       from "@ui/version_2/utils/render_html_util";
import BreadCrumbMenuListConfig             from "@/configs/menu_list_configs/bread_crumn_menu_list_config";   
import SearchFieldUIPropsBuilder            from "@ui/version_2/props_builder/search_field_ui_props_builder"; 

import { BaseEventHandlerInterface }        from "@ui/version_2/types/component_type";
import { BaseListViewClassStyleinterface }  from "@/types/props_builder_type";
import { MenuListConfigInterface }          from "@/types/menu_list_config_type";
import { TableColumnConfigInterface }       from "@/types/table_column_config_type";
import { 
    SortDirectionType,
    BreadCrumbUIPropsInterface, 
    ButtonType, 
    SearchFieldUIPropsInterface,
    ButtonUIPropsInterface,
    MenuListUIPropsInterface,
    TableHeaderUIPropsInterface,
    TableBodyUIPropsInterface,
    PaginationUIPropsInterface
} from "@ui/version_2/types/props_builder_type"




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
        const on_change                 = event_handler.handleOnSearchInput.bind(event_handler);
        const input_config              = { id: "RegisteredAppSearchInput", type: "text", value: "", placeholder: search_placeholder_text, input_class_style, on_change };

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

    // Method to get pagination result props
    public static getPaginationResultProps (
        content_field_key: string,
        current_page: number = 1,
        total_pages: number = 0, 
        total_items: number = 0,
        size: number = 12,
    ): string {
        const pagination_data: Record<string, number> = {  current_page, total_items, total_pages, page_limit: size };

        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.pagination_result`) ?? {};
        const { result_text }           = content_data;

        const generated_text = result_text.replace(/{{(\w+)}}/g, (match: string, key: string): string => {
            return key in pagination_data ? String(pagination_data[key]) : match;
        });
        return generated_text
    }

    // Method to get ellipsis button props
    public static getEllipsisBtnProps (
        id: string,
        event_handler: BaseEventHandlerInterface,
        is_visible: boolean = true,
        btn_text: string = "",
        disabled: boolean = false,
        show_loader: boolean = true,
    ): ButtonUIPropsInterface {
        const class_styles              = ClassStyles?.ellipsis_menu_options_ui ?? {};
        const icon_class_style          = class_styles?.icon_class_style;
        const btn_class_style           = `${class_styles?.btn_class_style} ${is_visible ? "": "hidden"}`;
        const btn_type                  = "button";
        const content_text              = RenderHtmlUtil.renderHtml({ text: btn_text, icon: SVGIcons.vertical_elipsis_svg_icon, icon_class_style, })
        const loader_content_text       = RenderHtmlUtil.renderLoaderHtml({});
        const on_click                  = event_handler?.toggleEllipsisDropdown.bind(event_handler);

        return reactive({
            id, type: btn_type, disabled, show_loader, 
            content_text, loader_content_text, btn_class_style, on_click
        })
    }

    // Method to get Profile dropdown ui props
    public static getBulkActionMenuListProps (
        btn_id:string, 
        menu_id: string, 
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        menu_list_config: MenuListConfigInterface
    ): MenuListUIPropsInterface {
        const id                    = menu_id;
        const parent_id             = btn_id;
        const class_styles          = ClassStyles?.list_view_ui.dropdown_menu_list_ui ?? {};
        const menu_list             = menu_list_config.getBulkActionMenuList(event_handler, content_field_key)

        const { wrapper_class_style, list_class_style, list_item_class_style } = class_styles;

        return reactive({ id, parent_id, wrapper_class_style, list_class_style, list_item_class_style, menu_list  })
    }

    // Method to get data table header props
    public static getDataTableHeaderProps (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        table_column_config: TableColumnConfigInterface,
        order_by: string = "created_at",
        order_direction: SortDirectionType = "desc"
    ): TableHeaderUIPropsInterface {
        const class_styles              = ClassStyles?.list_view_ui?.data_table_ui?.table_header_ui ?? {};
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.data_table`) ?? {};
        const { sn_text, actions_text } = content_data;
        const columns                   = table_column_config.getTableColumnConfig(event_handler, content_field_key, order_by, order_direction);

        const { wrapper_class_style, header_row_class_style, header_cell_class_style } = class_styles;


        return reactive({
            sn_text, actions_text, columns, wrapper_class_style, header_row_class_style, header_cell_class_style
        })
    }

    // Method to get data table body props
    public static getDataTableBodyProps (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        table_column_config: TableColumnConfigInterface,
        order_by: string = "created_at",
        order_direction: SortDirectionType = "desc",
        records: Record<string, any>[] = []
    ): TableBodyUIPropsInterface {
        const class_styles              = ClassStyles?.list_view_ui?.data_table_ui?.table_body_ui ?? {};
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.data_table`) ?? {};
        const columns                   = table_column_config.getTableColumnConfig(event_handler, content_field_key, order_by, order_direction);

        const { sn_text, actions_text, no_data_text } = content_data;
        const { wrapper_class_style, body_row_class_style, body_cell_class_style } = class_styles;


        return reactive({
            sn_text, actions_text, columns, records, empty_text: no_data_text,
            wrapper_class_style, body_row_class_style, body_cell_class_style
        })
    }

    // Method to get data table menu action btn
    public static getTableActionBtnProps (
        event_handler: BaseEventHandlerInterface,
        record_index: Number,
        record: Record<string, any>
    ): ButtonUIPropsInterface {
        const id                        = `TableActionBtn_${record_index}`;
        const class_styles              = ClassStyles?.ellipsis_menu_options_ui ?? {};
        const icon_class_style          = class_styles?.icon_class_style;
        const btn_class_style           = class_styles?.btn_class_style;
        const btn_type                  = "button";
        const content_text              = RenderHtmlUtil.renderHtml({ icon: SVGIcons.vertical_elipsis_svg_icon, icon_class_style, })
        const loader_content_text       = RenderHtmlUtil.renderLoaderHtml({});
        const event_handler_method      = event_handler?.toggleEllipsisDropdown.bind(event_handler);

        const on_click  = async (event: MouseEvent) => { 
            await event_handler_method (event, record, record_index); 
        }

        return reactive({
            id, type: btn_type, disabled: false, show_loader: false, 
            content_text, loader_content_text, btn_class_style, on_click
        })

    }

    // Method to get table action menu list props
    public static getDataTableMenuListProps (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        menu_list_config: MenuListConfigInterface,
        record_index: Number,
        record: Record<string, any>
    ): MenuListUIPropsInterface {
        const id                    = `TableActionMenu_${record_index}`;
        const parent_id             = `TableActionBtn_${record_index}`;
        const class_styles          = ClassStyles?.list_view_ui?.data_table_ui?.menu_list_item_ui ?? {};
        const menu_list             = menu_list_config.getTableMenuList(event_handler, content_field_key, record, record_index)

        const { wrapper_class_style, list_class_style, list_item_class_style } = class_styles;

        return reactive({ id, parent_id, wrapper_class_style, list_class_style, list_item_class_style, menu_list  })
    }

    // Method to get pagination ui props
    public static getPaginationProps (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
    ): PaginationUIPropsInterface {
        const class_styles              = ClassStyles?.list_view_ui?.pagination_ui;
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.pagination_result`) ?? {};

        const { prev_btn_text, next_btn_text, page_text }   = content_data

        const { 
            wrapper_class_style, prev_button_class_style, next_button_class_style,
            disabled_class_style, select_class_style, prev_btn_content_class_style,
            next_btn_content_class_style,
        } = class_styles;

        const select_id                 = "registered_app_pagination_select"
        const loader_content_text       = RenderHtmlUtil.renderLoaderHtml({});
        const prev_btn_content          = RenderHtmlUtil.renderHtml({ text: prev_btn_text, icon: SVGIcons.less_than_caret_svg_icon, icon_class_style: prev_btn_content_class_style })
        const next_btn_content          = RenderHtmlUtil.renderHtml({ text: next_btn_text, icon: SVGIcons.greater_than_caret_svg_icon, icon_class_style: next_btn_content_class_style, order: "text-first" })
        const render_page_content       = (page: number) => { return page_text.replace("%", page); }
        const on_prev_clicked           = event_handler?.handleOnPageChange.bind(event_handler);
        const on_next_clicked           = event_handler?.handleOnPageChange.bind(event_handler);
        const on_new_page_clicked       = event_handler?.handleOnPageChange.bind(event_handler);
        

        return reactive({
            select_id, wrapper_class_style, prev_button_class_style, next_button_class_style,
            disabled_class_style, select_class_style, show_loader: true, 
            loader_content_text, prev_btn_content, next_btn_content, 
            render_page_content, on_prev_clicked, on_next_clicked, on_new_page_clicked
        })
    }
}

export default BaseListViewPropsBuilder;