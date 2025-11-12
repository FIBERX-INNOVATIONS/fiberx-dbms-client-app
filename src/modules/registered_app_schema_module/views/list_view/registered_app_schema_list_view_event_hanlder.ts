
import BaseListViewEventHandler                 from "@/base_classes/list_view/base_list_view_event_handler";
import RegisteredAppSchemaTableColumnConfig     from "@/configs/table_column_config/registered_app_schema_table_column_config";
import RegisteredAppSchemaFormView              from "../form_view/registered_app_schema_form_view.vue";
import RegisteredAppSchemaProfileView           from "../profile_view/registered_app_schema_profile_view.vue";
import { BaseControllerInterface }              from "@ui/version_2/types/component_type";

class RegisteredAppSchemaListViewEventHandler extends BaseListViewEventHandler {

    constructor(controller: BaseControllerInterface) {
        super(controller, RegisteredAppSchemaTableColumnConfig, RegisteredAppSchemaProfileView, RegisteredAppSchemaFormView);

        this.form_modal_config = { position: "center", width_class: "w-[95%]" }
    }
}

export default RegisteredAppSchemaListViewEventHandler