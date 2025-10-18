import { PropType } from "vue";

import { 
    TableBodyUIPropsInterface,
    TableHeaderUIPropsInterface,
    ButtonUIPropsInterface,
    MenuListUIPropsInterface
} from "@ui/version_2/types/props_builder_type";

const DataTableSectionUIProps   = {
    table_id: { type: String, required: false },

    is_loading: { type: Boolean, default: true, required: false },

    number_of_loading_bars: { type: Number, default: 12, required: false },

    header_props: { type: Object as PropType<TableHeaderUIPropsInterface>, required: true },

    body_props: { type: Object as PropType<TableBodyUIPropsInterface>, required: true },

    wrapper_class_style: { type: String, default: "", required: false },

    table_class_style: { type: String, default: "", required: false },

    lg_table_wrapper_class_style: { type: String, default: "", required: false},

    action_btn_props_method: { 
        type: Function as PropType<(record_index: Number, record: Record<string, any>) => ButtonUIPropsInterface>, 
        default: null, 
        required: false 
    },

    action_menu_list_props_method: {
        type: Function as PropType<(record_index: Number, record: Record<string, any>) => MenuListUIPropsInterface>, 
        default: null, 
        required: false 
    },

}

export default DataTableSectionUIProps;