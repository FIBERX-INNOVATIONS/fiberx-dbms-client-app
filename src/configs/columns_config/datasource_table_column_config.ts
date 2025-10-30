
import { markRaw, reactive  }           from "vue";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import { LOCAT_STORAGE_FIELDS }         from "@/enums/constants.enums";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import InputUI                          from "@ui/version_2/components/InputUI/input_ui.vue";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";
import BaseTableColumnConfig            from "./base_table_column_config";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";

import { 
    InputUIPropsInterface,
    SortDirectionType,
    TableColumnInterface 
} from "@ui/version_2/types/props_builder_type";


class DatasourceTableColumnConfig {
    public readonly name = "datasource_table_column_config";

    // Method to get is_active ui props
    private static getIsActiveUIProps (event_handler: BaseEventHandlerInterface, record: Record<string, any>): InputUIPropsInterface {
        const { id, is_active }     = record;
        const is_active_boolean     = is_active ? true : false
        const switch_props          = BaseTableColumnConfig.geIsActiveSwitchProps(id.toString(), is_active_boolean);
        switch_props.on_click       = event_handler.handleOnRecordChangeState.bind(event_handler);

        return switch_props;
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
        const member_authenticator      = MemberAuthManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.${content_field_key}.data_table`) ?? {};
        const on_sort                   = event_handler?.handleOnColumnSort?.bind(event_handler);
        const member_perm_key           = LOCAT_STORAGE_FIELDS?.MEMBER_PERMISSIONS_KEY;

        const { 
            sortable_cell_wrapper_class_style, 
            sortable_cell_content_wrapper_class_style, 
            sortable_icon_class_style 
        } = class_styles

        const { name_text, host_text, database_name_text, type_text, is_active_text, created_at_text } = content_data;

        const is_active_column_render =  {
            label_content: is_active_text,
            sortable: true,
            sort_direction: "none" as SortDirectionType,
            on_sort,
            field_key: "is_active",
            content_type: "component" as const,
            component: markRaw(InputUI),
            component_props: (record: Record<string, any>) => { return this.getIsActiveUIProps(event_handler, record)},
            col_class_style: "",
            wrapper_class_style: sortable_cell_wrapper_class_style,
            icon_class_style: sortable_icon_class_style,
            content_wrapper_class_style: sortable_cell_content_wrapper_class_style    
        };

        const columns_config: TableColumnInterface[] = [
            {
                label_content: name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "name",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "font-black uppercase",
            },
            {
                label_content: type_text,
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
                label_content: host_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: (value: any, record?: Record<string, any>) => { return InputTransformerUtil.formatURLToAnchorHtml(value, value); },
                field_key: "host",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
            },
            {
                label_content: database_name_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                field_key: "database_name",
                on_sort,
                content_type: "plain" as const,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: ClassStyles.profile_img_avatar_ui.right_slot_sub_title_class_style,
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

        if(member_authenticator.canMemberAccess("change_datasource_state", member_perm_key)) {
            columns_config.splice(3, 0, is_active_column_render);
        }

        // ✅ Update active sorted column
        const active_col = columns_config.find((col) => col.field_key === order_by);

        if (active_col) { active_col.sort_direction = order_direction; }

        return columns_config;
    }

}

export default DatasourceTableColumnConfig