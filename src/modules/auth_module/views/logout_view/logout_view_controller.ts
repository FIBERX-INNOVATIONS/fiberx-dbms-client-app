
import { ref, reactive }        from "vue";
import { Router, useRouter }    from "vue-router";
import { EventBus }             from "@/utils/gloabal_event_bus";
import AuthEventhandler         from "@/modules/auth_module/base_logic/auth_event_handler";;
import LogoutViewPropsBuilder   from "@/modules/auth_module/views/logout_view/logout_view_props_builder";
import AuthService              from "@/modules/auth_module/base_logic/auth_service";
import BaseController           from "@ui/version_2/base_classes/base_controller";

class LogoutViewController extends BaseController {
    public router: Router;
    public event_handler: AuthEventhandler;
    public service: AuthService;
    public event_bus = EventBus

    constructor(props: Record<string, any> = {}) {
        super("logout_view", props);

        this.router         = useRouter();
        this.event_handler  = new AuthEventhandler(this);
        this.service        = new AuthService(this);
    }

    // Method to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        return {
            header_text: () => { return LogoutViewPropsBuilder.getHeaderText() }
        }; 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        // Member logout
        await this.service.executeLogOut();

        // await this.router.push("/login");
        
    }


}

export default LogoutViewController;