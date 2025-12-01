
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";
import BaseService                  from "@ui/version_2/base_classes/base_service";
import AuthAPIService               from "@/api_services/auth_api_service";
import MemberAPIService             from "@/api_services/member_api_service";
import MemberAuthManagerUtil        from "@ui/version_2/utils/member_auth_manager_util";

import { 
    CSRF_TOKEN_FOR ,
    LOCAL_STORAGE_FIELDS
} from "@/enums/constants.enums";


import { 
    RequestQueryInputInterface,
    MemberFormInputInterface
} from "@/types/api_service_type";

class MemberUIService extends BaseService {
    public readonly auth_api_service: AuthAPIService;
    public readonly api_service: MemberAPIService;
    public member_auth_manager: MemberAuthManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.auth_api_service       = new AuthAPIService();
        this.api_service            = new MemberAPIService()
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
            const { status, msg, data: response_data } = await this.api_service.getAllMemberProfileRecords(params);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch records`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute fetch record
    public async executeFetchRecord(record_id: string): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.getMemberProfileRecord(record_id);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch record`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute fetch record 2fa info
    public async executeFetchMember2FAInfo(record_id: string, hard_reset: boolean = false): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.getMember2FAInfo(record_id, hard_reset);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch member 2fa info`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute fetch record activities
    public async executeFetchMemberActivities(record_id: string): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.getMemberProfileActivities(record_id);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute fetch member activities`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute change record state
    public async executeChangeRecordState(record_id: string): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.updateMemberAuthRecordState(record_id);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute change record state`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute create new record 
    public async executeCreateRecord(form_data: MemberFormInputInterface): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.createNewMemberProfileRecord(form_data);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute register new  record`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute update record
    public async executeUpdateRecord(record_id: string, form_data: MemberFormInputInterface): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.updateMemberProfileRecord(record_id, form_data);

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute update record`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

    // Method to execute delete record
    public async executeDeleteRecord(record_id: string): Promise<{s_state: boolean, s_msg: string, s_data?: Record<string, any>, logout?: boolean}> {
        try {
            const { status, msg, data: response_data } = await this.api_service.deleteMemberProfile(record_id)

            if (status === "logout") { return { s_state: false, s_msg: msg, logout: true } }

            else if(status != "success") { return { s_state: false, s_msg: msg } }
            
            return { s_state: true, s_msg: msg, s_data: response_data};
        }
        catch(error: unknown) {
            this.logger.error(`Failed to execute delete record`, { error });
            return { s_state: false, s_msg: "error_occurred"};
        }
    }

}

export default MemberUIService