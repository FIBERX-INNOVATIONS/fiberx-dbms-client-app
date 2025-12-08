
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import {
    RolePermissionsFormDataInputData
} from "@/types/validation_type";

import { 
    RequestQueryInputInterface,
    PaginationResponseInterface,
    RoleRecordInterface,
    RoleAssignedPermissionInterface,
    PermissionRecordInterface,
    UpdatedRolePermissionsInterface
} from "@/types/api_service_type";


class AccessControlAPIService extends BaseAPIService {
    constructor() { super("access_control_api_service"); }

    // Service method to query Fetch all roles endpoint
    public async getRoles (
        params: RequestQueryInputInterface
    ): Promise<APIResponseInterface<PaginationResponseInterface<RoleRecordInterface[]>>> {
        const url       = `/access-control/roles`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query fetch role assigned permissions endpoint
    public async getRoleAssignedPermissions (
        role_id: number | string,
        params: RequestQueryInputInterface
    ) : Promise<APIResponseInterface<PaginationResponseInterface<RoleAssignedPermissionInterface[]>>> {
        const url       = `/access-control/role/${role_id.toString()}/permissions`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query fetch role un-assigned permissions endpoint
    public async getRoleUnAssignedPermissions (
        role_id: number | string,
        params: RequestQueryInputInterface
    ) : Promise<APIResponseInterface<PaginationResponseInterface<PermissionRecordInterface[]>>> {
        const url       = `/access-control/role/${role_id.toString()}/unassigned-permissions`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query assign permission to role endpoint
    public async assignPermissionsToRole (
        form_data: RolePermissionsFormDataInputData
    ) : Promise<APIResponseInterface<PaginationResponseInterface<UpdatedRolePermissionsInterface>>> {
        const url       = `/access-control/assign`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

    // Service method to query un-assign permission to role endpoint
    public async unAssignPermissionsToRole (
        form_data: RolePermissionsFormDataInputData
    ) : Promise<APIResponseInterface<PaginationResponseInterface<UpdatedRolePermissionsInterface>>> {
        const url       = `/access-control/un-assign`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

}

export default AccessControlAPIService;