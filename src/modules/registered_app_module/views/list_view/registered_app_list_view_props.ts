import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles       = ClassStyles.list_view_ui;

const RegisteredAppListViewProps   = {
    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    header_text_class_style: { type: String, default: ui_class_styles.header_text_class_style, required: false },

    data_section_wrapper_class_style: { type: String, default: ui_class_styles.data_section_wrapper_class_style, required: false },

    grid_1_wrapper_class_style: { type: String, default: ui_class_styles.grid_1_wrapper_class_style, required: false },

    grid_2_wrapper_class_style: { type: String, default: ui_class_styles.grid_2_wrapper_class_style, required: false },

    list_data_action_section_class_style: { type: String, default: ui_class_styles.list_data_action_section_class_style, required: false },

    pagination_summary_class_style: { type: String, default: ui_class_styles.pagination_summary_class_style, required: false },

    data_table_section_wrapper_class_style: { type: String, default: ui_class_styles.data_table_section_wrapper_class_style, required: false },

    data_table_class_style: { type: String, default: ui_class_styles.data_table_class_style, required: false },

    lg_table_wrapper_class_style: { type: String, default: ui_class_styles.lg_table_wrapper_class_style, required: false },

}

export default RegisteredAppListViewProps;