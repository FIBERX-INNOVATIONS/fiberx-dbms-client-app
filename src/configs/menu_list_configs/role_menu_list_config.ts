
import { reactive  }                    from "vue";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";
import SVGIcons                         from "@ui/version_2/resources/svg_icon_resource";
import RolePermissionsView              from "@/modules/member_module/views/activity_view/member_activity_view.vue"

import { NavLinkUIPropsInterface }      from "@ui/version_2/types/props_builder_type";     
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import { LOCAL_STORAGE_FIELDS }         from "@/enums/constants.enums";
import {  RoleRecordInterface }         from "@/types/api_service_type";


class RoleMenuListConfig {
    public readonly name = "access_control_menu_list_config";

    public static buildMenuItem (
        menu_id: string, 
        menu_text: string, 
        menu_link: string, 
        menu_icon_name?: keyof typeof SVGIcons,
        on_click?: (event: MouseEvent) => void
    ): NavLinkUIPropsInterface {
        const class_styles      = ClassStyles?.list_view_ui?.dropdown_menu_list_ui?.menu_list_item_ui ?? {}
        const icon              = menu_icon_name ? SVGIcons[menu_icon_name] : undefined;
        const icon_class_style  = "";

        return reactive({
            id: menu_id, link: menu_link, icon, content: menu_text, on_click,
            ...class_styles,
        })
    }

    public static getBulkActionMenuList (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string
    ): NavLinkUIPropsInterface[] {
        const content_manager           = ContentManagerUtil.getInstance();
        const content_key               = content_field_key ? `content_resource.${content_field_key}.bulk_action_menu` : "content_resource.bulk_action_menu"
        const content_data              = content_manager?.get(content_key) ?? {};
        const member_authenticator      = MemberAuthManagerUtil.getInstance();
        const can_member_bulk_delete    = member_authenticator.canMemberAccess("bulk_delete_role_access", LOCAL_STORAGE_FIELDS.MEMBER_PERMISSIONS_KEY)

        const menu_list: NavLinkUIPropsInterface[] = [];

        const { bulk_delete_menu_text, bulk_delete_menu_svg_icon } = content_data

        if(can_member_bulk_delete) {
            const on_click = event_handler?.handleBulkDeleteActionClick?.bind(event_handler);
            menu_list.push(
                this.buildMenuItem("BulkDeleteRole", bulk_delete_menu_text, "", bulk_delete_menu_svg_icon, on_click)
            );

        }

       return reactive(menu_list);
    }

    public static getTableMenuList (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        record: RoleRecordInterface,
        record_index: Number
    ): NavLinkUIPropsInterface[] {
        const content_manager           = ContentManagerUtil.getInstance();
        const content_key               = content_field_key ? `content_resource.${content_field_key}.data_table.action_menu` : "content_resource.data_table.action_menu"
        const content_data              = content_manager?.get(content_key) ?? {};
        const member_authenticator      = MemberAuthManagerUtil.getInstance();
        const member_perm_key           = LOCAL_STORAGE_FIELDS.MEMBER_PERMISSIONS_KEY;

        const { 
            view_menu_text, view_menu_svg_icon, select_menu_text, select_menu_svg_icon,
            view_permissions_menu_text, view_permissions_menu_svg_icon,
        } = content_data;

        const view_menu_on_click    = (event: MouseEvent) => { return event_handler.handleOpenProfileModal.bind(event_handler)(event, record); }
        const view_menu             = this.buildMenuItem(`ViewRoleProfile${record_index}`, view_menu_text, "", view_menu_svg_icon, view_menu_on_click);

        const select_menu_on_click  = (event: MouseEvent) => { return event_handler.handleOnRecordSelected.bind(event_handler)(event, record, true); }
        const select_menu           = this.buildMenuItem(`SelectRoleProfile-${record_index}`, select_menu_text, "", select_menu_svg_icon, select_menu_on_click);

        const menu_list: NavLinkUIPropsInterface[] = [view_menu, select_menu];

        if(member_authenticator.canMemberAccess("view_role_assigned_permissions", member_perm_key)) {
            const view_permissions_menu_on_click  = (event: MouseEvent) => { return event_handler.handleOpenModalForCustomView.bind(event_handler)(event, record, "permissions_view", RolePermissionsView ); }
            const view_permissions_menu           = this.buildMenuItem(`ViewRolePermissions-${record_index}`, view_permissions_menu_text, "", view_permissions_menu_svg_icon, view_permissions_menu_on_click);

            menu_list.push(view_permissions_menu)
        }

        return reactive(menu_list)
    }
}

export default RoleMenuListConfig