import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { LOCAL_STORAGE_FIELDS }                 from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseListViewPropsBuilder                 from "@/base_classes/list_view/base_list_view_props_builder";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import PageTitleAndBreadcrumbSectionUI          from "@/ui_components/page_title_and_breadcrumb_section_ui/page_title_and_breadcrumb_section_ui.vue";
import SearchAndActionBtnSectionUI              from "@/ui_components/search_and_action_btn_section_ui/search_and_action_btn_section_ui.vue";
import PaginationResultAndBulkActionSectionUI   from "@/ui_components/pagination_result_and_bulk_action_section_ui/pagination_result_and_bulk_action_section_ui.vue";
import DataTableSectionUI                       from "@/ui_components/data_table_section_ui/data_table_section_ui.vue";
import PaginationUI                             from "@ui/version_2/components/NavigationUI/PaginationUI/pagination_ui.vue";

import { MenuListConfigInterface }              from "@/types/menu_list_config_type";
import { TableColumnConfigInterface }           from "@/types/table_column_config_type";
import { BaseEventHandlerInterface }            from "@ui/version_2/types/component_type";

import { 
    ButtonUIPropsInterface, 
    MenuListUIPropsInterface, 
    SortDirectionType 
} from "@ui/version_2/types/props_builder_type";

import { 
    NewRecordPayloadInterface, 
    RecordDeletedPayloadInterface, 
    RecordUpdatedPayloadInterface 
} from "@/types/app_event_type";



class BaseListViewController extends BaseController {
    public router;
    public member_auth_manager;
    public event_bus = EventBus;
    public content_field_key!: string;
    public record_id_key!: string;

    public bulk_action_btn_id!: string;
    public bulk_action_menu_id!: string;

    public event_handler: any;
    public service: any;

    public current_page = 1;
    public total_pages = 0;
    public total_items = 0;
    public size = 12;
    public order_by = "created_at";
    public order_direction: SortDirectionType = "desc";
    public keyword: string | null = null;
    public records: Record<string, any>[] = [];
    public selected_record: Record<string, any> | null = null;
    public selected_records: string[] | number[] = [];

    constructor(component_name: string, props: Record<string, any> = {}) {
        super(component_name, props);
        this.router                 = useRouter();
        this.member_auth_manager    = MemberAuthManagerUtil.getInstance();
    }

    // Subclasses must implement these methods or values
    protected getMenuListConfig(): MenuListConfigInterface { return {} as MenuListConfigInterface }

    protected getTableColumnConfig(): TableColumnConfigInterface { return {} as TableColumnConfigInterface }

    protected initializeDependencies(): void { return };

    protected getCustomUIStateData(): Record<string, any> { return {} }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> {
        return {
            PageTitleAndBreadcrumbSectionUI,
            SearchAndActionBtnSectionUI,
            PaginationResultAndBulkActionSectionUI,
            DataTableSectionUI,
            PaginationUI
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
            selected_records: (new_val) => {
                this.event_handler?.afterRecordSelected?.(new_val);
            },
            records: (new_val) => {
                this.event_handler?.updateTableBodyProps?.(new_val);
            },
            route: async (new_val, old_val) => {
                await this.event_handler.handleListViewProfileModalRouting();
            }
        };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {
        const custom_state_data = this.getCustomUIStateData();
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

            base_class_styles: BaseListViewPropsBuilder.getBaseClassStyle(),

            breadcrumb_props: BaseListViewPropsBuilder.getPageBreadCrumnProps(this.content_field_key),

            search_field_props: BaseListViewPropsBuilder.getPageSearchInputGroupProps(this.content_field_key, this.event_handler),

            form_action_btn_props: BaseListViewPropsBuilder.getFormActionBtnProps(this.content_field_key, this.event_handler),

            bulk_action_btn_props: BaseListViewPropsBuilder.getEllipsisBtnProps(this.bulk_action_btn_id, this.event_handler, false),

            bulk_action_dropdown_menu_props: BaseListViewPropsBuilder.getBulkActionMenuListProps(
                this.bulk_action_btn_id,
                this.bulk_action_menu_id,
                this.event_handler,
                this.content_field_key,
                this.getMenuListConfig()
            ),

            table_header_props: BaseListViewPropsBuilder.getDataTableHeaderProps(
                this.event_handler,
                this.content_field_key,
                this.getTableColumnConfig(),
                this.order_by,
                this.order_direction,
                this.records.length,
                this.selected_records
            ),

            table_body_props: BaseListViewPropsBuilder.getDataTableBodyProps(
                this.event_handler,
                this.content_field_key,
                this.getTableColumnConfig(),
                this.record_id_key,
                this.order_by,
                this.order_direction,
                this.records,
                this.selected_records
            ),

            pagination_props: BaseListViewPropsBuilder.getPaginationProps(this.event_handler, this.content_field_key),

            ...custom_state_data
        };
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAL_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAL_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }

        await this.event_handler.handleFetchRecords();

        await this.event_handler.handleListViewProfileModalRouting();

        this.event_bus.on("on_new_record_created", async (payload: NewRecordPayloadInterface) => {
            this.event_handler.handleOnNewRecordCreated(payload);
        });

        this.event_bus.on("on_record_updated", async (payload: RecordUpdatedPayloadInterface) => {
            this.event_handler.handleOnRecordUpdated(payload);
        });

        this.event_bus.on("on_record_deleted", async (payload: RecordDeletedPayloadInterface) => {
            this.event_handler.handleOnRecordDeleted(payload);
        });
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
            this.getMenuListConfig(), 
            record_index, 
            record
        );
    }
}

export default BaseListViewController;
