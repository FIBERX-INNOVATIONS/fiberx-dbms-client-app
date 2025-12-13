
import AuthPropsBuilder             from "@/modules/auth_module/base_logic/auth_props_builder";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import AuthValidator                from "@/validators/auth_validator";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";

import { BaseControllerInterface }  from "@ui/version_2/types/component_type";
import { 
    LoginFormDataInputInterface, 
    TwoFactorFormDataInputInterface 
}  from "@/types/validation_type";

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AuthEventhandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;


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

    // Method to reirect to login after some time
    public redirectToLoginAfterDelay(delay_in_mins: number = 5) {
        const mins_value    = delay_in_mins && Number.isInteger(delay_in_mins) ? delay_in_mins : 5;
        const delay_in_ms   = (mins_value * 60 * 1000);

        // Clear any existing timer before scheduling a new one
        if (this.redirect_timer) {
            clearTimeout(this.redirect_timer);
        }

        this.redirect_timer = setTimeout(async () => {
            try {
                this.logger.error(`Redirecting user to login after ${delay_in_ms / 1000 / 60} minutes`);
                if (this.controller?.router) {
                    await this.controller.router.push("/login");
                }
            } catch (error) {
                this.logger.error("Failed to redirect to login after delay", { error });
            }
        }, delay_in_ms);
    }

    // 🔹 Add method to clear timer
    public clearRedirectTimer() {
        if (this.redirect_timer) {
            clearTimeout(this.redirect_timer);
            this.redirect_timer = null;
            this.logger.log("Redirect timer cleared");
        }
    }

    // Method to handle on input changed
    public handleOnInputchanged (event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;

        if (!target) { return; }

        const new_value                 = input_model_value ?? target?.value;
        const input_id                  = target.id;
        const formatted_key             = input_id.replace(/_\d+$/, '');
        this.form_data[formatted_key]   = new_value;
    }

    // Method to handle on toast alert close button
    public handleOnCloseToastAlertClick (event: MouseEvent) {
        this.controller.state_refs.toast_alert_props.status = "";
        this.controller.state_refs.toast_alert_props.message = "";
    }

    // Method to handle login submit btn click
    public async handleLoginSubmitBtnClick (event: MouseEvent) {
        this.hideErrorAlert()
        try {

            const form_data = this.form_data as LoginFormDataInputInterface;
            const { v_state, v_msg } = AuthValidator.validateLoginInput(form_data);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }

            if(!this.controller?.service) { return }

            const { s_state, s_msg }    = await this.controller.service?.executeLogIn?.(form_data);
            const formmated_status_msg  = this.content_manager?.getAPIResponseValue(s_msg);

            if(!s_state) {
                const error_msg = formmated_status_msg
                return this.showErrorAlert("error", error_msg)
            }

            this.logger.log("Login successful, triggering alert_status_updated event", { s_msg });
            const status_alert_options  = { duration: 3000, redirect_url: "/two-factor-login"}
            const status_alert_payload  = { status: "success", message: formmated_status_msg, options: status_alert_options };

            return this.controller.event_bus.emit("alert_status_updated", status_alert_payload);
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error })
        }
    }

    // Method to handle two factor submit btn click
    public async handleTwoFactorLoginSubmitBtnClick (event: MouseEvent) {
        this.hideErrorAlert()
        try {

            const form_data = this.form_data as TwoFactorFormDataInputInterface;
            const { v_state, v_msg } = AuthValidator.validateTwoFactorLoginInput(form_data);

            if(!v_state) {
                const error_msg = this.content_manager?.getAPIResponseValue(v_msg);
                return this.showErrorAlert("error", error_msg)
            }

            if(!this.controller?.service) { return }

            const { s_state, s_msg, logout }    = await this.controller.service?.executeTwoFactorLogIn?.(form_data);
            const formmated_status_msg          = this.content_manager?.getAPIResponseValue(s_msg);


            if(logout) {
                this.controller.service?.deleteMemberdata()
                return await this.controller.router.push("/logout");
            }

            else if(!s_state) {
                const error_msg = formmated_status_msg;
                return this.showErrorAlert("error", error_msg)
            }

            this.logger.log("Two factor Login successful, triggering alert_status_updated event", { s_msg });
            const status_alert_options  = { duration: 3000, redirect_url: "/dashboard"}
            const status_alert_payload  = { status: "success", message: formmated_status_msg, options: status_alert_options };

            return this.controller.event_bus.emit("alert_status_updated", status_alert_payload);
        }
        catch(error: unknown) {
            this.logger.error(`Failed to submit form`, { error })
        }
    }


}

export default AuthEventhandler;