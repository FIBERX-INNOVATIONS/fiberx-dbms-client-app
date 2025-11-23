
import { markRaw, reactive  }           from "vue";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";


import { 
    SortDirectionType,
    TableColumnInterface 
} from "@ui/version_2/types/props_builder_type";


class SchemaAccessTableColumnConfig {
    public readonly name = "schema_access_table_column_config";

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

        const { 
            registered_app_name_text, app_id_text, schema_name_text, schema_table_name_text, 
            is_owner_text, is_owned_value_text, is_not_owned_value_text,
            created_at_text,
         } = content_data;


        const columns_config: TableColumnInterface[] = [
            {
                label_content: registered_app_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "registered_app.name",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: app_id_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "registered_app.public_id",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: ClassStyles.profile_img_avatar_ui.right_slot_sub_title_class_style,
            },
            {
                label_content: schema_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "schema.name",
                on_sort,
                content_type: "formatted" as const,
                formatter: (value: any, record?: Record<string, any>) => { return InputTransformerUtil.spaceCamelCase(value); },
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: schema_table_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "plain" as const,
                field_key: "schema.table_name",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "underline font-bold",
            },
            {
                label_content: is_owner_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "is_owner",
                on_sort,
                content_type: "formatted" as const,
                formatter: (value: any, record?: Record<string, any>) => { return value ? is_owned_value_text : is_not_owned_value_text },
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
                formatter: (value: any, record?: Record<string, any>) => { return InputTransformerUtil.formatReadableDateTime(value) },
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,        
                col_class_style: "",
            },
        ];

        return columns_config;
    }

}

export default SchemaAccessTableColumnConfig