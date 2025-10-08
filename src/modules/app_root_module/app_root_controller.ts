
import { ref, getCurrentInstance }     from "vue";
import { Router, useRoute, useRouter } from "vue-router";

import { EventBus }             from "@/utils/gloabal_event_bus";
import AppRootPropsBuilder      from "./app_root_props_builder";
import AppRootEventHandler      from "./app_root_event_handler";
import BaseController           from "@ui/version_2/base_classes/base_controller";
import ScreenLoaderUI           from "@ui/version_2/components/LoaderUI/ScreenLoaderUI/screen_loader_ui.vue";
import StatusAlertUI            from "@ui/version_2/components/AlertUI/StatusAlertUI/status_alert_ui.vue";
import AuthBaseView             from "@/modules/auth_module/views/auth_base_view/auth_base_view.vue";
import DashboardBaseView        from "@/modules/dashboard_module/views/dashboard_base_view/dashboard_base_view.vue";


import { 
    StatusChangedPayloadInterface 
} from "@/types/app_event_type";

class AppRootController extends BaseController {
    public event_handler: AppRootEventHandler;
    public event_bus = EventBus;
    public router: Router;

    constructor(props: Record<string, any> = {}) {
        super("app_root", props);

        this.router         = useRouter();
        this.event_handler  = new AppRootEventHandler(this);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { ScreenLoaderUI, StatusAlertUI, AuthBaseView, DashboardBaseView }; 
    }

    // Method to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        const route                         = useRoute();
        const vue_instance                  = getCurrentInstance();
        const auth_routes_list: string[]    = vue_instance?.proxy?.$AUTH_ROUTES ?? [];

        return {
            is_auth_route: () => {
                // If route.meta is present, use it directly
                if (route?.meta?.is_auth_page) { return true; }

                // Fallback to checking global auth routes
                const route_name = route?.name?.toString() ?? "";
                const is_included = auth_routes_list.includes(route_name);
                return is_included
            }
        };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {         
        return {
            screen_loader_props: AppRootPropsBuilder.getScreenLoaderProps(),

            status_alert_props: AppRootPropsBuilder.getStatusAlertProps(this.event_handler),

        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        // Bridge mitt events to Vue template handlers
        this.event_bus.on("isLoading", (val: boolean) => {
            this.event_handler.handleLoading(val);
        });

        this.event_bus.on("statusChanged", async (payload: StatusChangedPayloadInterface) => {
            await this.event_handler.handleStatusChanged(payload);
        });
    }


}

export default AppRootController;