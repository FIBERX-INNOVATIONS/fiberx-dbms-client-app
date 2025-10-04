
import { ref, }                 from "vue";
import { Emitter }              from "mitt";
import { createEventBus }       from "@ui/version_2/utils/global_event_bus_util";
import LoginViewEventHandler    from "./login_view_event_handler";
import LoginViewPropsBuilder    from "./login_view_props_builder";
import LoginViewService         from "./login_view_service";
import BaseController           from "@ui/version_2/base_classes/base_controller";
import InputGroupUI             from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ToastAlertUI             from "@ui/version_2/components/AlertUI/ToastAlertUI/toast_alert_ui.vue";
import ButtonUI                 from "@ui/version_2/components/ButtonUI/button_ui.vue";

import { AppEvents  }       from "@/types/app_event_type";

class LoginViewController extends BaseController {
    public event_handler: LoginViewEventHandler;
    public service: LoginViewService;
    public event_bus: Emitter<AppEvents>;

    constructor(props: Record<string, any> = {}) {
        super("login_view", props);

        this.event_handler  = new LoginViewEventHandler(this);
        this.service        = new LoginViewService(this);
        this.event_bus      = createEventBus<AppEvents>();
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

            toast_alert_props: LoginViewPropsBuilder.getToastAlertProps(this.event_handler),

            btn_props: LoginViewPropsBuilder.getBtnProps(this.event_handler, true)
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        
    }


}

export default LoginViewController;