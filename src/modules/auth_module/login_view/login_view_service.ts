
import BaseService                  from "@ui/version_2/base_classes/base_service";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

class LoginViewService extends BaseService {

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);
    }

}

export default LoginViewService