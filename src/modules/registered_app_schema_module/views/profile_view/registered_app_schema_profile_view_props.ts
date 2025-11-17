import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles       = ClassStyles.profile_view_ui;

const RegisteredAppSchemaProfileViewProps   = {
    wrapper_class_style: { type: String, default: ui_class_styles.wrapper_class_style, required: false },

    info_section_wrapper_class_style: { type: String, default: ui_class_styles.info_section_wrapper_class_style, required: false },

    key_text_class_style: { type: String, default: ui_class_styles.key_text_class_style, required: false },

    value_text_class_style: { type: String, default: ui_class_styles.value_text_class_style, required: false },

    underline_value_text_class_style: { type: String, default: ui_class_styles.underline_value_text_class_style, required: false },

    timestamp_section_wrapper_class_style: { type: String, default: ui_class_styles.timestamp_section_wrapper_class_style, required: false },

    grid_two_section_wrapper_class_style: { type: String, default: ui_class_styles.grid_two_section_wrapper_class_style, required: false },

    grid_item_class_style: { type: String, default: ui_class_styles.grid_item_class_style, required: false },

    record: { type: Object, default: () => ({}), required: false },

}

export default RegisteredAppSchemaProfileViewProps;