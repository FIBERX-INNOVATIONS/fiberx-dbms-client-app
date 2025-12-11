

import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles       = ClassStyles.profile_view_ui;
const list_ui_class_styles  = ClassStyles.list_view_ui;

const AccessControlRolePermissionsViewProps = {
    wrapper_class_style: { type: String, default: ui_class_styles.wrapper_class_style, required: false },

    record: { type: Object, default: () => {}, required: false },

    grid_item_class_style: { type: String, default: ui_class_styles.grid_item_class_style, required: false },

    list_data_action_section_class_style: { type: String, default: list_ui_class_styles.list_data_action_section_class_style, required: false },

    grid_1_wrapper_class_style: { type: String, default: list_ui_class_styles.grid_1_wrapper_class_style, required: false },

    grid_2_wrapper_class_style: { type: String, default: list_ui_class_styles.grid_2_wrapper_class_style, required: false },

    pagination_summary_class_style: { type: String, default: list_ui_class_styles.pagination_summary_class_style, required: false },
};

export default AccessControlRolePermissionsViewProps;
