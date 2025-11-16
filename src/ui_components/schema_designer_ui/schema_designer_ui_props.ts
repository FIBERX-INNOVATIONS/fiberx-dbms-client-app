import { PropType }     from "vue";
import ClassStyles      from "@/enums/class_styles.enums";
import { 
    ColumnDefinitionInterface, 
    IndexDefinitionInterface, 
    PermissionType
} from "@/types/schema_type";

const ui_class_styles   = ClassStyles.schema_designer_ui;

const SchemaDesignerUIProps   = {
    permission_definition: { type: Object as PropType<PermissionType[]>, default: () => {}, required: false },

    columns_defintion: { type: Object as PropType<ColumnDefinitionInterface[]>, default: () => [], required: false },

    indexes_definition: { type: Object as PropType<IndexDefinitionInterface[]>, default: () => [], required: false },

    content_data: { type: Object, default: () => {}, required: true },

    section_wrapper_class_style: { type: String, default: ui_class_styles.wrapper_class_style, required: false },


}

export default SchemaDesignerUIProps;