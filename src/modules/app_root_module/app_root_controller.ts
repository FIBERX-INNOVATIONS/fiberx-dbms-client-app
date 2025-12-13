
import { ref, getCurrentInstance }     from "vue";
import { Router, useRoute, useRouter } from "vue-router";

import { LOCAL_STORAGE_FIELDS } from "@/enums/constants.enums";
import { EventBus }             from "@/utils/gloabal_event_bus";
import AppRootPropsBuilder      from "./app_root_props_builder";
import AppRootEventHandler      from "./app_root_event_handler";
import MemberAuthManagerUtil    from "@ui/version_2/utils/member_auth_manager_util";
import BaseController           from "@ui/version_2/base_classes/base_controller";
import ScreenLoaderUI           from "@ui/version_2/components/LoaderUI/ScreenLoaderUI/screen_loader_ui.vue";
import StatusAlertUI            from "@ui/version_2/components/AlertUI/StatusAlertUI/status_alert_ui.vue";
import AuthBaseView             from "@/modules/auth_module/views/auth_base_view/auth_base_view.vue";
import DashboardBaseView        from "@/modules/dashboard_module/views/dashboard_base_view/dashboard_base_view.vue";
import ModalUI                  from "@ui/version_2/components/ModalUI/modal_ui.vue";


import { 
    StatusChangedPayloadInterface,
    CloseModalPayloadInterface,
    OpenNewModalPayloadInterface
} from "@/types/app_event_type";

class AppRootController extends BaseController {
    public event_handler: AppRootEventHandler;
    public event_bus = EventBus;
    public router: Router;
    public member_auth_manager: MemberAuthManagerUtil;

    constructor(props: Record<string, any> = {}) {
        super("app_root", props);

        this.router                 = useRouter();
        this.event_handler          = new AppRootEventHandler(this);
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { ScreenLoaderUI, StatusAlertUI, AuthBaseView, DashboardBaseView, ModalUI }; 
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
            modals: ref([]),

            screen_loader_props: AppRootPropsBuilder.getScreenLoaderProps(),

            status_alert_props: AppRootPropsBuilder.getStatusAlertProps(this.event_handler),

        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAL_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAL_STORAGE_FIELDS.MEMBER_KEY);
        
        // Bridge mitt events to Vue template handlers
        this.event_bus.on("isLoading", (val: boolean) => {
            this.event_handler.handleLoading(val);
        });

        this.event_bus.on("alert_status_updated", async (payload: StatusChangedPayloadInterface) => {
            await this.event_handler.handleStatusChanged(payload);
        });

        this.event_bus.on("open_new_modal", async (payload: OpenNewModalPayloadInterface) => {
            this.event_handler.handleOpenNewModal(payload)
        });

        this.event_bus.on("close_modal", async (payload: CloseModalPayloadInterface) => {
            this.event_handler.handleCloseModal(payload);
        });

        if(is_fully_authenticated || is_partially_authenticated) {
            this.event_handler.startInactivityTracking();
        }
    }


}

export default AppRootController;