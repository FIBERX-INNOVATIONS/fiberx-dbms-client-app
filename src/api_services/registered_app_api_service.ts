
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import { 
    RequestQueryInputInterface,
    RegisterAppFormDataInterface
} from "@/types/api_service_type";


class RegisteredAppAPIService extends BaseAPIService {
    constructor() { super("registered_app_api_service"); }

    // Service method to query get all apps endpoint
    public async getAllRegisteredApps (params: RequestQueryInputInterface ): Promise<APIResponseInterface<any>> {
        const url       = `/registered-app/all`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query create new app endpoint
    public async createNewApp (form_data: RegisterAppFormDataInterface) : Promise<APIResponseInterface<any>> {
        const url       = `/registered-app/create`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

    // Service method to query update app endpoint
    public async updateApp (app_public_id: string, form_data: RegisterAppFormDataInterface) : Promise<APIResponseInterface<any>> {
        const url           = `/registered-app/${app_public_id}/update`;
        const config        = { url, method: "PATCH", data: form_data };

        return await this.queryAPI(config);
    } 

    // Service method to query update app state endpoint
    public async updateAppState (app_public_id: string) : Promise<APIResponseInterface<any>> {
        const url           = `/registered-app/${app_public_id}/change-state`;
        const config        = { url, method: "PATCH" };

        return await this.queryAPI(config);
    } 

    // Service method to query delete app endpoint
    public async deleteApp (app_public_id: string) : Promise<APIResponseInterface<any>> {
        const url           = `/registered-app/${app_public_id}/delete`;
        const config        = { url, method: "DELETE" };

        return await this.queryAPI(config);
    } 

}

export default RegisteredAppAPIService;