import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAT_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { ButtonUIPropsInterface, MenuListUIPropsInterface, SortDirectionType }                    from "@ui/version_2/types/props_builder_type";
import BaseListViewPropsBuilder                 from "@/modules/dashboard_module/base_logic/base_list_view_props_builder";
import RegisteredAppEventHandler                from "@/modules/registered_app_module/base_logic/registered_app_event_handler";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import PageTitleAndBreadcrumbSectionUI          from "@/ui_components/page_title_and_breadcrumb_section_ui/page_title_and_breadcrumb_section_ui.vue";
import SearchAndActionBtnSectionUI              from "@/ui_components/search_and_action_btn_section_ui/search_and_action_btn_section_ui.vue";
import PaginationResultAndBulkActionSectionUI   from "@/ui_components/pagination_result_and_bulk_action_section_ui/pagination_result_and_bulk_action_section_ui.vue";
import DataTableSectionUI                       from "@/ui_components/data_table_section_ui/data_table_section_ui.vue";
import RegisteredAppMenuListConfig              from "@/configs/menu_list_configs/registered_app_menu_list_config";
import RegisteredAppTableColumnConfig           from "@/configs/columns_config/registered_app_table_column_config";



class RegisteredAppListViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public content_field_key: string;
    public event_handler: RegisteredAppEventHandler;
    public bulk_action_btn_id: string;
    public bulk_action_menu_id: string;
    public current_page: number;
    public total_pages: number;
    public total_items: number;
    public size: number;
    public order_by: string;
    public order_direction: SortDirectionType;
    public keyword: string | null | undefined;
    public records: Record<string, any>[];
    public selected_record: Record<string, any> | null;


    constructor(props: Record<string, any> = {}) {
        super("registered_app_list_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.event_handler              = new RegisteredAppEventHandler(this);
        this.content_field_key          = "registered_app_view_ui";
        this.bulk_action_btn_id         = "RegisteredAppBulkActionBtn";
        this.bulk_action_menu_id        = "RegisteredAppBulkActionMenu";
        this.current_page               = 1;
        this.total_pages                = 0;
        this.total_items                = 0;
        this.size                       = 12;
        this.order_by                   = "created_at"; 
        this.order_direction            = "desc";
        this.keyword                    = null;
        this.records                    = RegisteredAppTableColumnConfig.getDummyData();
        this.selected_record            = null
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { 
            PageTitleAndBreadcrumbSectionUI,
            SearchAndActionBtnSectionUI,
            PaginationResultAndBulkActionSectionUI,
            DataTableSectionUI
        }; 
    }

    // Method to get ui computed data
    protected getUIComputedData(): Record<string, () => any> { 
        return {
            header_text: () => { return BaseListViewPropsBuilder.getHeaderText(this.content_field_key) },

            pagination_result_text: () => { 
                const { current_page, total_pages, total_items, size  } = this.state_refs;
                return BaseListViewPropsBuilder.getPaginationResultProps(this.content_field_key, current_page.value, total_pages.value, total_items.value, size.value) 
            }
        }; 
    }

    // Method to get ui watchers
    protected getUIWatchers(): Record<string, (new_val: any, old_val: any) => void> { 
        return {
            selected_records: (new_val, old_val) => { 
                this.event_handler?.onRecordSelected?.(new_val);
            }
        }; 
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {        
        return {
            current_page: ref(this.current_page), size: (this.size),
            
            total_pages: ref(this.total_pages),  total_items: (this.total_items), 
            
            order_by: ref(this.order_by), order_direction: ref(this.order_direction), 

            records: ref(this.records), selected_records: ref([]), is_loading: ref(false),

            base_class_styles: BaseListViewPropsBuilder.getBaseClassStyle(),

            breadcrumb_props: BaseListViewPropsBuilder.getPageBreadCrumnProps(this.content_field_key),

            search_field_props: BaseListViewPropsBuilder.getPageSearchInputGroupProps(this.content_field_key, this.event_handler),

            form_action_btn_props: BaseListViewPropsBuilder.getFormActionBtnProps(this.content_field_key, this.event_handler),

            bulk_action_btn_props: BaseListViewPropsBuilder.getEllipsisBtnProps(this.bulk_action_btn_id, this.event_handler, true),

            bulk_action_dropdown_menu_props: BaseListViewPropsBuilder.getBulkActionMenuListProps(this.bulk_action_btn_id, this.bulk_action_menu_id, this.event_handler, this.content_field_key, RegisteredAppMenuListConfig),

            table_header_props: BaseListViewPropsBuilder.getDataTableHeaderProps(this.event_handler, this.content_field_key, RegisteredAppTableColumnConfig, this.order_by, this.order_direction),

            table_body_props: BaseListViewPropsBuilder.getDataTableBodyProps(this.event_handler, this.content_field_key, RegisteredAppTableColumnConfig, this.order_by, this.order_direction, this.records),
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }

        // setInterval(() => {
        //     const timestamp = new Date().toISOString();
        //     this.state_refs.selected_records.value.push(`New item added at ${timestamp}`);
        //     console.log("Updated Array:", this.state_refs.selected_records.value);

        //     this.state_refs.total_items.value = 24;
        //     this.state_refs.total_pages.value = 2;
        // }, 10000); 
    }

    // Method to get table action btn props
    public getTableActionBtnProps = (record_index: Number, record: Record<string, any>): ButtonUIPropsInterface => { 
        return BaseListViewPropsBuilder.getTableActionBtnProps(this.event_handler, record_index, record);
    }

    // Method to get table menu list props
    public getTableRecordMenuListProps = (record_index: Number, record: Record<string, any>): MenuListUIPropsInterface => { 
        return BaseListViewPropsBuilder.getDataTableMenuListProps(
            this.event_handler, 
            this.content_field_key, 
            RegisteredAppMenuListConfig, 
            record_index, 
            record
        );
    }
}

export default RegisteredAppListViewController;