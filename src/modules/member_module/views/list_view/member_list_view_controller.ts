import BaseListViewController               from "@/base_classes/list_view/base_list_view_controller";
import MemberListViewEventHandler           from "@/modules/member_module/views/list_view/member_list_view_event_handler";
import MemberMenuListConfig                 from "@/configs/menu_list_configs/member_menu_list_config";
import MemberTableColumnConfig              from "@/configs/table_column_config/member_table_column_config";
import MemberUIService                    from "@/modules/member_module/base_logic/member_ui_service";


class MemberListViewController extends BaseListViewController {
    constructor(props: Record<string, any> = {}) {
        super("member_list_view", props);
        this.initializeDependencies();
    }

    protected getMenuListConfig() { return MemberMenuListConfig; }

    protected getTableColumnConfig() { return MemberTableColumnConfig; }

    protected initializeDependencies(): void {
        this.event_handler          = new MemberListViewEventHandler(this);
        this.service                = new MemberUIService(this);
        this.content_field_key      = "member_view_ui";
        this.record_id_key          = "public_id";
        this.bulk_action_btn_id     = "MemberBulkActionBtn";
        this.bulk_action_menu_id    = "MemberBulkActionMenu";
    }
}

export default MemberListViewController;