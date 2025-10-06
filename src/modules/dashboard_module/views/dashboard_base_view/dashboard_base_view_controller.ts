import { ref, }                         from "vue";
import { useRouter }                    from "vue-router";
import { LOCAT_STRAGE_FIELDS }          from "@/enums/constants.enums";
import DashboardBaseViewPropsBuilder    from "./dashboard_base_view_props_builder";
import BaseController                   from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";


class DashboardBaseViewController extends BaseController {
    private member_auth_manager: MemberAuthManagerUtil;

    constructor(props: Record<string, any> = {}) {
        super("auth_base_view", props);
        this.member_auth_manager        = new MemberAuthManagerUtil();
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {         
        return {
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const router                        = useRouter();
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STRAGE_FIELDS.MEMBER);

        if(is_partially_authenticated) { await router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await router.push("/logout") }
    }
}

export default DashboardBaseViewController;