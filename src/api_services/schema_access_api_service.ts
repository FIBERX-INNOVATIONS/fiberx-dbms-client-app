
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";


import {
    RequestQueryInputInterface,
    SchemaAccessFormDataInputInterface,
    SchemaAccessUpdateFormDataInputInterface
} from "@/types/validation_type"

import { 
    PaginationResponseInterface,
    SchemaAccessRecordInterface
} from "@/types/api_service_type";


class SchemaAccessAPIService extends BaseAPIService {
    constructor() { super("schema_access_api_service"); }

    // Service method to query Fetch all schema access records (paginated) endpoint
    public async getAllSchemaAccessRecords (
        params: RequestQueryInputInterface
    ): Promise<APIResponseInterface<PaginationResponseInterface<SchemaAccessRecordInterface[]>>> {
        const url       = `/schema-access/all`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Create a new schema-access record endpoint
    public async createSchemaAccessRecord (
        form_data: SchemaAccessFormDataInputInterface
    ) : Promise<APIResponseInterface<SchemaAccessRecordInterface>> {
        const url       = `/schema-access/create`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

    // Service method to query update  schema-access record endpoint
    public async updateSchemaAccessRecord (
        schema_access_id: string, 
        form_data: SchemaAccessUpdateFormDataInputInterface
    ) : Promise<APIResponseInterface<SchemaAccessRecordInterface>> {
        const url           = `/schema-access/${schema_access_id}/update`;
        const config        = { url, method: "PATCH", data: form_data };

        return await this.queryAPI(config);
    } 

    // Service method to query update is_granted state of schema-access record endpoint
    public async changeSchemaAccessIsGrantedState (
        schema_access_id: string
    ) : Promise<APIResponseInterface<SchemaAccessRecordInterface>> {
        const url           = `/schema-access/${schema_access_id}/change-state`;
        const config        = { url, method: "PATCH" };

        return await this.queryAPI(config);
    } 

    // Service method to query delete schema-access record endpoint
    public async deleteSchemaAccessRecord (
        schema_access_id: string
    ) : Promise<APIResponseInterface<SchemaAccessRecordInterface>> {
        const url           = `/schema-access/${schema_access_id}/delete`;
        const config        = { url, method: "DELETE" };

        return await this.queryAPI(config);
    }
}

export default SchemaAccessAPIService;