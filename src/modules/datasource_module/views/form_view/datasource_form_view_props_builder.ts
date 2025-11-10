
import { reactive  }                    from "vue";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import SVGIcons                         from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil                   from "@ui/version_2/utils/render_html_util";
import InputGroupUIPropsBuilder         from "@ui/version_2/props_builder/input_group_ui_props_builder";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";

import { 
    ButtonUIPropsInterface, 
    InputGroupPropsInterface,
    InputUIPropsInterface,
} from "@ui/version_2/types/props_builder_type";


class DatasourceFormViewPropsBuilder {
    public readonly name = "datasource_form_view_props_builder";

    // Method to render registered app label in select search
    private static renderRegisteredAppLabel (record: Record<string, any>): string {
        if(!record || !record?.public_id || !record?.name) { return "" }

        const { public_id, name, logo_utl } = record;
        return `[${public_id}] ${name}`;
    }

    // Method to get registered app value
    private static getRegisteredAppValue (record: Record<string, any>): string { return record?.public_id ?? "" }
 
    // Method to get app name input group props
    public static getInputGroupProps (
        event_handler: BaseEventHandlerInterface,
        field_key: string, 
        existing_value: string | number | boolean = "",
        input_type: string = "text",
        read_only: boolean = false,
        record: Record<string, any> = {}
    ): InputGroupPropsInterface {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get("content_resource.datasource_view_ui.form_view_ui.fieldset") ?? {};
        const class_styles      = ClassStyles?.input_ui ?? {};

        const { base, index }           = InputTransformerUtil.extractInputBaseAndIndexFieldKey(field_key);
        const label_text_key            = `${base}_label_text`;
        const placeholder_text_key      = `${base}_placeholder_text`;
        const label_text                = content_data[label_text_key];
        const placeholder               = content_data[placeholder_text_key];
        const on_change                 = event_handler.handleOnInputchanged.bind(event_handler);
        const fetch_method              = event_handler.fetchPreviewRegisteredApps.bind(event_handler);
        const render_option_label       = this.renderRegisteredAppLabel;
        const get_option_value          = this.getRegisteredAppValue;
        const label_config              = { label_text, label_required_text: "" };
        const input_boolean_config      = { required: true, cache_enabled: true, read_only };
        const input_content_config      = { no_options_content: content_data?.no_registered_apps_text, label_text: this.renderRegisteredAppLabel(record) };
        const input_number_config       = { rows: 8 };
        const input_event_methods       = { on_change, fetch_method, render_option_label, get_option_value };
        const input_config              = InputGroupUIPropsBuilder.getInputUIConfig(
            field_key, input_type, placeholder, existing_value, 
            input_boolean_config, input_content_config, 
            input_number_config, input_event_methods, class_styles
        )

        return InputGroupUIPropsBuilder.buildInputGroupProps(class_styles, label_config, input_config);
    }

    // Method to get add social link props
    public static getAddConnectionInfoProps (event_handler: BaseEventHandlerInterface,): ButtonUIPropsInterface {
        const class_styles          = ClassStyles?.social_link_btn_ui ?? {};
        const icon_class_style      = class_styles?.icon_class_style;
        const btn_class_style       = class_styles?.btn_class_style
        const btn_type              = "button";
        const content_text          = RenderHtmlUtil.renderHtml({ icon: SVGIcons.plus_circle_svg_icon, class_style: icon_class_style, icon_class_style })
        const loader_content_text   = RenderHtmlUtil.renderLoaderHtml({});
        const on_click              = event_handler?.handleAddNewConnectionInfo.bind(event_handler);

        return reactive({
            type: btn_type, disabled: false, show_loader: true, 
            content_text, loader_content_text, btn_class_style, on_click
        })

    }

    // Method to get remove social link props
    public static getRemoveConnectionInfoProps(
        event_handler: BaseEventHandlerInterface,
        social_link_id: string, 
        social_link_key_input_id: string
    ): ButtonUIPropsInterface {
        const class_styles                  = ClassStyles?.social_link_btn_ui ?? {};
        const icon_class_style              = class_styles?.icon_class_style;
        const btn_class_style               = class_styles?.delete_btn_class_style;
        const btn_type                      = "button";
        const content_text                  = RenderHtmlUtil.renderHtml({ icon: SVGIcons.delete_trash_svg_icon, class_style: icon_class_style, icon_class_style });
        const loader_content_text           = RenderHtmlUtil.renderLoaderHtml({});
        const on_click                      = (event: MouseEvent) => { event_handler?.handleRemoveConnectionInfo?.bind(event_handler)(event, social_link_id, social_link_key_input_id) } ;

        return reactive({
            id: social_link_id, type: btn_type, disabled: false, show_loader: false,
            content_text, loader_content_text, btn_class_style, on_click
        });
    }
 
    // Method to get btn props
    public static getBtnProps (
        event_handler: BaseEventHandlerInterface,
        disabled: boolean = false,
        show_loader: boolean = true,
    ): ButtonUIPropsInterface {
        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.datasource_view_ui.form_view_ui.fieldset") ?? {};
        const class_styles          = ClassStyles?.form_button_ui ?? {};
        const icon_class_style      = class_styles?.icon_class_style;
        const btn_class_style       = class_styles?.btn_class_style

        const btn_type              = "button";
        const { btn_text }          = content_data;
        const content_text          = RenderHtmlUtil.renderHtml({ text: btn_text, icon: SVGIcons.paper_airplane_send_svg_icon, icon_class_style, order: "text-first" })
        const loader_content_text   = RenderHtmlUtil.renderLoaderHtml({});
        const on_click              = event_handler?.handleSubmitBtnClick.bind(event_handler);

        return reactive({
            type: btn_type, disabled, show_loader, 
            content_text, loader_content_text, btn_class_style, on_click
        })
    }
}

export default DatasourceFormViewPropsBuilder