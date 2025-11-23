
import BaseService                  from "@ui/version_2/base_classes/base_service";
import AuthAPIService               from "@/api_services/auth_api_service";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";
import MemberAuthManagerUtil        from "@ui/version_2/utils/member_auth_manager_util";

import { 
    CSRF_TOKEN_FOR,
    LOCAT_STORAGE_FIELDS
} from "@/enums/constants.enums";
import { 
    CurrentMemberInterface 
} from "@ui/version_2/types/util_type";
import { 
    LoginFormDataInterface, 
    TwoFactorFormDataInterface 
} from "@/types/api_service_type";

class AuthUIService extends BaseService {
    public readonly api_service: AuthAPIService;
    public member_auth_manager: MemberAuthManagerUtil;
    private csrf_refresh_timer: ReturnType<typeof setTimeout> | null = null;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.api_service            = new AuthAPIService();
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
    }

    // Method to store member data
    private storeMemberData (current_member: CurrentMemberInterface, access_token?: string): boolean {
        const permissions               = current_member?.permissions || [];
        const member_key                = LOCAT_STORAGE_FIELDS.MEMBER_KEY;
        const permissions_key           = LOCAT_STORAGE_FIELDS.MEMBER_PERMISSIONS_KEY;
        const acces_token_key           = LOCAT_STORAGE_FIELDS.ACCESS_TOKEN_KEY;

        const other_member_data: Record<string, any>    = {};
        other_member_data[permissions_key]              = permissions;
        other_member_data[acces_token_key]              = access_token ?? "";

        return this.member_auth_manager.setCurrentMemberData(member_key, current_member, other_member_data);
    }

        // Method to schedule csrf refresh
    private scheduleCsrfRefresh(expires_at: string, token_for: string): void {
        if (!expires_at) { return; }

        // Clear any existing timer
        if (this.csrf_refresh_timer) {
            clearTimeout(this.csrf_refresh_timer);
            this.csrf_refresh_timer = null;
        }

        const expiration_time   = new Date(expires_at).getTime();
        const now               = Date.now()
        const delay             = expiration_time - now

        this.csrf_refresh_timer = setTimeout(async () => {
            this.logger.debug("Refreshing CSRF Token Now");
            await this.getFormCsrfToken(token_for);
        }, delay);
    }

    public deleteMemberdata(): boolean {
        return this.member_auth_manager.deleteCurrentMemberData(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
    }

    // Method to get and set form csrf token
    public async getFormCsrfToken(token_for: string = CSRF_TOKEN_FOR.LOGIN ): Promise<boolean> {
        try {
            const { data }      = await this.api_service.getFormCSRFToken(token_for);
            const csrf_token    = data?.token;
            const expires_at    = data?.expires_at;

            if(!csrf_token) { return false }

            if (this.controller.event_handler?.form_data) {
                this.controller.event_handler.form_data["csrf_token"] = csrf_token;
            }

            if (this.controller.state_refs?.csrf_token) {
                this.controller.state_refs.csrf_token.value = csrf_token;
            }

            if (this.controller.state_refs?.btn_props) {
                this.controller.state_refs.btn_props.disabled = false;
            }

            // Schedule next refresh
            this.scheduleCsrfRefresh(expires_at, token_for);

            return true;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to get form csrf token`, { error });
            return false;
        }
    }


    // Method to cancel csrf refresh token timer
    public cancelCsrfRefresh(): void {
        if (this.csrf_refresh_timer) {
            clearTimeout(this.csrf_refresh_timer);
            this.csrf_refresh_timer = null;
            this.logger.info(`CSF Refresh timer has been cancelled`)
        }
    }

    // Method to execute login request
    public async executeLogIn(form_data: LoginFormDataInterface): Promise<{s_state: boolean, s_msg: string}> {
        
        try {
            const { status, msg, data: response_data } = await this.api_service.logIn(form_data);

            if(status != "success") { return { s_state: false, s_msg: msg } }

            const { current_member = {}, access_token }   = response_data;

            current_member.is_fully_authenticated = false;
            
            const stored = this.storeMemberData(current_member, access_token);

            if(!stored) { return { s_state: false, s_msg: "error_occurred" } }

            return { s_state: true, s_msg: msg };
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute log in`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }

    }

    // Method to execute two factor log in
    public async executeTwoFactorLogIn(form_data: TwoFactorFormDataInterface): Promise<{s_state: boolean, s_msg: string, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.twoFactorLogin(form_data);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }

            const { current_member = {}, access_token }   = response_data;

            current_member.is_fully_authenticated = true;
            
            const stored = this.storeMemberData(current_member, access_token);

            if(!stored) { return { s_state: false, s_msg: "error_occurred" } }

            return { s_state: true, s_msg: msg };
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute two factor log in`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }

    }

    // Method to execute two factor log in
    public async executeLogOut(): Promise<{s_state: boolean, s_msg: string, logout?: boolean}> {
        try {
            await this.api_service.logOut();

            this.deleteMemberdata()

            return { s_state: true, s_msg: "" };
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute two factor log in`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }

    }

}

export default AuthUIService