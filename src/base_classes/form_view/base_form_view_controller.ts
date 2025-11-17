import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { CSRF_TOKEN_FOR, LOCAT_STORAGE_FIELDS } from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import BaseFormViewPropsBuilder                 from "@/base_classes/form_view/base_form_view_props_builder";
import AuthService                              from "@/modules/auth_module/base_logic/auth_service";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import AuthPropsBuilder                         from "@/modules/auth_module/base_logic/auth_props_builder";
import InputGroupUI                             from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ToastAlertUI                             from "@ui/version_2/components/AlertUI/ToastAlertUI/toast_alert_ui.vue";
import ButtonUI                                 from "@ui/version_2/components/ButtonUI/button_ui.vue";
import SchemaDesignerUI                         from "@/ui_components/schema_designer_ui/schema_designer_ui.vue";

import { 
    ButtonUIPropsInterface, 
    InputGroupPropsInterface,
} from "@ui/version_2/types/props_builder_type";

class BaseFormViewController extends BaseController {
    public router: Router;
    public member_auth_manager: MemberAuthManagerUtil;
    public auth_service: AuthService;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;
    public event_handler: any;
    public service: any;
    public csrf_token_for: string = "";
    public form_content_data: Record<string, any> = {};
    public form_data: Record<string, any> = {};
    public props_builder: typeof BaseFormViewPropsBuilder;

    constructor(component_name: string, props: Record<string, any> = {}) {
        super(component_name, props);
        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_manager            = ContentManagerUtil.getInstance();
        this.auth_service               = new AuthService(this);
        this.props_builder              = BaseFormViewPropsBuilder;
    }

    protected initializeDependencies(): void { return };

    protected getFormUIStateData(): Record<string, any> { return {} };

    protected getUIComponents(): Record<string, any> {
        return { InputGroupUI, ToastAlertUI, ButtonUI, SchemaDesignerUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {  
        const form_ui_state_data = this.getFormUIStateData();

        return {
            ...form_ui_state_data,

            csrf_token: ref(null), 

            toast_alert_props: AuthPropsBuilder.getToastAlertProps(this.event_handler),

            btn_props: BaseFormViewPropsBuilder.getBtnProps(this.event_handler, true, true, this.form_content_data["btn_text"])
        } 
    }

    // Method to handle on mount logic
    protected async formMountedLogic (): Promise<void> { }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }

        // get csrf token
        await this.auth_service.getFormCsrfToken(this.csrf_token_for);

        await this?.formMountedLogic?.()
    }

    // Method to handle before unmounted logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        this.auth_service.cancelCsrfRefresh();
    }

    // Method to get input group props for social links
    public getObjectInputGroupProps (
        field_key: string, 
        existing_value: string | number | boolean = "",
        input_type: string = "text",
        input_configs: Record<string, any> = {}
    ): InputGroupPropsInterface {
        const { min, options_key } = input_configs;

        const on_change                 = this.event_handler.handleOnInputchanged.bind(this.event_handler);
        const event_methods             = { on_change };
        const options                   = this.event_handler.getSelectOptions(options_key);

        

        return BaseFormViewPropsBuilder.getInputGroupProps(
            this.form_content_data, 
            field_key, 
            existing_value, 
            input_type, 
            false, 
            this.props?.record || {}, 
            event_methods,
            { min, options }

        )
    }

    // Method to get input group props for social links
    public getObjectDeleteBtnProps (id: string | number, key_input_id: string): ButtonUIPropsInterface {
        return BaseFormViewPropsBuilder.getObjectRemoveFieldBtnProps(this.event_handler, id.toString(), key_input_id)
    }

}

export default BaseFormViewController;
