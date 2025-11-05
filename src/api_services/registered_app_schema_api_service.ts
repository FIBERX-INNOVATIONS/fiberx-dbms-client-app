
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import { 
    RequestQueryInputInterface,
    RegisteredAppSchemaFormDataInterface
} from "@/types/api_service_type";


class RegisteredAppSchemaAPIService extends BaseAPIService {
    constructor() { super("registered_app_schema_api_service"); }

    // Service method to query Fetch all app-schemas (paginated) endpoint
    public async getAllRegisteredAppSchemas (params: RequestQueryInputInterface ): Promise<APIResponseInterface<any>> {
        const url       = `/app-schema/all`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Create a new app-schema record endpoint
    public async createNewRegisteredAppSchema (form_data: RegisteredAppSchemaFormDataInterface) : Promise<APIResponseInterface<any>> {
        const url       = `/app-schema/create`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

    // Service method to query update  app-schema record endpoint
    public async updateRegisteredAppSchema (schema_id: number, form_data: RegisteredAppSchemaFormDataInterface) : Promise<APIResponseInterface<any>> {
        const url           = `/app-schema/${schema_id}/update`;
        const config        = { url, method: "PATCH", data: form_data };

        return await this.queryAPI(config);
    } 

    // Service method to query delete app-schema record endpoint
    public async deleteRegisteredAppSchema (schema_id: number) : Promise<APIResponseInterface<any>> {
        const url           = `/app-schema/${schema_id}/delete`;
        const config        = { url, method: "DELETE" };

        return await this.queryAPI(config);
    }
}

export default RegisteredAppSchemaAPIService;