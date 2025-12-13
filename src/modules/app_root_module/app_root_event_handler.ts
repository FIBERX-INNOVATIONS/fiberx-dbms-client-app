

import AppRootPropsBuilder          from "./app_root_props_builder";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

import { 
    OpenNewModalPayloadInterface,
    StatusChangedPayloadInterface ,
    CloseModalPayloadInterface
} from "@/types/app_event_type";


class AppRootEventHandler extends BaseEventHandler {
    private inactivity_warning_timeout?: number;
    private inactivity_logout_timeout?: number;
    private inactivity_countdown_interval?: number;
    private is_inactivity_warning_visible: boolean = false;

    private readonly WARNING_TIME_MS = 4 * 60 * 1000; // 4 mins
    private readonly LOGOUT_TIME_MS  = 5 * 60 * 1000; // 5 mins

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);
    }

    // Method to show in-activtiy warning
    private showInactivityWarning () {
        this.is_inactivity_warning_visible = true;
        let remaining_seconds = 60; // 1 min countdown

        const emitWarning = () => {
            const payload = {
                status: "error",
                message: `You have been inactive. Logging out in ${remaining_seconds}s`,
                options: { duration: 0 }
            };

            this.controller.event_bus.emit("alert_status_updated", payload);
        };

        emitWarning();

        this.inactivity_countdown_interval = window.setInterval(() => {
            remaining_seconds--;

            if (remaining_seconds <= 0) {
                clearInterval(this.inactivity_countdown_interval);
                return;
            }

            emitWarning();
        }, 1000);
    }

    // Method to clear in-activty timers
    private clearInactivityTimers () {
        if (this.inactivity_warning_timeout) {
            clearTimeout(this.inactivity_warning_timeout);
            this.inactivity_warning_timeout = undefined;
        }

        if (this.inactivity_logout_timeout) {
            clearTimeout(this.inactivity_logout_timeout);
            this.inactivity_logout_timeout = undefined;
        }

        if (this.inactivity_countdown_interval) {
            clearInterval(this.inactivity_countdown_interval);
            this.inactivity_countdown_interval = undefined;
        }

        if (this.is_inactivity_warning_visible) {
            const new_status_alert_props    = AppRootPropsBuilder.getStatusAlertProps(this, false);

            Object.assign(this.controller.state_refs.status_alert_props, new_status_alert_props);
        }
    }

    // Method to trigger logout
    private async triggerLogout () {
        this.clearInactivityTimers();

        this.controller.event_bus.emit("alert_status_updated", {
            status: "error",
            message: "Session expired due to inactivity",
            options: {
                duration: 1500,
                redirect_url: "/logout"
            }
        });
    }

    // Method to schedule in activity timers
    private scheduleInactivityTimers () {
        // ⚠️ Warning timer
        this.inactivity_warning_timeout = window.setTimeout(() => {
            this.showInactivityWarning();
        }, this.WARNING_TIME_MS);

        // 🚪 Logout timer
        this.inactivity_logout_timeout = window.setTimeout(() => {
            this.triggerLogout();
        }, this.LOGOUT_TIME_MS);
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
        if (duration > 0) { 
            await new Promise((resolve) => setTimeout(resolve, duration)); 
            // Hide alert after duration
            this.controller.state_refs.status_alert_props.visible = false;
        }

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

    // Method to start inactivity tracking
    public startInactivityTracking () {
        const resetTimers = () => {
            this.clearInactivityTimers();
            this.scheduleInactivityTimers();
        };

        // Track common user activity
        ["mousemove", "mousedown", "keydown", "scroll", "touchstart"].forEach(evt =>
            window.addEventListener(evt, resetTimers)
        );

        this.scheduleInactivityTimers();
    }

}

export default AppRootEventHandler;