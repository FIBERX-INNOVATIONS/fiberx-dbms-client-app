import { ref, }                         from "vue";
import { Router, useRouter }            from "vue-router";
import { LOCAT_STORAGE_FIELDS }         from "@/enums/constants.enums";
import BaseListViewPropsBuilder         from "@/modules/dashboard_module/base_logic/base_list_view_props_builder";
import RegisteredAppEventHandler        from "@/modules/registered_app_module/base_logic/registered_app_event_handler";
import BaseController                   from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import BaseListViewComponents           from "@/modules/dashboard_module/base_logic/base_list_view_components";


class RegisteredAppListViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_field_key: string;
    public event_handler: RegisteredAppEventHandler;

    constructor(props: Record<string, any> = {}) {
        super("registered_app_list_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = new MemberAuthManagerUtil();
        this.event_handler              = new RegisteredAppEventHandler(this);
        this.content_field_key          = "registered_app_view_ui";
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        const base_components = BaseListViewComponents.getUIComponents();
        return  { ...base_components }; 
    }

    // Method to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        return {
            header_text: () => { return BaseListViewPropsBuilder.getHeaderText(this.content_field_key) }
        }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {        
        return {
            base_class_styles: BaseListViewPropsBuilder.getBaseClassStyle(),

            breadcrumb_props: BaseListViewPropsBuilder.getPageBreadCrumnProps(this.content_field_key),

            search_field_props: BaseListViewPropsBuilder.getPageSearchInputGroupProps(this.content_field_key, this.event_handler),

            form_action_btn_props: BaseListViewPropsBuilder.getFormActionBtnProps(this.content_field_key, this.event_handler),
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }
    }
}

export default RegisteredAppListViewController;