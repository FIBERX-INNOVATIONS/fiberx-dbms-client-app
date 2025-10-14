
import { PropType } from "vue";

import { 
    ButtonUIPropsInterface,
    MenuListUIPropsInterface
} from "@ui/version_2/types/props_builder_type";

const PaginationResultAndBulkActionSectionUIProps   = {
    list_data_action_section_class_style: { type: String, default: "", required: false },

    grid_1_wrapper_class_style: { type: String, default: "", required: false },

    grid_2_wrapper_class_style: { type: String, default: "", required: false },

    pagination_summary_class_style: { type: String, default: "", required: false },

    pagination_summary_text: { type: String, default: "", required: true },

    bulk_action_btn_props: { type: Object as PropType<ButtonUIPropsInterface>, required: true },

    bulk_action_menu_list_props: { type: Object as PropType<MenuListUIPropsInterface>, required: true },
}

export default PaginationResultAndBulkActionSectionUIProps;