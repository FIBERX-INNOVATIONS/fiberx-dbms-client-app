
import { ref, reactive }        from "vue";
import { Router, useRouter }    from "vue-router";
import { EventBus }             from "@/utils/gloabal_event_bus";
import { LOCAT_STORAGE_FIELDS }  from "@/enums/constants.enums";
import AuthPropsBuilder         from "@/modules/auth_module/base_logic/auth_props_builder"
import AuthEventhandler         from "@/modules/auth_module/base_logic/auth_event_handler";;
import LoginViewPropsBuilder    from "@/modules/auth_module/views/login_view/login_view_props_builder";
import AuthService              from "@/modules/auth_module/base_logic/auth_service";
import BaseController           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil    from "@ui/version_2/utils/member_auth_manager_util";
import InputGroupUI             from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ToastAlertUI             from "@ui/version_2/components/AlertUI/ToastAlertUI/toast_alert_ui.vue";
import ButtonUI                 from "@ui/version_2/components/ButtonUI/button_ui.vue";

class LoginViewController extends BaseController {
    public event_handler: AuthEventhandler;
    public service: AuthService;
    public event_bus = EventBus;
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;

    constructor(props: Record<string, any> = {}) {
        super("login_view", props);

        this.event_handler              = new AuthEventhandler(this);
        this.service                    = new AuthService(this);
        this.router                     = useRouter();
        this.member_auth_manager        = new MemberAuthManagerUtil();
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { InputGroupUI, ToastAlertUI, ButtonUI }; 
    }

    // Method to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        return {
            header_text: () => { return LoginViewPropsBuilder.getHeaderText() }
        }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {         
        return {
            csrf_token: ref(null),

            username_input_group_props: LoginViewPropsBuilder.getUsernameInputGroupProps(this.event_handler),

            password_input_group_props: LoginViewPropsBuilder.getPasswordInputGroupProps(this.event_handler),

            toast_alert_props: AuthPropsBuilder.getToastAlertProps(this.event_handler),

            btn_props: LoginViewPropsBuilder.getBtnProps(this.event_handler, true)
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_fully_authenticated) { await this.router.push("/dashboard") }

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        // delete member data
        // this.service?.deleteMemberdata?.();
        // get csrf token
        await this.service.getFormCsrfToken();
        
    }


}

export default LoginViewController;