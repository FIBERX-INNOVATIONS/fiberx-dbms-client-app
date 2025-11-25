
import { ref }                      from "vue";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import SchemaAccessSectionUI        from "@/ui_components/schema_access_section_ui/schema_access_section_ui.vue";


class SchemaAccessDesignerUIController extends BaseController {

    constructor(props: Record<string, any> = {}) {
        super("schema_access_designer_ui", props);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { SchemaAccessSectionUI  }; 
    }

}

export default SchemaAccessDesignerUIController;