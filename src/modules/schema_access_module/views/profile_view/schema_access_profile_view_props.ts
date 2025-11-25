import ClassStyles from "@/enums/class_styles.enums";

const ui = ClassStyles.profile_view_ui;

const SchemaAccessProfileViewProps = {
    wrapper_class_style: { type: String, default: ui.wrapper_class_style },

    info_section_wrapper_class_style: { type: String, default: ui.info_section_wrapper_class_style },

    key_text_class_style: { type: String, default: ui.key_text_class_style },

    value_text_class_style: { type: String, default: ui.value_text_class_style },

    underline_value_text_class_style: { type: String, default: ui.underline_value_text_class_style },

    timestamp_section_wrapper_class_style: { type: String, default: ui.timestamp_section_wrapper_class_style },

    grid_two_section_wrapper_class_style: { type: String, default: ui.grid_two_section_wrapper_class_style },

    grid_item_class_style: { type: String, default: ui.grid_item_class_style },

    record: { type: Object, default: () => ({}), required: false },
};

export default SchemaAccessProfileViewProps;
