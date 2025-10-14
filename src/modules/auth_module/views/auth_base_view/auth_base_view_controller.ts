
import { ref, }                     from "vue";
import { Router, useRouter }        from "vue-router";
import AuthBaseViewPropsBuilder     from "./auth_base_view_props_builder";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil        from "@ui/version_2/utils/member_auth_manager_util";
import CopyRightUI                  from "@ui/version_2/components/CopyRightUI/copy_right_ui.vue";


class AuthBaseViewController extends BaseController {
    private member_auth_manager: MemberAuthManagerUtil;
    public router: Router;

    constructor(props: Record<string, any> = {}) {
        super("auth_base_view", props);
        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { CopyRightUI }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {         
        return {
            main_bg_style: AuthBaseViewPropsBuilder.getAuthBackgroundClassStyle(),

            footer_class_style: AuthBaseViewPropsBuilder.getFooterClassStyle(),

            copyright_props: AuthBaseViewPropsBuilder.getCopyRightProps (),
        } 
    }
}

export default AuthBaseViewController;