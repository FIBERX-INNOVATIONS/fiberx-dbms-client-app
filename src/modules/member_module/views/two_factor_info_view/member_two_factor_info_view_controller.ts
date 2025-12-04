import { ref, }                             from "vue";
import BaseProfileViewController            from "@/base_classes/profile_view/base_profile_view_controller";
import MemberTwoFactorInfoViewEventHandler      from "./member_two_factor_info_view_event_handler";
import MemberUIService                      from "@/modules/member_module/base_logic/member_ui_service";
import QRCodeUtil                           from "@ui/version_2/utils/qr_code_util";
import ListLoaderUI                         from "@ui/version_2/components/LoaderUI/ListLoaderUI/list_loader_ui.vue";
import MaskedRevealUI                       from "@ui/version_2/components/MaskedRevealUI/masked_reveal_ui.vue";


class MemberTwoFactorInfoViewController extends BaseProfileViewController {
    public service: MemberUIService;
    public event_handler: MemberTwoFactorInfoViewEventHandler;

    constructor(props: Record<string, any> = {}) {
        super("two_factor_info_view", props);

        this.content_field_key              = "member_view_ui";
        this.content_component_field_key    = "two_factor_info_view";
        this.service                        = new MemberUIService(this);
        this.event_handler                  = new MemberTwoFactorInfoViewEventHandler(this);
    }

    // Method to get custom child compnents
    protected getCustomChildComponents(): Record<string, any> { 
        return { ListLoaderUI, MaskedRevealUI } 
    }

    // Method to get custom child compnents
    protected getCustomChildComputedData(): Record<string, any> { 
        return {
            qr_code_data_url: async () => { return await QRCodeUtil.generateDataUrl(this.state_refs.qr_code_data.value) }
        } 
    }

    // Method to get custom child compnents
    protected getCustomChildUIStateData(): Record<string, any> { 
        return {
            is_loading: ref(true),

            secret_data: ref(""),

            qr_code_data: ref(""),

        } 
    }

    // Method to handle child mounted logic
    protected async getHandleChildMountedLogic (): Promise<void>  {
        await this.event_handler.handleFetchMmeber2FAInfo();
    }

}

export default MemberTwoFactorInfoViewController;
