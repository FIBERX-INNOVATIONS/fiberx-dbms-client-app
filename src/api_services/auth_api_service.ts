
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";

import {
    LoginFormDataInputInterface,
    TwoFactorFormDataInputInterface,
} from "@/types/validation_type";


import { 
    CSRFTokenRecordInterface,
    AuthenticatedMemberRecordInterface
} from "@/types/api_service_type";


class AuthAPIService extends BaseAPIService {
    constructor() { super("auth_api_service"); }

    // Service method to query get csrf token endpoint
    public async getFormCSRFToken(token_for: string): Promise<APIResponseInterface<CSRFTokenRecordInterface>> {
        const url           = `/auth/get-csrf-token`;
        const config        = { url, params: { token_for }, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query log in endpoint
    public async logIn (data: LoginFormDataInputInterface ): Promise<APIResponseInterface<AuthenticatedMemberRecordInterface>> {
        const url       = `/auth/login`;
        const config    = { url, data, method: "POST" };

        return await this.queryAPI(config);
    }

    // Service method to query two factor endpoint
    public async twoFactorLogin (data: TwoFactorFormDataInputInterface) : Promise<APIResponseInterface<AuthenticatedMemberRecordInterface>> {
        const url       = `/auth/two-factor-login`;
        const config    = { url, data, method: "POST" };

        return await this.queryAPI(config);
    }

    // Service method to query logout endpoint
    public async logOut () : Promise<APIResponseInterface<string[]>> {
        const url           = `/auth/logout`;
        const config        = { url, method: "POST" };

        return await this.queryAPI(config);
    } 

}

export default AuthAPIService;