
import LoginViewPropsBuilder        from "./login_view_props_builder";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

class LoginViewEventHandler extends BaseEventHandler {
    public form_data: Record<string, any>;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.form_data  = {};
    }

    // Method to handle on input changed
    public handleOnInputchanged (event: Event | InputEvent) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!target) { return; }

        const new_value             = target.value;
        const input_id              = target.id;
        this.form_data[input_id]    = new_value;
    }

    // Method to handle on toast alert close button
    public handleOnCloseToastAlertClick (event: MouseEvent) {
        this.controller.state_refs.toast_alert_props.status = "";
        this.controller.state_refs.toast_alert_props.message = "";
    }

}

export default LoginViewEventHandler;