import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles   = ClassStyles.form_view_ui;
const class_style       = ui_class_styles.object_input_section_class_styles

const SchemaAccessFormViewProps   = {
    record: { type: Object, default: () => {}, required: false },

    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    form_class_style: { type: String, default: ui_class_styles.form_class_style, required: false },

    object_section_wrapper_class_style: { type: String, default: class_style.wrapper_class_style, required: false },

    object_section_header_class_style: { type: String, default: class_style.header_class_style, required: false },

    object_section_header_label_text_class_style: { type: String, default: class_style.header_label_class_style, required: false },

    object_section_header_add_btn_class_style: { type: String, default: class_style.header_add_btn_class_style, required: false },

    object_section_body_class_style: { type: String, default: class_style.body_class_style, required: false },

    object_section_body_row_class_style: { type: String, default: class_style.body_row_class_style, required: false },

    object_section_body_grid_responsive_row_class_style: { type: String, default: class_style.body_grid_row_class_style, required: false },

    object_section_body_row_label_text_class_style: { type: String, default: class_style.body_row_label_text_class_style, required: false },

    object_body_key_class_style: { type: String, default: class_style.body_key_wrapper_class_style, required: false },

    object_body_value_class_style: { type: String, default: class_style.body_value_wrapper_class_style, required: false },

    object_body_delete_btn_class_style: { type: String, default: class_style.body_delete_btn_wrapper_class_style, required: false },

}

export default SchemaAccessFormViewProps;