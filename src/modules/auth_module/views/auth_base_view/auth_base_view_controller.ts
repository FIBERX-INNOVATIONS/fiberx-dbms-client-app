
import { ref, }                     from "vue";
import { useRouter }                from "vue-router";
import { LOCAT_STRAGE_FIELDS }      from "@/enums/constants.enums";
import AuthBaseViewPropsBuilder     from "./auth_base_view_props_builder";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil        from "@ui/version_2/utils/member_auth_manager_util";
import CopyRightUI                  from "@ui/version_2/components/CopyRightUI/copy_right_ui.vue";




class AuthBaseViewController extends BaseController {
    private member_auth_manager: MemberAuthManagerUtil;

    constructor(props: Record<string, any> = {}) {
        super("auth_base_view", props);
        this.member_auth_manager        = new MemberAuthManagerUtil();
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

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const router                        = useRouter();
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);
        const is_not_authenticated          = (is_fully_authenticated === false && is_partially_authenticated === false);

        if(is_not_authenticated === false) { router.push("/dashboard") }
    }
}

export default AuthBaseViewController;