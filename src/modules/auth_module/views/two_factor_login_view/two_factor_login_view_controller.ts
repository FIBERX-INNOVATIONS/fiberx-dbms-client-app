
import { ref, reactive }                from "vue";
import { Router, useRouter }                    from "vue-router";
import { EventBus }                     from "@/utils/gloabal_event_bus";

import AuthPropsBuilder                 from "@/modules/auth_module/base_logic/auth_props_builder"
import AuthEventhandler                 from "@/modules/auth_module/base_logic/auth_event_handler";;
import TwoFactorLoginViewPropsBuilder   from "@/modules/auth_module/views/two_factor_login_view/two_factor_login_view_props_builder";
import AuthService                      from "@/modules/auth_module/base_logic/auth_service";
import BaseController                   from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import InputGroupUI                     from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ToastAlertUI                     from "@ui/version_2/components/AlertUI/ToastAlertUI/toast_alert_ui.vue";
import ButtonUI                         from "@ui/version_2/components/ButtonUI/button_ui.vue";

import { 
    CSRF_TOKEN_FOR,
    LOCAT_STORAGE_FIELDS 
} from "@/enums/constants.enums";


class TwoFactorLoginViewController extends BaseController {
    public router: Router;
    public event_handler: AuthEventhandler;
    public service: AuthService;
    public event_bus = EventBus;
    private member_auth_manager: MemberAuthManagerUtil;

    constructor(props: Record<string, any> = {}) {
        super("two_factor_login_view", props);

        this.router                 = useRouter();
        this.event_handler          = new AuthEventhandler(this);
        this.service                = new AuthService(this);
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { InputGroupUI, ToastAlertUI, ButtonUI }; 
    }

    // Method to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        return {
            header_text: () => { return TwoFactorLoginViewPropsBuilder.getHeaderText() }
        }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {         
        return {
            csrf_token: ref(null),

            otp_input_group_props: TwoFactorLoginViewPropsBuilder.getOTPInputGroupProps(this.event_handler),

            toast_alert_props: AuthPropsBuilder.getToastAlertProps(this.event_handler),

            btn_props: TwoFactorLoginViewPropsBuilder.getBtnProps(this.event_handler, true)
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        try {
            const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
            const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
            
            if(is_fully_authenticated) { await this.router.push("/dashboard") }

            if(!is_partially_authenticated) { await this.router.push("/login") }

            // get csrf token
            await this.service.getFormCsrfToken(CSRF_TOKEN_FOR.TWO_FACTOR);

            // 🔹 Call event handler to schedule 5-minute redirect
            this.event_handler.redirectToLoginAfterDelay();
        }
        catch (error: unknown) {
            this.logger.error("Failed during TwoFactorLoginView mount logic", { error });
        }
        
    }
 // Method to handle on unmount logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.event_handler.clearRedirectTimer();
        console.log("Timer cleared for two factor")
    }


}

export default TwoFactorLoginViewController;