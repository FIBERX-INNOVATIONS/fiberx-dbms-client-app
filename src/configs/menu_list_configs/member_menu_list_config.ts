
import { reactive  }                    from "vue";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import SVGIcons                         from "@ui/version_2/resources/svg_icon_resource";

import { NavLinkUIPropsInterface }      from "@ui/version_2/types/props_builder_type";     
import { BaseEventHandlerInterface }    from "@ui/version_2/types/component_type";
import { LOCAL_STORAGE_FIELDS }         from "@/enums/constants.enums";
import MemberAuthManagerUtil            from "@ui/version_2/utils/member_auth_manager_util";


class MemberMenuListConfig {
    public readonly name = "member_menu_list_config";

    public static buildMenuItem (
        menu_id: string, 
        menu_text: string, 
        menu_link: string, 
        menu_icon_name?: keyof typeof SVGIcons,
        on_click?: (event: MouseEvent) => void
    ): NavLinkUIPropsInterface {
        const class_styles  = ClassStyles?.list_view_ui?.dropdown_menu_list_ui?.menu_list_item_ui ?? {}
        const icon              = menu_icon_name ? SVGIcons[menu_icon_name] : undefined;
        const icon_class_style = "";

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
        const can_member_bulk_delete    = member_authenticator.canMemberAccess("bulk_delete_member", LOCAL_STORAGE_FIELDS.MEMBER_PERMISSIONS_KEY)

        const menu_list: NavLinkUIPropsInterface[] = [];

        const { bulk_delete_menu_text, bulk_delete_menu_svg_icon } = content_data

        if(can_member_bulk_delete) {
            const on_click = event_handler?.handleBulkDeleteActionClick?.bind(event_handler);
            menu_list.push(
                this.buildMenuItem("BulkDeleteMembers", bulk_delete_menu_text, "", bulk_delete_menu_svg_icon, on_click)
            );

        }

       return reactive(menu_list);
    }

    public static getTableMenuList (
        event_handler: BaseEventHandlerInterface,
        content_field_key: string,
        record: Record<string, any>,
        record_index: Number
    ): NavLinkUIPropsInterface[] {
        const content_manager           = ContentManagerUtil.getInstance();
        const content_key               = content_field_key ? `content_resource.${content_field_key}.data_table.action_menu` : "content_resource.data_table.action_menu"
        const content_data              = content_manager?.get(content_key) ?? {};
        const member_authenticator      = MemberAuthManagerUtil.getInstance();
        const member_perm_key           = LOCAL_STORAGE_FIELDS.MEMBER_PERMISSIONS_KEY;
        const current_member_key        = LOCAL_STORAGE_FIELDS.MEMBER_KEY;
        const current_member            = member_authenticator.getCurrentMember(current_member_key);
        const is_super_admin            = current_member?.role_name === "SuperAdmin";
        const is_my_profile             = record?.public_id === current_member?.public_id;

        const { 
            view_menu_text, view_menu_svg_icon, select_menu_text, select_menu_svg_icon,
            edit_menu_text, edit_menu_svg_icon, delete_menu_text, delete_menu_svg_icon,
            view_2fa_menu_text, view_2fa_menu_svg_icon, view_activities_menu_text, view_activities_menu_svg_icon,
            reset_2fa_menu_text, reset_2fa_menu_svg_icon

        } = content_data;

        const view_menu_on_click    = (event: MouseEvent) => { return event_handler.handleOpenProfileModal.bind(event_handler)(event, record); }
        const view_menu             = this.buildMenuItem(`ViewMember-${record_index}`, view_menu_text, "", view_menu_svg_icon, view_menu_on_click);

        const select_menu_on_click  = (event: MouseEvent) => { return event_handler.handleOnRecordSelected.bind(event_handler)(event, record, true); }
        const select_menu           = this.buildMenuItem(`SelectMember-${record_index}`, select_menu_text, "", select_menu_svg_icon, select_menu_on_click);

        const menu_list: NavLinkUIPropsInterface[] = [view_menu, select_menu];

        if(member_authenticator.canMemberAccess("view_member_two_factor_info", member_perm_key) && (is_super_admin)) {
            const view_2fa_menu_on_click  = (event: MouseEvent) => { return event_handler.handleViewMember2FAInfo.bind(event_handler)(event, record);}
            const view_2fa_menu           = this.buildMenuItem(`ViewMember2FAInfo-${record_index}`, view_2fa_menu_text, "", view_2fa_menu_svg_icon, view_2fa_menu_on_click);

            menu_list.push(view_2fa_menu)
        }

        if(member_authenticator.canMemberAccess("view_member_two_factor_info", member_perm_key) && (is_super_admin && !is_my_profile)) {
            const reset_2fa_menu_on_click  = (event: MouseEvent) => { return event_handler.handleConfirmResetMember2FA.bind(event_handler)(event, record);}
            const reset_2fa_menu           = this.buildMenuItem(`ViewMember2FAInfo-${record_index}`, reset_2fa_menu_text, "", reset_2fa_menu_svg_icon, reset_2fa_menu_on_click);

            menu_list.push(reset_2fa_menu)
        }

        if(member_authenticator.canMemberAccess("view_member_activities", member_perm_key) && (is_super_admin || is_my_profile)) {
            const view_activities_menu_on_click  = (event: MouseEvent) => { return event_handler.handleViewMemberActivities.bind(event_handler)(event, record);}
            const view_activities_menu           = this.buildMenuItem(`ViewMemberActivities-${record_index}`, view_activities_menu_text, "", view_activities_menu_svg_icon, view_activities_menu_on_click);

            menu_list.push(view_activities_menu)
        }

        if(member_authenticator.canMemberAccess("update_member_profile", member_perm_key) && (is_super_admin || is_my_profile)) {
            const edit_menu_on_click  = (event: MouseEvent) => { return event_handler.handleOpenFormModal.bind(event_handler)(event, record);}
            const edit_menu           = this.buildMenuItem(`EditMember-${record_index}`, edit_menu_text, "", edit_menu_svg_icon, edit_menu_on_click);

            menu_list.push(edit_menu)
        }

        if(member_authenticator.canMemberAccess("delete_member_profile_record", member_perm_key) && (is_super_admin && !is_my_profile)) {
            const delete_menu_on_click  = (event: MouseEvent) => { return event_handler.handleConfirmDelete.bind(event_handler)(event, record); }
            const delete_menu           = this.buildMenuItem(`DeleteMember-${record_index}`, delete_menu_text, "", delete_menu_svg_icon, delete_menu_on_click);

            menu_list.push(delete_menu)
        }

        return reactive(menu_list)
    }
}

export default MemberMenuListConfig