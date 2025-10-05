import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles       = ClassStyles.auth;

const LoginViewProps   = {
    wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    form_box_class_style: { type: String, default: ui_class_styles.section_form_box_class_style, required: false },

    form_box_wrapper_class_style:  { type: String, default: ui_class_styles.form_box_wrapper_class_style, required: false },

    header_text_class_style: { type: String, default: ui_class_styles.header_text_class_style, required: false },

    fieldset_class_style: { type: String, default: ui_class_styles.fieldset_class_style, required: false },

}

export default LoginViewProps;