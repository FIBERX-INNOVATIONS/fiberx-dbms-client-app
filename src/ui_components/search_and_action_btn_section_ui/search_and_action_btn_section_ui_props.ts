import { PropType } from "vue";

import { SearchFieldUIPropsInterface, ButtonUIPropsInterface, InputGroupPropsInterface } from "@ui/version_2/types/props_builder_type";

const SearchAndActionBtnSectionUIProps   = {
    list_data_action_section_class_style: { type: String, default: "", required: false },

    grid_1_wrapper_class_style: { type: String, default: "", required: false },

    grid_2_wrapper_class_style: { type: String, default: "", required: false },

    search_field_props: { type: Object as PropType<SearchFieldUIPropsInterface>, required: true },

    form_action_btn_props: { type: Object as PropType<ButtonUIPropsInterface>, required: true },

    select_filter_input_props: { type: Object as PropType<InputGroupPropsInterface>, required: false },
}

export default SearchAndActionBtnSectionUIProps;