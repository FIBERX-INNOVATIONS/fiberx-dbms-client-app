
import { markRaw, reactive  }           from "vue";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";
import { SchemaAccessRecordInterface }  from "@/types/api_service_type";


import { 
    SortDirectionType,
    TableColumnInterface 
} from "@ui/version_2/types/props_builder_type";


class RoleTableColumnConfig {
    public readonly name = "role_table_column_config";

    // Method to format name
    private static formatRoleName <SchemaAccessRecordInterface>(
        role_name: string, 
        role_options_list: { value: string, label_text: string}[]
    ) { 
        const role_obj = role_options_list.find((obj:{ value: string, label_text: string} ) => { return obj.value === role_name})

        return role_obj?.label_text ?? role_name
    }

    // Method to format member count
    private static formatMemberCount <SchemaAccessRecordInterface>(
        member_count: number, 
        record?: SchemaAccessRecordInterface
    ) { 
        return `${member_count} Members`;
    }

    // Method to format date-time
    private static formatDateTime <SchemaAccessRecordInterface>(
        date_time: string, 
        record?: SchemaAccessRecordInterface
    ) { 
        return InputTransformerUtil.formatReadableDateTime(date_time)
    }

    
    // Method to get table column
    public static getTableColumnConfig (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        order_by: string = "created_at",
        order_direction: SortDirectionType = "desc"
    ): TableColumnInterface[] {
        const class_styles              = ClassStyles?.list_view_ui?.data_table_ui?.table_header_ui ?? {};
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.data_table`) ?? {};
        const on_sort                   = event_handler?.handleOnColumnSort?.bind(event_handler);

        const { 
            sortable_cell_wrapper_class_style, 
            sortable_cell_content_wrapper_class_style, 
            sortable_icon_class_style 
        } = class_styles

        const { name_text, symbol_text, member_count_text, created_at_text, role_options_list = [] } = content_data;


        const columns_config: TableColumnInterface[] = [
            {
                label_content: name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "name",
                on_sort,
                content_type: "formatted" as const,
                formatter: <SchemaAccessRecordInterface>(role_name: string, record?: SchemaAccessRecordInterface) => { return this.formatRoleName(role_name, role_options_list); },
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: symbol_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "symbol",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: ClassStyles.profile_img_avatar_ui.right_slot_sub_title_class_style,
            },
            {
                label_content: member_count_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "member_count",
                on_sort,
                content_type: "formatted" as const,
                formatter: this.formatMemberCount,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: created_at_text,
                sortable: true,
                field_key: "created_at",
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: this.formatDateTime,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,        
                col_class_style: "",
            },
        ];

        // ✅ Update active sorted column
        const active_col = columns_config.find((col) => col.field_key === order_by);

        if (active_col) { active_col.sort_direction = order_direction; }

        return columns_config;
    }

}

export default RoleTableColumnConfig;