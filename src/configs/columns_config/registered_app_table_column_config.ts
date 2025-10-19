
import { markRaw, reactive  }           from "vue";
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import { LOCAT_STORAGE_FIELDS }         from "@/enums/constants.enums";
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


class RegisteredAppTableColumnConfig {
    public readonly name = "registered_app_table_column_config";

    // Method to retrun records dummy data
    public static getDummyData = () => {
        return  [
            {
                id: 1,
                prefix: "ORG001",
                public_id: "pub-abc123",
                name: "Alpha Corp",
                description: "A leading tech company specializing in cloud solutions.",
                base_url: "https://alpha.example.com",
                logo_url: "https://cdn.example.com/logos/alpha.png",
                social_links: {
                twitter: "https://twitter.com/alphacorp",
                linkedin: "https://linkedin.com/company/alphacorp"
                },
                is_active: true,
                created_at: "2023-01-15T10:20:30Z",
                updated_at: "2023-07-01T12:00:00Z"
            },
            {
                id: 2,
                prefix: "ORG002",
                public_id: "pub-def456",
                name: "Beta Innovations",
                description: "Innovative solutions for modern industries.",
                base_url: "https://beta.example.com",
                logo_url: "https://cdn.example.com/logos/beta.png",
                social_links: {
                twitter: "https://twitter.com/betainnovations",
                linkedin: "https://linkedin.com/company/betainnovations"
                },
                is_active: false,
                created_at: "2022-11-10T08:15:00Z",
                updated_at: "2023-05-20T14:45:00Z"
            },
            {
                id: 3,
                prefix: "ORG003",
                public_id: "pub-ghi789",
                name: "Gamma Systems",
                description: "System integrators for enterprise clients.",
                base_url: "https://gamma.example.com",
                logo_url: "https://cdn.example.com/logos/gamma.png",
                social_links: {
                twitter: "https://twitter.com/gammasystems",
                linkedin: "https://linkedin.com/company/gammasystems"
                },
                is_active: true,
                created_at: "2023-03-05T16:30:10Z",
                updated_at: "2023-06-25T09:10:00Z"
            },
            {
                id: 4,
                prefix: "ORG004",
                public_id: "pub-jkl012",
                name: "Delta Works",
                description: "Creative design agency focused on branding.",
                base_url: "https://delta.example.com",
                logo_url: "https://cdn.example.com/logos/delta.png",
                social_links: {
                twitter: "https://twitter.com/deltaworks",
                linkedin: "https://linkedin.com/company/deltaworks"
                },
                is_active: true,
                created_at: "2023-02-20T11:00:00Z",
                updated_at: "2023-08-01T13:25:00Z"
            },
            {
                id: 5,
                prefix: "ORG005",
                public_id: "pub-mno345",
                name: "Epsilon Dynamics",
                description: "Data analytics and AI-driven insights.",
                base_url: "https://epsilon.example.com",
                logo_url: "https://cdn.example.com/logos/epsilon.png",
                social_links: {
                twitter: "https://twitter.com/epsilondynamics",
                linkedin: "https://linkedin.com/company/epsilondynamics"
                },
                is_active: false,
                created_at: "2022-09-12T07:45:00Z",
                updated_at: "2023-04-10T10:10:00Z"
            }
        ];
    }

    // Method to render registered app avatar ui props
    private static getImgAvatarUIProps (record: Record<string, any>): ImgAvatarUIPropsInterface {
        const { public_id, name, logo_url } = record;
        return BaseTableColumnConfig.getImgAvatarUIProps(`RegisteredApp-${record?.public_id}`, logo_url, name, public_id);
    }

    // Method to get is_active ui props
    private static getIsActiveUIProps (event_handler: BaseEventHandlerInterface, record: Record<string, any>): InputUIPropsInterface {
        const { public_id, is_active } = record;
        const is_active_boolean     = is_active ? true : false
        const switch_props          = BaseTableColumnConfig.geIsActiveSwitchProps(`record-switch-${public_id}`, is_active_boolean);
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

        const { name_text, base_url_text, is_active_text, created_at_text } = content_data;

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
                content_type: "component" as const,
                component: markRaw(ImgAvatarUI),
                component_props: this.getImgAvatarUIProps,
                wrapper_class_style: sortable_cell_wrapper_class_style,
                icon_class_style: sortable_icon_class_style,
                content_wrapper_class_style: sortable_cell_content_wrapper_class_style,
                col_class_style: "",
            },
            {
                label_content: base_url_text,
                sortable: true,
                sort_direction: "none" as SortDirectionType,
                on_sort,
                content_type: "formatted" as const,
                formatter: (value: any, record?: Record<string, any>) => { return InputTransformerUtil.formatURLToAnchorHtml(value, value); },
                field_key: "base_url",
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

        if(member_authenticator.canMemberAccess("change_registered_app_state", member_perm_key)) {
            columns_config.splice(2, 0, is_active_column_render);
        }

        // ✅ Update active sorted column
        const active_col = columns_config.find((col) => col.field_key === order_by);

        if (active_col) { active_col.sort_direction = order_direction; }

        return columns_config;
    }

}

export default RegisteredAppTableColumnConfig