
import { BaseControllerInterface }      from "@ui/version_2/types/component_type";
import BaseService                      from "@ui/version_2/base_classes/base_service";
import AuthAPIService                   from "@/api_services/auth_api_service";
import AccessControlAPIService          from "@/api_services/access_control_api_service";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";

import { 
    CSRF_TOKEN_FOR ,
    LOCAL_STORAGE_FIELDS
} from "@/enums/constants.enums";


import { 
    RequestQueryInputInterface,
    RolePermissionsFormDataInputData
} from "@/types/validation_type";

class AccessControlUIService extends BaseService {
    public readonly auth_api_service: AuthAPIService;
    public readonly api_service: AccessControlAPIService;
    public member_auth_manager: MemberAuthManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.auth_api_service       = new AuthAPIService();
        this.api_service            = new AccessControlAPIService()
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
    }


    // Method to get and set form csrf token
    public async getFormCsrfToken(token_for: string = CSRF_TOKEN_FOR.DATASOURCE ): Promise<boolean> {
        try {
            const { data }      = await this.auth_api_service.getFormCSRFToken(token_for);
            const csrf_token    = data?.token;

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

            return true;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to get form csrf token`, { error });
            return false;
        }
    }

    // Method to execute fetch records
    public async executeFetchRecords(params: RequestQueryInputInterface): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.getRoles(params)

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch records`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute fetch records
    public async executeFetchRoleAssignedPermissionRecords(role_id: number, params: RequestQueryInputInterface): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.getRoleAssignedPermissions(role_id, params)

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch records`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute fetch records
    public async executeFetchRoleUnAssignedPermissionRecords(role_id: number, params: RequestQueryInputInterface): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.getRoleUnAssignedPermissions(role_id, params)

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch records`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute create new record 
    public async executeAssignPermissionRecords (form_data: RolePermissionsFormDataInputData): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.assignPermissionsToRole(form_data);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute assign permission records`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute delete record
    public async executeDelettePermissionRecords (form_data: RolePermissionsFormDataInputData): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.unAssignPermissionsToRole(form_data)

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute delete permission records`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

}

export default AccessControlUIService