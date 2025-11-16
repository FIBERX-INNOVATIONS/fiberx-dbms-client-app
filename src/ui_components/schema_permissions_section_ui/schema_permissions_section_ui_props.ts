import { PropType }     from "vue";
import ClassStyles      from "@/enums/class_styles.enums";
import { PermissionType } from "@/types/schema_type";

const ui_class_styles   = ClassStyles?.schema_designer_ui?.schema_permissions_section_ui ?? {};

const permissions_class_styles = ClassStyles.schema_designer_ui.columns_section_ui

const SchemaPermissionsSectionnUIProps   = {
    content_data: { type: Object, default: () => {}, required: true },

    permissions: { type: Object as PropType<PermissionType[]>, default: () => {}, required: false },

    section_wrapper_class_style: { type: String, default: ui_class_styles?.wrapper_class_style ?? "", required: false },

    header_section_wrapper_class_style: { type: String, default: permissions_class_styles?.header_section?.wrapper_class_style ?? "", required: false },

    header_section_label_class_style: { type: String, default: permissions_class_styles?.header_section?.label_class_style ?? "", required: false },

    body_class_style: { type: String, default: ui_class_styles?.body_class_style ?? "", required: false },

    row_class_style: { type: String, default: ui_class_styles?.row_class_style ?? "", required: false },

}

export default SchemaPermissionsSectionnUIProps;