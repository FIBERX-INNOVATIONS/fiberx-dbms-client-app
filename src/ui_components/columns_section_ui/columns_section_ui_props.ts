import { PropType }     from "vue";
import ClassStyles      from "@/enums/class_styles.enums";
import { ColumnDefinitionInterface } from "@/types/schema_type";

const ui_class_styles   = ClassStyles?.schema_designer_ui?.columns_section_ui ?? {};

const ColumnsSectionUIProps   = {
    content_data: { type: Object, default: () => {}, required: true },

    columns: { type: Object as PropType<ColumnDefinitionInterface[]>, default: () => {}, required: false },

    section_wrapper_class_style: { type: String, default: ui_class_styles?.wrapper_class_style ?? "", required: false },

    header_section_wrapper_class_style: { type: String, default: ui_class_styles?.header_section?.wrapper_class_style ?? "", required: false },

    header_section_label_class_style: { type: String, default: ui_class_styles?.header_section?.label_class_style ?? "", required: false },

    header_section_btn_class_style: { type: String, default: ui_class_styles?.header_section?.btn_class_style ?? "", required: false },

    header_section_btn_icon_class_style: { type: String, default: ui_class_styles?.header_section?.btn_icon_class_style ?? "", required: false },

    body_section_wrapper_class_style: { type: String, default: ui_class_styles?.body_section?.wrapper_class_style ?? "", required: false },

    body_section_label_class_style: { type: String, default: ui_class_styles?.body_section?.label_class_style ?? "", required: false },

    body_section_row_header_wrapper_class_style: { type: String, default: ui_class_styles?.body_section?.row_header?.wrapper_class_style ?? "", required: false },

    body_section_row_header_label_class_style: { type: String, default: ui_class_styles?.body_section?.row_header?.label_class_style ?? "", required: false },

    body_section_row_header_delete_btn_class_style: { type: String, default: ui_class_styles?.body_section?.row_header?.delete_btn_class_style ?? "", required: false },

    body_section_row_header_delete_btn_svg_class_style: { type: String, default: ui_class_styles?.body_section?.row_header?.delete_btn_svg_class_style ?? "", required: false },

    body_section_row_body_wrapper_class_style: { type: String, default: ui_class_styles?.body_section?.row_body?.wrapper_class_style ?? "", required: false },

    body_section_row_body_details_wrapper_class_style: { type: String, default: ui_class_styles?.body_section?.row_body?.details_wrapper_class_style ?? "", required: false },

    body_section_row_body_summary_wrapper_class_style: { type: String, default: ui_class_styles?.body_section?.row_body?.summary_wrapper_class_style ?? "", required: false },

    body_section_row_body_responsive_grid_2_class_style: { type: String, default: ui_class_styles?.body_section?.row_body?.responsive_grid_2_class_style ?? "", required: false },

    body_section_row_body_responsive_grid_3_class_style: { type: String, default: ui_class_styles?.body_section?.row_body?.responsive_grid_3_class_style ?? "", required: false },


}

export default ColumnsSectionUIProps;