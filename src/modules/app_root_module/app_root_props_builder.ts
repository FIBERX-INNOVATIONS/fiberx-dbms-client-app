
import { reactive  }            from "vue";
import ClassStyles              from "@/enums/class_styles.enums";
import ContentManagerUtil       from "@ui/version_2/utils/content_manager_util";
import SVGIcons                 from "@ui/version_2/resources/svg_icon_resource";

import { 
    BaseEventHandlerInterface 
} from "@ui/version_2/types/component_type";

import { 
    ScreenLoaderProps,
    StatusAlertProps
} from "@/types/props_builder_type";

class AppRootPropsBuilder {
    public readonly name = "app_root_props_builder";

    // Method to get status alert bg class style
    private static getStatusBgClassStyle (alert_status: string): string {
        const class_styles      = ClassStyles?.app_root?.status_alert_ui ?? {};
        const status            = alert_status.toLowerCase() || "info";

        switch (status) {
            case "success":
                return class_styles?.sucess_bg_class_style
            case "error":
                return class_styles?.error_bg_class_style;
            default:
                return class_styles?.info_bg_class_style;
        }
    }

    // Method to get status text class style
    private static getStatusTextClassStyle (alert_status: string): string {
        const class_styles      = ClassStyles?.app_root?.status_alert_ui ?? {};
        const status            = alert_status.toLowerCase() || "info";

        switch (status) {
            case "success":
                return class_styles?.sucess_text_class_style;
            case "error":
                return class_styles?.error_text_class_style
            default:
                return class_styles?.info_text_class_style
        }
    }

    // Method to get status icon 
    private static getStatusIcon (alert_status: string): string {
        const status            = alert_status.toLowerCase() || "info";

        switch (status) {
            case "success":
                return SVGIcons?.smiley_face_svg_icon;
            case "error":
                return SVGIcons?.error_exclamation_mark_svg_icon;
            default:
                return SVGIcons?.question_mark_svg_icon;
        }

    }

    // Method to get slider animation
    private static getAnimationClassStyle (visible: boolean): string {
        return visible ? "animate-slide-in" : "animate-slide-out";
    }


    // Method to get screen loader ui props
    public static getScreenLoaderProps (visible: boolean = false, load_text: string | null = null): ScreenLoaderProps {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get("content_resource.screen_loader_ui") ?? {};
        const class_styles      = ClassStyles?.app_root?.screen_loader_ui ?? {};

        const { img_src_link, img_alt_text, loader_text } = content_data;

        const loader_symbol = { 
            type: "img", 
            src: img_src_link, 
            class_style: class_styles.loader_symbol_img_class_style, 
            alt_text: img_alt_text 
        }

        const _load_text = load_text ?? loader_text

        return reactive<ScreenLoaderProps>({
            visible, loader_symbol, loader_text: _load_text,
            ...class_styles
        })
    }

    // Method to get status alert ui props
    public static getStatusAlertProps(
        event_handler: BaseEventHandlerInterface, 
        visible: boolean = false,
        status: string = "",
        message: string = "",
    ): StatusAlertProps {
        const alert_box_id              = "StatusAlertBox";
        const alert_status              = status;
        const alert_message             = message;
        const class_styles              = ClassStyles?.app_root?.status_alert_ui ?? {};
        const status_icon               = this.getStatusIcon(alert_status);
        const alert_box_class_style     = `${class_styles?.alert_box_class_style} ${this.getStatusBgClassStyle(alert_status)} ${this.getAnimationClassStyle(visible)}`;
        const close_btn_class_style     = `${class_styles?.close_btn_class_style} ${this.getStatusBgClassStyle(alert_status)} ${this.getStatusTextClassStyle(alert_status)}`;
        const status_icon_class_style   = `${class_styles?.status_icon_class_style} ${this.getStatusTextClassStyle(alert_status)}`;
        const status_content_class_style= `${class_styles?.status_content_class_style} ${this.getStatusTextClassStyle(alert_status)}`;
        const on_close                  = event_handler.handleOnCloseStatusClick.bind(event_handler)

        return reactive<StatusAlertProps>({
            alert_box_id,
            visible, 
            alert_status,  
            status_icon, 
            status_content_messgae: alert_message, 
            on_close,
            ...class_styles,
            alert_box_class_style,
            close_btn_class_style,
            status_icon_class_style,
            status_content_class_style
        });
    }
}

export default AppRootPropsBuilder;