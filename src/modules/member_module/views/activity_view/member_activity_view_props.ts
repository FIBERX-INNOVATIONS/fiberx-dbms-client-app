import ClassStyles from "@/enums/class_styles.enums";

const ui_class_styles = ClassStyles.profile_view_ui;

const MemberActivityViewProps = {
    wrapper_class_style: { type: String, default: ui_class_styles.wrapper_class_style, required: false },

    record: { type: Object, default: () => {}, required: false },

    grid_item_class_style: { type: String, default: ui_class_styles.grid_item_class_style, required: false },
};

export default MemberActivityViewProps;
