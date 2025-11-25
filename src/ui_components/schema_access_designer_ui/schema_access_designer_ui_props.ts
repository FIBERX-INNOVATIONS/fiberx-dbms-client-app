import { PropType }     from "vue";
import ClassStyles      from "@/enums/class_styles.enums";
import { SchemaAccessDefinitionInterface } from "@/types/schema_type";

const ui_class_styles   = ClassStyles.schema_designer_ui;

const SchemaAccessDesignerUIProps   = {
    app_public_id: { type: String, default: "", required: false },
    
    schema_access_definition: { type: Object as PropType<SchemaAccessDefinitionInterface[]>, default: () => [], required: false },

    content_data: { type: Object, default: () => {}, required: true },

    section_wrapper_class_style: { type: String, default: ui_class_styles.wrapper_class_style, required: false },


}

export default SchemaAccessDesignerUIProps;