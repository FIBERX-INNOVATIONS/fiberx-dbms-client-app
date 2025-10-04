
import BaseAPIService               from "@ui/version_2/base_classes/base_api_service";
import { APIResponseInterface }     from "@ui/version_2/types/util_type";
import { LOCAT_STRAGE_FIELDS }      from "@/enums/constants.enums";

import { 
    LoginFormDataInterface,
    TwoFactorFormDataInterface,
} from "@/types/api_service_type";


class AuthAPIService extends BaseAPIService {
    constructor() { super("auth_api_service"); }

    // Method 🔑 Override storage keys
    protected getStorageKeys() {
        return {
            ACCESS_TOKEN_KEY: LOCAT_STRAGE_FIELDS.ACCESS_TOKEN_KEY,
            DEVICE_ID_KEY: LOCAT_STRAGE_FIELDS.DEVICE_ID_KEY,
            DEVICE_NAME_KEY: LOCAT_STRAGE_FIELDS.DEVICE_NAME_KEY
        };
    }

    // Service method to query get csrf token endpoint
    public async getFormCSRFToken(token_for: string): Promise<APIResponseInterface<any>> {
        const url           = `/auth/get-csrf-token`;
        const config        = { url, params: { token_for }, method: "GET" };

        return await this.queryAPI(config);
    }

    // Service method to query log in endpoint
    public async logIn (data: LoginFormDataInterface ): Promise<APIResponseInterface<any>> {
        const url       = `/auth/login`;
        const config    = { url, data, method: "POST" };

        return await this.queryAPI(config);
    }

    // Service method to query two factor endpoint
    public async twoFactorLogin (data: TwoFactorFormDataInterface) : Promise<APIResponseInterface<any>> {
        const url       = `/auth/two-factor-login`;
        const config    = { url, data, method: "POST" };

        return await this.queryAPI(config);
    }

    // Service method to query logout endpoint
    public async logOut () : Promise<APIResponseInterface<any>> {
        const url           = `/auth/logout`;
        const config        = { url, method: "POST" };

        return await this.queryAPI(config);
    } 

}

export default AuthAPIService;