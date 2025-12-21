
import BaseEventHandler                     from "@ui/version_2/base_classes/base_event_handler";
import SystemInsightAPIService              from "@/api_services/system_insight_api_service";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";
import ActivityListUIPropsBuilder           from "@ui/version_2/props_builder/activity_list_props_builder";
import ClassStyles                          from "@/enums/class_styles.enums";
import { BaseControllerInterface }          from "@ui/version_2/types/component_type";
import { StatusPayloadOptionsInterface }    from "@/types/app_event_type";
import { SystemMetricObjectinterface }      from "@/types/api_service_type";

import { 
    StatRecordinterface,
    StatMetricCardDataInterface,
    ActivityListUIRenderMethodsinterface
} from "@ui/version_2/types/props_builder_type";


class MainDashboardViewEventHandler extends BaseEventHandler {
    public api_service: SystemInsightAPIService;
    public content_manager: ContentManagerUtil;
    protected status_alert_options: StatusPayloadOptionsInterface;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.api_service                = new SystemInsightAPIService();
        this.content_manager            = ContentManagerUtil.getInstance();
        this.status_alert_options       = { duration: 3000, close_modal: true };
    }

    // method to handle building stat metrics array
    private buildStatMetricsArray (metrics_obj: SystemMetricObjectinterface): StatRecordinterface[] {

        if (!metrics_obj) {  return []; }

        const metrics_content_data    = this.content_manager?.get(`content_resource.dashbaord_view_ui.stat_metric_card_ui`);

        if(!metrics_content_data || !metrics_content_data?.card_metrics_list) { return []; }

        const { card_metrics_list }         = metrics_content_data;
        
        const stat_record = card_metrics_list.map(
            (card: StatMetricCardDataInterface) => {
                const { 
                    id = "", 
                    label_text = "", 
                    metric_suffix = "",
                    metric_suffix_2 = "",
                    link_text = "",
                    link = ""

                } = card
                const base_id           = id;
                const active_key        = `${base_id}s_active`;
                const inactive_key      = `${base_id}s_in_active`;

                const has_dual_metrics          = active_key in metrics_obj || inactive_key in metrics_obj;
                const metric_active_value       = has_dual_metrics ? metrics_obj[active_key] ?? 0 : metrics_obj[base_id] ?? 0;
                const metric_inactive_value     = has_dual_metrics ? metrics_obj[inactive_key] ?? 0 : undefined;
                const metric_value              = InputTransformerUtil.nFormatter(metric_active_value)
                const metric_value_2            = metric_inactive_value !== undefined ? InputTransformerUtil.nFormatter(metric_inactive_value) : undefined

            return {
                label_text,
                metric_value,
                metric_suffix,
                ...(has_dual_metrics && {
                    metric_value_2,
                    metric_suffix_2,
                }),
                link_text,
                link,
            };
        });

        return stat_record
    }

    // Method to get activity list render methods
    public getActivityListRenderMethods (): ActivityListUIRenderMethodsinterface {

        const getRecordId = (record: Record<string, any>): string | number => { return record?.id };

        const renderHeaderSection1Content   = (index: number, record: Record<string, any>): string => {
            return `${index + 1}. ${InputTransformerUtil.spaceCamelCase(record?.permission_name ?? "")}`;
        };

        const renderHeaderSection2Content   = (index: number, record: Record<string, any>): string => {
            return `${InputTransformerUtil.formatReadableDateTime(record?.created_at ?? "")}`;
        }

        const renderBodyContent = (index: number, record: Record<string, any>): string => {
            return `${record?.description ?? ""}`;
        }

        return {
            getRecordId,
            renderHeaderSection1Content,
            renderHeaderSection2Content,
            renderBodyContent
        }
    }

    // Method to handle fetching of metrics
    public async handleFetchMetrics () {
        this.controller.state_refs.is_loading_stat_data.value = true;
        try {
            const { status, msg, data }    = await this.api_service.getSystemMetrics();

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(status === "logout") { return await this.controller.router.push("/logout"); }

            else if(status != "success" || !data) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("alert_status_updated", status_alert_payload);
            }

            this.controller.state_refs.metrics_array.value = this.buildStatMetricsArray(data);
            
            
            status_alert_payload.status = "success";
            this.controller.event_bus.emit("alert_status_updated", status_alert_payload);
        }
        catch(error: unknown) {
            this.logger.error(`Failed to fetch metrics data`, { error })
        }
        finally { this.controller.state_refs.is_loading_stat_data.value = false }
    }
    
    // Method to handle fetching of recent Activities
    public async handleFetchRecentActivities () {
        this.controller.state_refs.is_loading_activities.value = true;
        try {
            const { status, msg, data = [] }    = await this.api_service.getSystemRecentActivities();

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(status === "logout") { return await this.controller.router.push("/logout"); }

            else if(status != "success" || !data) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("alert_status_updated", status_alert_payload);
            }

            const new_activity_list_props = ActivityListUIPropsBuilder.getActivityListProps(data, [], ClassStyles.activity_list_ui, this.getActivityListRenderMethods(), false);

            Object.assign(this.controller.state_refs.activity_list_props, new_activity_list_props);
        }
        catch(error: unknown) {
            this.logger.error(`Failed to fetch recent activities`, { error })
        }
        finally { this.controller.state_refs.is_loading_activities.value = false }
    }

}

export default MainDashboardViewEventHandler;
