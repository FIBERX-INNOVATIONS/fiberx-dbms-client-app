
import BaseProfileViewController            from "@/base_classes/profile_view/base_profile_view_controller";
import RegisteredAppProfileViewPropsBuilder from "./registered_app_profile_view_props_builder";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";

class RegisteredAppProfileViewController extends BaseProfileViewController {

    constructor(props: Record<string, any> = {}) {
        super("registered_app_profile_view", props);

        this.content_field_key  = "registered_app_view_ui"
        this.route_query_key    = "registered_app_profile";
    }

    // Method to get ui state data
    protected getCustomChildUIStateData(): Record<string, any> {        
        return {
            img_avatar_ui_props: RegisteredAppProfileViewPropsBuilder.getImgAvatarUIProps(this.props.record),
        } 
    }

    // Method to to get ui computed data
    protected getCustomChildComputedData (): Record<string, () => any> { 
        const { 
            base_url = "" , 
            social_links = {},
            urls = [],
            combined_urls = []
        } = this.props.record ?? {};

        return {
            formatted_base_url: () => { return InputTransformerUtil.formatURLToAnchorHtml(base_url, base_url); },

            formatted_social_links: () => { 
                return Object.keys(social_links)
                .map(
                    (social_key: string) => { 
                        return InputTransformerUtil.formatURLToAnchorHtml(social_key, social_links[social_key]); 
                    }
            )},

            formatted_urls: () => { 
                const _urls = combined_urls || urls;
                return _urls
                .map(
                    (url_value: string) => { 
                        return InputTransformerUtil.formatURLToAnchorHtml(url_value, url_value); 
                    }
            )},
        }; 
        
    }
}

export default RegisteredAppProfileViewController;