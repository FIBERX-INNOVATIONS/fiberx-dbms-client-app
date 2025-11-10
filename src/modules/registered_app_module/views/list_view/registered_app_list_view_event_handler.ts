
import BaseListViewEventHandler     from "@/base_classes/base_list_view_event_handler";
import RegisteredAppTableColumnConfig   from "@/configs/table_column_config/registered_app_table_column_config";
import RegisteredAppProfileView         from "@/modules/registered_app_module/views/profile_view/registered_app_profile_view.vue";
import RegisteredAppFormView            from "@/modules/registered_app_module/views/form_view/registered_app_form_view.vue";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";


class RegisteredAppListViewEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, RegisteredAppTableColumnConfig, RegisteredAppProfileView, RegisteredAppFormView);
    }

}

export default RegisteredAppListViewEventHandler;