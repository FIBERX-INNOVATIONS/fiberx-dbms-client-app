

import { reactive  }            from "vue";
import ClassStyles              from "@/enums/class_styles.enums";
import ContentManagerUtil       from "@ui/version_2/utils/content_manager_util";
import SVGIcons                 from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil           from "@ui/version_2/utils/render_html_util";
import InputGroupPropsBuilder   from "@ui/version_2/props_builder/input_group_props_builder";

import { 
    BaseEventHandlerInterface,
} from "@ui/version_2/types/component_type";

import {
    InputGroupPropsInterface,
    ButtonPropsInterface,
    ButtonType,
} from "@ui/version_2/types/props_builder_type";

class LoginViewPropsBuilder {
    public readonly name = "login_view_props_builder";

    // Method to get header text
    public static getHeaderText (): string {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager.get("content_resource.login_view_ui");
        const { sign_in_text }  = content_data;

        return RenderHtmlUtil.renderHtml({icon: SVGIcons?.user_shield_svg_icon, text: sign_in_text});
    }

    // Method to get username input group props
    public static getUsernameInputGroupProps (event_handler: BaseEventHandlerInterface): InputGroupPropsInterface {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get("content_resource.login_view_ui.fieldset") ?? {};
        const class_styles      = ClassStyles?.input_ui ?? {};

        const { email_label_text, email_placeholder_text } = content_data;

        const on_change     = event_handler.handleOnInputchanged.bind(event_handler)
        const label_config  = { label_text: email_label_text, label_required_text: "" };
        const input_config  = { 
            id: "username", type: "text", placeholder: email_placeholder_text,
            value: "", required: true, on_change
        }

        return InputGroupPropsBuilder.buildInputGroupProps(class_styles, label_config, input_config);
    }

    // Method to get password input group props
    public static getPasswordInputGroupProps (event_handler: BaseEventHandlerInterface): InputGroupPropsInterface {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get("content_resource.login_view_ui.fieldset") ?? {};
        const class_styles      = ClassStyles?.input_ui ?? {};

        const { password_label_text, password_placeholder_text  } = content_data;

        const on_change     = event_handler.handleOnInputchanged.bind(event_handler)
        const label_config  = { label_text: password_label_text, label_required_text: "" };
        const input_config  = { 
            id: "password", type: "password", placeholder: password_placeholder_text,
            value: "", required: true, on_change
        }

        return InputGroupPropsBuilder.buildInputGroupProps(class_styles, label_config, input_config);
    }

    // Method to get btn props
    public static getBtnProps (
        event_handler: BaseEventHandlerInterface,
        disabled: boolean = false,
        show_loader: boolean = true,
    ): ButtonPropsInterface {
        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.login_view_ui.fieldset") ?? {};
        const class_styles          = ClassStyles?.form_button_ui ?? {};
        const icon_class_style      = class_styles?.icon_class_style;
        const btn_class_style       = class_styles?.btn_class_style

        const btn_type              = "button";
        const { btn_text }          = content_data;
        const content_text          = RenderHtmlUtil.renderHtml({ text: btn_text, icon: SVGIcons.paper_airplane_send_svg_icon, icon_class_style, order: "text-first" })
        const loader_content_text   = RenderHtmlUtil.renderLoaderHtml({});
        const on_click              = event_handler?.handleLoginSubmitBtnClick.bind(event_handler);

        return reactive({
            type: btn_type, disabled, show_loader, 
            content_text, loader_content_text, btn_class_style, on_click
        })
    }
}

export default LoginViewPropsBuilder;