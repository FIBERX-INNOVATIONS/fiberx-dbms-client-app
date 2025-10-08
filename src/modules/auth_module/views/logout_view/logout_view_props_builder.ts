
import { reactive  }            from "vue";
import ClassStyles              from "@/enums/class_styles.enums";
import ContentManagerUtil       from "@ui/version_2/utils/content_manager_util";
import SVGIcons                 from "@ui/version_2/resources/svg_icon_resource";
import RenderHtmlUtil           from "@ui/version_2/utils/render_html_util";

class LogoutViewPropsBuilder {
    public readonly name = "logout_view_props_builder";

    // Method to get header text
    public static getHeaderText (): string {
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager.get("content_resource.logout_view_ui");
        const { logout_text }  = content_data;

        return RenderHtmlUtil.renderHtml({icon: SVGIcons?.user_shield_svg_icon, text: logout_text});
    }
}

export default LogoutViewPropsBuilder;