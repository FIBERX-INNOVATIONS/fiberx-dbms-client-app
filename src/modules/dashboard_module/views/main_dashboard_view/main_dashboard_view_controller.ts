import { ref, }                         from "vue";
import { Router, useRouter }            from "vue-router";
import { LOCAL_STORAGE_FIELDS }         from "@/enums/constants.enums";
import { EventBus }                     from "@/utils/gloabal_event_bus";
import BaseListViewPropsBuilder         from "@/base_classes/list_view/base_list_view_props_builder";
import MainDashboardViewEventHandler    from "@/modules/dashboard_module/views/main_dashboard_view/main_dashboard_event_handler";
import ClassStyles                      from "@/enums/class_styles.enums";
import BaseController                   from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import BreadCrumbUI                     from "@ui/version_2/components/NavigationUI/BreadCrumbUI/bread_crumb_ui.vue";
import CardLoaderUI                     from "@ui/version_2/components/LoaderUI/CardLoaderUI/card_loader_ui.vue";
import ListLoaderUI                     from "@ui/version_2/components/LoaderUI/ListLoaderUI/list_loader_ui.vue";
import StatMetricCardUI                 from "@ui/version_2/components/StatMetricCardUI/stat_metric_card_ui.vue";
import ActivityListUI                   from "@ui/version_2/components/ActivityListUI/activity_list_ui.vue";
import StatMetricCardUIPropsBuilder     from "@ui/version_2/props_builder/state_metric_card_ui_props_builder";
import ActivityListUIPropsBuilder       from "@ui/version_2/props_builder/activity_list_props_builder";


class MainDashboardViewController extends BaseController {
    public router: Router;
    public event_bus = EventBus;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_field_key: string;
    public event_handler: MainDashboardViewEventHandler;

    constructor(props: Record<string, any> = {}) {
        super("main_dashboard_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_field_key          = "dashbaord_view_ui";
        this.event_handler              = new MainDashboardViewEventHandler(this);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { BreadCrumbUI, CardLoaderUI, ListLoaderUI, StatMetricCardUI, ActivityListUI }; 
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

            is_loading_stat_data: ref(true),

            is_loading_activities: ref(true),

            metrics_array: ref([]),

            activities: ref([]),

            state_props_builder: StatMetricCardUIPropsBuilder.getCardMetricPropsFromStatRecord,

            activity_list_props: ActivityListUIPropsBuilder.getActivityListProps([], [], ClassStyles.activity_list_ui, this.event_handler.getActivityListRenderMethods(), false),
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAL_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAL_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }

        await Promise.all([
            await this.event_handler.handleFetchMetrics(),

            await this.event_handler.handleFetchRecentActivities()
        ]);

        

        
    }
}

export default MainDashboardViewController;