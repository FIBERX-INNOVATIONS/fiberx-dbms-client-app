import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles           = ClassStyles.form_view_ui;
const columns_class_style       = ui_class_styles.object_input_section_class_styles

const RegisteredAppSchemaFormViewProps   = {
    record: { type: Object, default: () => {}, required: false },

    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    form_class_style: { type: String, default: ui_class_styles.form_class_style, required: false },

    columns_wrapper_class_style: { type: String, default: columns_class_style.wrapper_class_style, required: false },

    columns_header_class_style: { type: String, default: columns_class_style.header_class_style, required: false },

    columns_header_label_class_style: { type: String, default: columns_class_style.header_label_class_style, required: false },

    columns_header_add_btn_class_style: { type: String, default: columns_class_style.header_add_btn_class_style, required: false },

    columns_body_class_style: { type: String, default: columns_class_style.body_class_style, required: false },

    columns_body_link_name_class_style: { type: String, default: columns_class_style.body_link_name_wrapper_class_style, required: false },

    columns_body_link_value_class_style: { type: String, default: columns_class_style.body_link_value_wrapper_class_style, required: false },

    columns_body_delete_btn_class_style: { type: String, default: columns_class_style.body_delete_btn_wrapper_class_style, required: false },

}

export default RegisteredAppSchemaFormViewProps;