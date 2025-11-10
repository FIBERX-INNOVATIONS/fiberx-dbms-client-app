
import { markRaw, reactive  }           from "vue";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";

import { 
    SortDirectionType,
    TableColumnInterface 
} from "@ui/version_2/types/props_builder_type";


class RegisteredAppSchemaTableColumnConfig {
    public readonly name = "registered_app_schema_table_column_config";

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
            name_text, app_id_text, table_name_text, model_name_text, 
            datasource_name_text, datasource_type_text, primary_key_text, 
            migration_priority_text, created_at_text
        } = content_data;

        const columns_config: TableColumnInterface[] = [
            {
                label_content: name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "name",
                on_sort,
                content_type: "formatted" as const,
                formatter: (value: any, record?: Record<string, any>) => { return InputTransformerUtil.spaceCamelCase(value); },
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: app_id_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "app_id",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: ClassStyles.profile_img_avatar_ui.right_slot_sub_title_class_style,
            },
            {
                label_content: table_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "plain" as const,
                field_key: "table_name",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "underline font-bold",
            },
            {
                label_content: model_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: (value: any, record?: Record<string, any>) => { return InputTransformerUtil.toPascalCase(value); },
                field_key: "model_name",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
            },
            {
                label_content: datasource_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "datasource_name",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: datasource_type_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "datasource_type",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: primary_key_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "primary_key",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: migration_priority_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "migration_priority",
                on_sort,
                content_type: "plain" as const,
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


        // ✅ Update active sorted column
        const active_col = columns_config.find((col) => col.field_key === order_by);

        if (active_col) { active_col.sort_direction = order_direction; }

        return columns_config;
    }

}

export default RegisteredAppSchemaTableColumnConfig