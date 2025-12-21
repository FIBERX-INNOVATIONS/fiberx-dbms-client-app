
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import { 
    SystemMetricObjectinterface,
    MemberActiviityRecordInterface
} from "@/types/api_service_type";


class SystemInsightAPIService extends BaseAPIService {
    constructor() { super("system_insight_api_service"); }

    // Service method to query Fetch system metrics endpoint
    public async getSystemMetrics (): Promise<APIResponseInterface<SystemMetricObjectinterface>> {
        const url       = `/system-insight/metrics`;
        const config    = { url, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Fetch system recent activities endpoint
    public async getSystemRecentActivities (): Promise<APIResponseInterface<MemberActiviityRecordInterface[]>> {
        const url       = `/system-insight/recent-activity`;
        const config    = { url, method: "GET" };

        return await this.queryAPI(config);
    }

}

export default SystemInsightAPIService;