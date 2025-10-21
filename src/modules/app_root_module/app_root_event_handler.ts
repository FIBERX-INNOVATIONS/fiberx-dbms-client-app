

import AppRootPropsBuilder          from "./app_root_props_builder";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

import { 
    OpenNewModalPayloadInterface,
    StatusChangedPayloadInterface ,
    CloseModalPayloadInterface
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
        if (close_modal) { this.handleCloseModal({}); }

        // Wait for the alert to be displayed
        if (duration > 0) { await new Promise((resolve) => setTimeout(resolve, duration)); }

        // Hide alert after duration
        this.controller.state_refs.status_alert_props.visible = false;

        // Handle post-alert actions
        if(!this.controller.router) { return }

        if (should_reload) { this.controller.router.go(0); } 

        else if (redirect_url && redirect_url.length > 0) { await this.controller.router.push(redirect_url); }
    };

    // Method to handle open new modal
    public handleOpenNewModal (payload: OpenNewModalPayloadInterface) {
        const { 
            position = "center", width_class = "w-md",
            title_content = "", close_btn_content = null,
            component, component_props
        } = payload;

        const on_modal_close = (event: MouseEvent, layer: number) => { return this.handleCloseModal({ modal_index: layer}); }
        const modal_props = AppRootPropsBuilder.getModalProps(title_content, close_btn_content, component, component_props, position, width_class, on_modal_close);

        this.controller.state_refs.modals.value.push(modal_props);
        return;
        
    }

    // Method to close an open modal
    public handleCloseModal (payload: CloseModalPayloadInterface): boolean {
        const { modal_index = 0 } = payload;
        const { modals } = this.controller.state_refs;
        let valid_modal_index: number = (modals.value.length - 1);

        if(modal_index && modal_index > 0 && modal_index < modals.value.length) {
            valid_modal_index = modal_index
        }

        this.controller.state_refs.modals?.value.splice(valid_modal_index, 1)[0];
        return true;
    }
}

export default AppRootEventHandler;