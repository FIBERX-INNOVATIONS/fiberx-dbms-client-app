
import AuthPropsBuilder             from "@/modules/auth_module/base_logic/auth_props_builder";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import AuthValidator                from "@/validators/auth_validator";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";
import { LoginFormDataInterface }   from "@/types/api_service_type";

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthEventhandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager = ContentManagerUtil.getInstance();
    }

    // Method to hide error alert
    private hideErrorAlert() {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
    }

    // Method to show error alert
    private showErrorAlert(status: string, message: string) {
        const new_toast_alert_props = AuthPropsBuilder.getToastAlertProps(this, status, message);
        Object.assign(this.controller.state_refs.toast_alert_props, new_toast_alert_props)
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

    // Method tp handle submit btn click
    public async handleLoginSubmitBtnClick (event: MouseEvent) {
        this.hideErrorAlert()
        try {

            const form_data = this.form_data as LoginFormDataInterface;
            const { v_state, v_msg } = AuthValidator.validateLoginInput(form_data);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }

            if(!this.controller?.service) { return }

            const { s_state, s_msg } = await this.controller.service?.executeLogIn?.(form_data);

            if(!s_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(s_msg);
                return this.showErrorAlert("error", error_msg)
            }

            return this.controller.event_bus.emit("statusChanged", { status: "success", message: s_msg });

        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error })
        }
    }

}

export default AuthEventhandler;