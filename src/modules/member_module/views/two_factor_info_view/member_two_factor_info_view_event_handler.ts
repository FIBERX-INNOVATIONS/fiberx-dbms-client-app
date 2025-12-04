

import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";
import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";
import { StatusPayloadOptionsInterface } from "@/types/app_event_type";


class MemberTwoFactorInfoViewEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    protected status_alert_options: StatusPayloadOptionsInterface;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager                = ContentManagerUtil.getInstance();
        this.status_alert_options           = { duration: 3000, close_modal: true };
    }

    // Method to handle fetchinf 2fa data into
    public async handleFetchMmeber2FAInfo () {
        this.controller.state_refs.is_loading.value = true;
        try {
            if(!this.controller?.service) { return }

            const { record, hard_reset = false } = this.controller.props;

            console.log({ props: this.controller.props})

            const { s_state, s_msg, s_data, logout }    = await this.controller.service?.executeFetchMember2FAInfo?.(record?.public_id, hard_reset);

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(s_msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(logout) { return await this.controller.router.push("/logout"); }

            else if(!s_state) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            const { secret_key, otpauth_url } = s_data;

            this.controller.state_refs.secret_data.value   = secret_key;
            this.controller.state_refs.qr_code_data.value  = otpauth_url;

            return;
            
        }
        catch(error: unknown) {
            this.logger.error(`Failed to fetch record`, { error })
        }
        finally { this.controller.state_refs.is_loading.value = false }
    }

}

export default MemberTwoFactorInfoViewEventHandler;