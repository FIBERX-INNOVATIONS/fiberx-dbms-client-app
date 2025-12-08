
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import {
    RequestQueryInputInterface,
    DatasourceFormDataInputInterface,
} from "@/types/validation_type"

import { 
    PaginationResponseInterface,
    DatasourceRecordInterface
} from "@/types/api_service_type";


class DatasourceAPIService extends BaseAPIService {
    constructor() { super("datasource_api_service"); }

    // Service method to query Fetch all datasources (paginated) endpoint
    public async getAllDatasources (
        params: RequestQueryInputInterface 
    ): Promise<APIResponseInterface<PaginationResponseInterface<DatasourceRecordInterface[]>>> {
        const url       = `/datasource/all`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Create a new datasource record endpoint
    public async createNewDatasource (form_data: DatasourceFormDataInputInterface) : Promise<APIResponseInterface<DatasourceRecordInterface>> {
        const url       = `/datasource/create`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

    // Service method to query update  datasource record endpoint
    public async updateDatasource (datasource_id: number, form_data: DatasourceFormDataInputInterface) : Promise<APIResponseInterface<DatasourceRecordInterface>> {
        const url           = `/datasource/${datasource_id}/update`;
        const config        = { url, method: "PATCH", data: form_data };

        return await this.queryAPI(config);
    } 

    // Service method to query update datasource record state endpoint
    public async updateDatasourceState (datasource_id: number) : Promise<APIResponseInterface<DatasourceRecordInterface>> {
        const url           = `/datasource/${datasource_id}/change-state`;
        const config        = { url, method: "PATCH" };

        return await this.queryAPI(config);
    } 

    // Service method to query delete datasource record endpoint
    public async deleteDatasource (datasource_id: number) : Promise<APIResponseInterface<DatasourceRecordInterface>> {
        const url           = `/datasource/${datasource_id}/delete`;
        const config        = { url, method: "DELETE" };

        return await this.queryAPI(config);
    } 

    // Service method to query update datasource record created endpoint
    public async changeDatasourceCreateState (datasource_id: number) : Promise<APIResponseInterface<DatasourceRecordInterface>> {
        const url           = `/datasource/${datasource_id}/change-created-state`;
        const config        = { url, method: "PATCH" };

        return await this.queryAPI(config);
    } 

}

export default DatasourceAPIService;