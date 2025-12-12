import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles           = ClassStyles.form_view_ui;
const class_style               = ui_class_styles.object_input_section_class_styles

const AccessControlRolePermissionsFormViewProps   = {
    record: { type: Object, default: () => {}, required: false },

    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    form_class_style: { type: String, default: ui_class_styles.form_class_style, required: false },

    border_seperated_wrapper_class_style: { type: String, default: ui_class_styles.border_seperated_wrapper_class_style, required: false },

    bold_label_class_style: { type: String, default: ui_class_styles.bold_label_class_style, required: false },

    label_class_style: { type: String, default: ui_class_styles.label_class_style, required: false },

    object_section_wrapper_class_style: { type: String, default: class_style.wrapper_class_style, required: false },

}

export default AccessControlRolePermissionsFormViewProps;