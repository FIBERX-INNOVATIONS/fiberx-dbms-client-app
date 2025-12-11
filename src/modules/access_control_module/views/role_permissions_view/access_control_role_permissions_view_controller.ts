import { ref, }                                     from "vue";
import BaseListViewPropsBuilder                     from "@/base_classes/list_view/base_list_view_props_builder";
import ContentManagerUtil                           from "@ui/version_2/utils/content_manager_util";
import BaseListViewController                       from "@/base_classes/list_view/base_list_view_controller";
import AccessControlRolePermissionsViewEventHandler from "./access_control_role_permissions_view_event_handler";
import AccessControlUIService                       from "@/modules/access_control_module/base_logic/access_control_ui_service";
import ListLoaderUI                                 from "@ui/version_2/components/LoaderUI/ListLoaderUI/list_loader_ui.vue";
import SearchFieldUI                                from "@ui/version_2/components/SearchFieldUI/search_field_ui.vue";
import ButtonUI                                     from "@ui/version_2/components/ButtonUI/button_ui.vue";
import PaginationResultAndBulkActionSectionUI       from "@/ui_components/pagination_result_and_bulk_action_section_ui/pagination_result_and_bulk_action_section_ui.vue";
import PaginationUI                                 from "@ui/version_2/components/NavigationUI/PaginationUI/pagination_ui.vue";
import ActivityListUI                               from "@ui/version_2/components/ActivityListUI/activity_list_ui.vue";





class AccessControlRolePermissionsViewController extends BaseListViewController {
    public content_manager: ContentManagerUtil;

    constructor(props: Record<string, any> = {}) {
        super("access_control_role_permissions_view", props);

        this.initializeDependencies();
        this.content_manager = ContentManagerUtil.getInstance();
    }
 
    protected initializeDependencies(): void {
        this.event_handler                  = new AccessControlRolePermissionsViewEventHandler(this);
        this.service                        = new AccessControlUIService(this);
        this.content_field_key              = "access_control_view_ui";
        this.content_component_field_key    = "role_permissions_view_ui";
        this.record_id_key                  = "id";
        this.bulk_action_btn_id             = "AccessControlRolePermissionsListBulkActionBtn";
        this.bulk_action_menu_id            = "AccessControlRolePermissionsListBulkActionMenu";
    }

    // Method to get custom child compnents
    protected getUIComponents(): Record<string, any> { 
        return { 
            ListLoaderUI, 
            SearchFieldUI, 
            ButtonUI,
            PaginationResultAndBulkActionSectionUI,
            PaginationUI, 
            ActivityListUI 
        } 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {
        return {
            current_page: ref(this.current_page), 

            size: ref(this.size), 

            keyword: ref(this.keyword),
            
            total_pages: ref(this.total_pages),  
            
            total_items: ref (this.total_items), 
            
            order_by: ref(this.order_by), 
            
            order_direction: ref(this.order_direction), 

            records: ref(this.records), 
            
            selected_records: ref(this.selected_records), 
            
            is_loading: ref(false),

            content_data: this.content_manager.get(`content_resource.${this.content_field_key}.${this.content_component_field_key}`),

            search_field_props: BaseListViewPropsBuilder.getPageSearchInputGroupProps(this.content_field_key, this.event_handler, this.content_component_field_key),

            bulk_action_btn_props: BaseListViewPropsBuilder.getEllipsisBtnProps(this.bulk_action_btn_id, this.event_handler, false),

            bulk_action_dropdown_menu_props: BaseListViewPropsBuilder.getBulkActionMenuListProps(
                this.bulk_action_btn_id,
                this.bulk_action_menu_id,
                this.event_handler,
                this.content_field_key,
                this.getMenuListConfig()
            ),

            form_action_btn_props: BaseListViewPropsBuilder.getFormActionBtnProps(this.content_field_key, this.event_handler, false, true, "role_permissions_view_ui"),

            activity_list_props: this.event_handler.handleBuildActivityListProps(),

            pagination_props: BaseListViewPropsBuilder.getPaginationProps(this.event_handler, this.content_field_key),
        };
    }

}

export default AccessControlRolePermissionsViewController;
