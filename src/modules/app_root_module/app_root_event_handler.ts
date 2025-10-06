
import { useRouter }                from "vue-router";

import AppRootPropsBuilder          from "./app_root_props_builder";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

import { 
    StatusChangedPayloadInterface 
} from "@/types/app_event_type";


class AppRootEventHandler extends BaseEventHandler {
    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);
    }

    // Method to handle on click event
    public handleOnCloseStatusClick (event: MouseEvent) {
        let { status_alert_props }  = this.controller.state_refs;
        const alert_box_id          = status_alert_props?.alert_box_id;
        const alert_box_el          = document.getElementById(alert_box_id);

        if(alert_box_el) {
            alert_box_el.classList.remove("animate-slide-in");
            alert_box_el.classList.add("animate-slide-out");
        }

        setTimeout(() => { status_alert_props.visible = false }, 300); 
    }

    // Method to handle is loading event
    public handleLoading (value: boolean) {
        this.controller.state_refs.screen_loader_props.visible = value;
    };

    // Method to handle status changed event
    public async handleStatusChanged (payload: StatusChangedPayloadInterface) {
       const { status, message, options = {} } = payload;
        const { duration = 2000, should_reload = false, redirect_url = "", close_modal = false } = options;

        const visible                   = !!(status && message);
        const new_status_alert_props    = AppRootPropsBuilder.getStatusAlertProps(this, visible, status, message);

        Object.assign(this.controller.state_refs.status_alert_props, new_status_alert_props);

        // Optional: close any open modal immediately
        // if (close_modal) { this.closeModal(); }

        // Wait for the alert to be displayed
        if (duration > 0) { await new Promise((resolve) => setTimeout(resolve, duration)); }

        // Hide alert after duration
        this.controller.state_refs.status_alert_props.visible = false;

        // Handle post-alert actions
        const router = useRouter()

        if (should_reload) { router.go(0); } 

        else if (redirect_url && redirect_url.length > 0) { await router.push(redirect_url); }
    };
}

export default AppRootEventHandler;