

import { reactive  }            from "vue";
import ClassStyles              from "@/enums/class_styles.enums";
import ContentManagerUtil       from "@ui/version_2/utils/content_manager_util";

import { 
    AuthBgStylePropsInterface,
    CopyRightPropsinterface
} from "@/types/props_builder_type";

class AuthBaseViewPropsBuilder {
    public readonly name = "auth_base_view_props_builder";

    // Method to get auth background class style
    public static getAuthBackgroundClassStyle (): AuthBgStylePropsInterface {
        const content_manager       = ContentManagerUtil.getInstance();
        const content_data          = content_manager?.get("content_resource.auth_base_view_ui") ?? {};
        const { auth_bg_img_link }  = content_data;

        return reactive<AuthBgStylePropsInterface>({
            backgroundImage: `url("${auth_bg_img_link}")`, 
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            backgroundRepeat: "no-repeat", 
            minHeight: "100vh",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            margin: 0,
            padding: 0,
        })
    }

    // Method to get footer class style
    public static getFooterClassStyle (): string { 
        return ClassStyles?.auth?.auth_base_view_ui?.footer_class_style ?? "";
    }

    // Method to get footer copy right props
    public static getCopyRightProps (): CopyRightPropsinterface {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get("content_resource.auth_base_view_ui.footer") ?? {};
        const class_styles      = ClassStyles?.auth?.auth_base_view_ui?.copy_right_ui ?? {}

        const { powered_by_text, author_text } = content_data;

        return reactive<CopyRightPropsinterface>({ powered_by_text, author_text, ...class_styles })
    }

}

export default AuthBaseViewPropsBuilder;