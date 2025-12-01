
import { markRaw, reactive  }           from "vue";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import { LOCAL_STORAGE_FIELDS }         from "@/enums/constants.enums";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import ImgAvatarUI                      from "@ui/version_2/components/ImgAvatarUI/img_avatar_ui.vue";
import InputUI                          from "@ui/version_2/components/InputUI/input_ui.vue";
import InputTransformerUtil             from "@ui/version_2/utils/input_formatter_util";
import BaseTableColumnConfig            from "./base_table_column_config";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";

import { 
    ImgAvatarUIPropsInterface,
    InputUIPropsInterface,
    SortDirectionType,
    TableColumnInterface 
} from "@ui/version_2/types/props_builder_type";


class MemberTableColumnConfig {
    public readonly name = "member_table_column_config";

    // Method to render registered app avatar ui props
    private static getImgAvatarUIProps (record: Record<string, any>): ImgAvatarUIPropsInterface {
        const { public_id, full_name, profile_photo_link } = record;
        return BaseTableColumnConfig.getImgAvatarUIProps(`RegisteredApp-${record?.public_id}`, profile_photo_link, full_name, public_id);
    }

    // Method to get is_active ui props
    private static getIsActiveUIProps (event_handler: BaseEventHandlerInterface, record: Record<string, any>): InputUIPropsInterface {
        const { public_id, member_auth = {} } = record;

        const { is_active = false } = member_auth
        const is_active_boolean     = is_active ? true : false;
        const switch_props          = BaseTableColumnConfig.geIsActiveSwitchProps(public_id.toString(), is_active_boolean);
        switch_props.on_click       = event_handler.handleOnRecordChangeState.bind(event_handler);

        return switch_props;
    }

    // Method to format role name
    private static formatRoleName (role_name: string, record?: Record<string, any>): string { 
        const content_manager           = ContentManagerUtil.getInstance();
        const content_data              = content_manager?.get(`content_resource.member_view_ui.form_view_ui`) ?? {};
        const role_options_list         = content_data?.fieldset?.role_options_list || [];
        const valid_role                = role_options_list.find((role_obj: { value: string, label_text: string }) => { return role_name === role_obj.value });

        if (!valid_role) { return "" }

        return InputTransformerUtil.toTitleCase(valid_role?.label_text);
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
        const member_perm_key           = LOCAL_STORAGE_FIELDS?.MEMBER_PERMISSIONS_KEY;

        const { 
            sortable_cell_wrapper_class_style, 
            sortable_cell_content_wrapper_class_style, 
            sortable_icon_class_style 
        } = class_styles

        const { name_text, email_text, role_text, phone_text, is_active_text, created_at_text } = content_data;

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
                field_key: "first_name",
                on_sort,
                content_type: "component" as const,
                component: markRaw(ImgAvatarUI),
                component_props: this.getImgAvatarUIProps,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
            },
            {
                label_content: email_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: (email: string, record?: Record<string, any>) => { return InputTransformerUtil.formatURLToAnchorHtml(email, `mailto:${email}`); },
                field_key: "email",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
            },
            {
                label_content: role_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: this.formatRoleName,
                field_key: "email",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
            },
            {
                label_content: phone_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: (phone_number: string, record?: Record<string, any>) => { return InputTransformerUtil.formatURLToAnchorHtml(phone_number, `tel:${phone_number}`); },
                field_key: "phone",
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
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

        if(member_authenticator.canMemberAccess("change_member_auth_record_state", member_perm_key)) {
            columns_config.splice(3, 0, is_active_column_render);
        }

        // ✅ Update active sorted column
        const active_col = columns_config.find((col) => col.field_key === order_by);

        if (active_col) { active_col.sort_direction = order_direction; }

        return columns_config;
    }

}

export default MemberTableColumnConfig