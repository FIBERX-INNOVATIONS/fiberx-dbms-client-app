import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles       = ClassStyles.registered_app_ui.list_view_ui;

const RegisteredAppListViewProps   = {
    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    header_text_class_style: { type: String, default: ui_class_styles.header_text_class_style, required: false },

    data_section_wrapper_class_style: { type: String, default: ui_class_styles.data_section_wrapper_class_style, required: false },

    list_data_action_section_class_style: { type: String, default: ui_class_styles.list_data_action_section_class_style, required: false },

    form_action_btn_section_class_style: { type: String, default: ui_class_styles.form_action_btn_section_class_style, required: false },

}

export default RegisteredAppListViewProps;