import { ref, }                         from "vue";
import { Router, useRouter }            from "vue-router";
import { LOCAT_STORAGE_FIELDS }          from "@/enums/constants.enums";
import BaseListViewPropsBuilder         from "@/modules/dashboard_module/base_logic/base_list_view_props_builder";
import BaseController                   from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import BreadCrumbUI                     from "@ui/version_2/components/NavigationUI/BreadCrumbUI/bread_crumb_ui.vue";


class MainDashboardViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_field_key: string;

    constructor(props: Record<string, any> = {}) {
        super("main_dashboard_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_field_key          = "dashbaord_view_ui"
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { BreadCrumbUI }; 
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

export default MainDashboardViewController;