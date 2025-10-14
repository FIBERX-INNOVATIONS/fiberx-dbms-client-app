
import BaseService                  from "@ui/version_2/base_classes/base_service";
import AuthAPIService               from "@/api_services/auth_api_service";
import AuthTokenManagerUtil         from "@ui/version_2/utils/auth_token_manager_util";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";
import MemberAuthManagerUtil        from "@ui/version_2/utils/member_auth_manager_util";


class DashbaordBaseViewService extends BaseService {
    public readonly api_service: AuthAPIService;
    public member_auth_manager: MemberAuthManagerUtil;
    private auth_token_manager: AuthTokenManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.api_service            = new AuthAPIService();
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
        this.auth_token_manager     = AuthTokenManagerUtil.getInstance(this.api_service);
    }

}

export default DashbaordBaseViewService