
import BaseListViewEventHandler     from "@/base_classes/list_view/base_list_view_event_handler";
import RolesTableColumnConfig       from "@/configs/table_column_config/roles_table_column_config";
import AccessControlRoleProfileView from "@/modules/access_control_module/views/role_profile_view/access_control_role_profile_view.vue";
import { RoleRecordInterface  }     from "@/types/api_service_type";
import { BaseControllerInterface }  from "@ui/version_2/types/component_type";

class AccessControlRoleListViewEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, RolesTableColumnConfig, AccessControlRoleProfileView, null);

        this.form_modal_config = { position: "center", width_class: "w-[60%]" }
    }

    // Method to get modal_title value
    public getModalTitleValue (record: RoleRecordInterface): string | null { 
        const content_data                  = this.content_manager?.get(`content_resource.access_control_view_ui.data_table`) ?? {};
        const { role_options_list = [] }    = content_data;
        const role_name                     = record?.name;
        const role_obj                      = role_options_list.find((obj:{ value: string, label_text: string} ) => { return obj.value === role_name });

        return role_obj?.label_text ?? role_name
    }

}

export default AccessControlRoleListViewEventHandler;