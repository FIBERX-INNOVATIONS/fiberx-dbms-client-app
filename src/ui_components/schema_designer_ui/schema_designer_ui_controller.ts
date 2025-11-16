
import { ref }                      from "vue";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import SchemaPermissionsSectionUI   from "@/ui_components/schema_permissions_section_ui/schema_permissions_section_ui.vue";
import ColumnsSectionUI             from "@/ui_components/columns_section_ui/columns_section_ui.vue";
import IndexesSectionUI             from "@/ui_components/indexes_section_ui/indexes_section_ui.vue"


class SchemaDesignerUIController extends BaseController {

    constructor(props: Record<string, any> = {}) {
        super("schema_designer_ui", props);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { ColumnsSectionUI, IndexesSectionUI, SchemaPermissionsSectionUI  }; 
    }

}

export default SchemaDesignerUIController;