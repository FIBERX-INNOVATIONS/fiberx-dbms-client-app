import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles           = ClassStyles.form_view_ui;
const class_style               = ui_class_styles.object_input_section_class_styles

const MemberFormViewProps   = {
    record: { type: Object, default: () => {}, required: false },

    section_wrapper_class_style: { type: String, default: ui_class_styles.section_wrapper_class_style, required: false },

    form_class_style: { type: String, default: ui_class_styles.form_class_style, required: false },

}

export default MemberFormViewProps;