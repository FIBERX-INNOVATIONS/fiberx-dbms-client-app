
import { reactive  }            from "vue";
import ClassStyles              from "@/enums/class_styles.enums";
import SVGIcons                 from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil           from "@ui/version_2/utils/render_html_util";
import ToastAlertUIPropsBuilder from "@ui/version_2/props_builder/toast_alert_ui_props_builder";

import { 
    BaseEventHandlerInterface,
} from "@ui/version_2/types/component_type";

import {
    InputGroupPropsInterface,
    ToastAlertPropsInterface,
    ButtonPropsInterface,
    ButtonType,
} from "@ui/version_2/types/props_builder_type";

class AuthPropsBuilder {
    public readonly name = "auth_props_builder";

    // Method to get toast alert props
    public static getToastAlertProps (
        event_handler: BaseEventHandlerInterface, 
        status: string = "",
        message: string = "",
    ): ToastAlertPropsInterface {
        const class_styles      = ClassStyles?.toast_alert_ui ?? {};
        
        return ToastAlertUIPropsBuilder.getToastAlertProps(event_handler, status, message, class_styles);

    }

    

}

export default AuthPropsBuilder;