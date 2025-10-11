import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles       = ClassStyles.registered_app_ui.list_view_ui;

const RegisteredAppListViewProps   = {
    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    header_text_class_style: { type: String, default: ui_class_styles.header_text_class_style, required: false },

}

export default RegisteredAppListViewProps;