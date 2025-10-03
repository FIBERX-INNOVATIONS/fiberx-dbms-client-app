import AppRootPropsBuilder          from "./app_root_props_builder";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

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
    public handleStatusChanged (payload: { status: string; message: string }) {
        const { status, message }   = payload;
        const visible               = status && message ? true : false
        const status_alert_props    = AppRootPropsBuilder.getStatusAlertProps(this, visible, status, message)
        this.controller.state_refs.status_alert_props = status_alert_props
    };
}

export default AppRootEventHandler;