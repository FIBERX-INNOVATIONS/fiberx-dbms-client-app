
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import { 
    RequestQueryInputInterface,
    MemberFormInputInterface
} from "@/types/api_service_type";


class MemberAPIService extends BaseAPIService {
    constructor() { super("member_api_service"); }

    // Service method to query Fetch all member profile records (paginated) endpoint
    public async getAllMemberProfileRecords (params: RequestQueryInputInterface ): Promise<APIResponseInterface<any>> {
        const url       = `/member/all`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Fetch a member profile record endpoint
    public async getMemberProfileRecord (member_public_id: string ): Promise<APIResponseInterface<any>> {
        const url       = `/member/${member_public_id}`;
        const config    = { url, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Fetch member 2FA info endpoint
    public async getMember2FAInfo (member_public_id: string, hard_reset: boolean = false ): Promise<APIResponseInterface<any>> {
        const url       = `/member/${member_public_id}/two-factor-info?hard_reset=${hard_reset}`;
        const config    = { url, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Fetch member Activities endpoint
    public async getMemberProfileActivities (member_public_id: string, params: RequestQueryInputInterface): Promise<APIResponseInterface<any>> {
        const url       = `/member/${member_public_id}/activities`;
        const config    = { url, params, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query Create a new member record endpoint
    public async createNewMemberProfileRecord (form_data: MemberFormInputInterface) : Promise<APIResponseInterface<any>> {
        const url       = `/member/create`;
        const config    = { url, method: "POST", data: form_data };

        return await this.queryAPI(config);
    }

    // Service method to query update  member record endpoint
    public async updateMemberProfileRecord (member_public_id: string, form_data: MemberFormInputInterface) : Promise<APIResponseInterface<any>> {
        const url           = `/member/${member_public_id}/update`;
        const config        = { url, method: "PATCH", data: form_data };

        return await this.queryAPI(config);
    } 

    // Service method to query update member auth record state endpoint
    public async updateMemberAuthRecordState (member_public_id: string) : Promise<APIResponseInterface<any>> {
        const url           = `/member/${member_public_id}/change-state`;
        const config        = { url, method: "PATCH" };

        return await this.queryAPI(config);
    } 

    // Service method to query delete member record endpoint
    public async deleteMemberProfile (member_public_id: string) : Promise<APIResponseInterface<any>> {
        const url           = `/member/${member_public_id}/delete`;
        const config        = { url, method: "DELETE" };

        return await this.queryAPI(config);
    } 

}

export default MemberAPIService;