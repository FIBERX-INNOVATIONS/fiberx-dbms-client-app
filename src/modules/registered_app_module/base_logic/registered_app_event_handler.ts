

import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import BaseListViewPropsBuilder         from "@/modules/dashboard_module/base_logic/base_list_view_props_builder";
import RegisteredAppTableColumnConfig   from "@/configs/columns_config/registered_app_table_column_config";
import { 
    BaseControllerInterface,
    ListControllerAttributesInterface } from "@ui/version_2/types/component_type";
import { SortDirectionType }            from "@ui/version_2/types/props_builder_type";
import { RequestQueryInputInterface }   from "@/types/api_service_type";
import { StatusPayloadOptionsInterface }from "@/types/app_event_type";
import { debounceMethod }               from "@ui/version_2/utils/debounce_util";
import { NON_INPUT_KEYS  }              from "@ui/version_2/enums/constants.enum";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class RegisteredAppEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;
    private status_alert_options: StatusPayloadOptionsInterface;
    private debouncedFetchRecords: () => Promise<void>;
    private records_initially_fetched: boolean


    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager            = ContentManagerUtil.getInstance();
        this.status_alert_options       = { duration: 3000 };
        this.debouncedFetchRecords      = debounceMethod(this.handleFetchRecords.bind(this), 2000);
        this.records_initially_fetched  = false
    }

    // Method to update controller attributes
    private updatecontrollerAttributes (updated_attr: ListControllerAttributesInterface): boolean {
        const { 
            current_page, records, total_items, total_pages, selected_record, 
            order_by, order_direction, keyword
        } = updated_attr;

        if(Number.isInteger(current_page)) {
            this.controller.current_page = current_page
            this.controller.state_refs.current_page.value = current_page;
        }

        if(Number.isInteger(total_items)) {
            this.controller.total_items = total_items
            this.controller.state_refs.total_items.value = total_items;
        }

        if(Number.isInteger(total_pages)) {
            this.controller.total_pages = total_pages
            this.controller.state_refs.total_pages.value = total_pages;
        }

        if(selected_record && Object.keys(selected_record).length) {
            this.controller.selected_record = selected_record
            this.controller.state_refs.selected_record.value = selected_record;
        }

        if(Array.isArray(records)) {
            this.controller.records = records
            this.controller.state_refs.records.value = records;
        }

        if(order_by) {
            this.controller.order_by = order_by
            this.controller.state_refs.order_by.value = order_by;
        }

        if(order_direction && ["asc", "desc"].includes(order_direction.toLowerCase())) {
            this.controller.order_direction = order_direction
            this.controller.state_refs.order_direction.value = order_direction;
        }

        if(keyword) {
            this.controller.keyword = keyword
            this.controller.state_refs.keyword.value = keyword;
        }

        return true

    }

    // method to hide menu on outside click
    private handleOutsideClick = (
        event: MouseEvent,
        record?: Record<string, any>,
        record_index?: Number
    ) => {
        const trigger_id            = record ? `TableActionBtn_${record_index}` : this.controller?.bulk_action_btn_id;
        const menu_list_id          = record ? `TableActionMenu_${record_index}` : this.controller?.bulk_action_menu_id;
        const trigger_el            = document.getElementById(trigger_id);
        const menu_list_el          = document.getElementById(menu_list_id);

        if (!trigger_el || !menu_list_el) { return; }

        const clicked_element = event.target as HTMLElement;

        // If click was *outside* both trigger and menu → hide dropdown
        if (!menu_list_el.contains(clicked_element) && !trigger_el.contains(clicked_element)) {
            menu_list_el.classList.add("hidden");
            document.removeEventListener("click", this.handleOutsideClick);
        }
    };

    // Method to handle form action btn click
    public async handleFormActionBtnClick (event: MouseEvent) {
        console.log(`Form button clicked`)
    }

    // Method to handle toggling ellipsis dropdown
    public async toggleEllipsisDropdown (
        event: MouseEvent, 
        record?: Record<string, any>,
        record_index?: Number
    ) {
        const trigger_id            = record ? `TableActionBtn_${record_index}` : this.controller?.bulk_action_btn_id;
        const menu_list_id          = record ? `TableActionMenu_${record_index}` : this.controller?.bulk_action_menu_id;
        const trigger_el            = document.getElementById(trigger_id);
        const menu_list_el          = document.getElementById(menu_list_id);
        const outside_click_method  = (event: MouseEvent) => { this.handleOutsideClick(event, record, record_index); }

        if(!trigger_el || !menu_list_el) { return }

        const is_visible = (menu_list_el.classList.contains("hidden") === false);

        if(is_visible) {
            menu_list_el.classList.add("hidden");
            document.removeEventListener("click", outside_click_method as any);
            return;
        }

        menu_list_el.classList.remove("hidden");

        if(record && Object.keys(record).length) { this.controller.selected_record = record }

        // Delay the listener slightly to avoid immediately closing on this click
        setTimeout(() => {
            document.addEventListener("click", outside_click_method as any);
        }, 0);
    }

    // Method to handle toggling ellipsis dropdown
    public async handleBulkDeleteActionClick (event: MouseEvent) {
        console.log(`Bulk Delete button clicked`)
    }

    // Method to handle on record selected
    public async onRecordSelected (updated_array: string[]) {
        const { 
            state_refs, bulk_action_btn_id, bulk_action_menu_id,content_field_key
        } = this.controller;

        const { bulk_action_btn_props } = state_refs;

        const btn_is_hidden     = bulk_action_btn_props?.btn_class_style.includes("hidden");
        const is_empty          = updated_array.length <= 0;
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get(`content_resource.${content_field_key}.bulk_action_menu`) ?? {};
        const btn_text          = content_data?.selected_row_counter_text.replace("%", updated_array.length);

        if(!is_empty) {
            const new_bulk_action_btn_props = BaseListViewPropsBuilder.getEllipsisBtnProps(bulk_action_btn_id, this, true, btn_text);

            Object.assign(this.controller.state_refs.bulk_action_btn_props, new_bulk_action_btn_props);
        }
    }

    // Method to handle on record selected
    public async onRecordUpdated (updated_array: Record<string, any>[]) {
        const { state_refs, content_field_key, order_by, order_direction } = this.controller;

        if(!Array.isArray(updated_array)) { return }

        const new_table_body_props = BaseListViewPropsBuilder.getDataTableBodyProps(this, content_field_key, RegisteredAppTableColumnConfig, order_by, order_direction, updated_array);

        Object.assign(this.controller.state_refs.table_body_props, new_table_body_props);
        
    }

    // Method to handle on search input 
    public async handleOnSearchInput (event: KeyboardEvent, search_input: string) {
        const pressed_key = event.key;

        // List of keys we don’t want to trigger fetch
        if (NON_INPUT_KEYS.includes(pressed_key)) return;

        const previous_keyword  = this.controller.keyword ?? "";
        const new_keyword       = search_input.trim();
        const is_deleting        = pressed_key === "Backspace" || pressed_key === "Delete";

        // Case 1: if there was no text before and user presses Backspace/Delete → do nothing
        if (!previous_keyword.length && is_deleting && !new_keyword.length) { return; }

        // Case 2: update controller keyword
        this.controller.state_refs.is_loading.value = true
        this.updatecontrollerAttributes({ keyword: new_keyword, current_page: 1 })

        // Case 3: only fetch when user types something or clears previous text
        if (new_keyword.length > 0 || (is_deleting && previous_keyword.length > 0 && new_keyword.length === 0)) {
            await this.debouncedFetchRecords();
        }
    }

    // Method to handle on table column sort
    public async handleOnColumnSort (event:MouseEvent, direction: SortDirectionType) {
        this.controller.state_refs.is_loading.value = true;
        try {
            const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
            const [order_by, order_direction]           = direction.split("-");
            const { event_handler, content_field_key }  = this.controller
            const { 
                order_by: current_order_by,
                order_direction: current_order_direction,
                records
            } = this.controller.state_refs;

            if(!records.value || !records.value.length) { return }

            if(!event_handler || !order_by || !order_direction) { return }

            if(order_by === current_order_by.value && order_direction === current_order_direction.value ) { return }

            const new_table_header_props = BaseListViewPropsBuilder.getDataTableHeaderProps(event_handler, content_field_key, RegisteredAppTableColumnConfig, order_by, order_direction as SortDirectionType);
    
            Object.assign(this.controller.state_refs.table_header_props, new_table_header_props);

            const _order_direction  = order_direction as SortDirectionType;
            const updated           = this.updatecontrollerAttributes({ order_by, order_direction: _order_direction });

            if(updated) { await this.debouncedFetchRecords(); }
        }
        catch(error: unknown) {
            this.logger.error(`Failed to sort and fetch records`, { error })
        }
        finally { this.controller.state_refs.is_loading.value = false }
    }

    // Method to handle on record change of state
    public async handleOnRecordChangeState (event:MouseEvent | InputEvent) {
        console.log(`Changing state event ${event} this ${this}`);

        await sleep(2000);

        return true
    }

    // Method to handle fetching of records
    public async handleFetchRecords () {
        this.controller.state_refs.is_loading.value = true;
        try {
            if(!this.controller?.service) { return }

            const { current_page: page, size, order_by, order_direction, keyword = null, preview_only = false } = this.controller;

            const params  = { page, size, order_by, order_direction, keyword, preview_only }

            const { s_state, s_msg, s_data, logout }    = await this.controller.service?.executeFetchRecords?.(params as RequestQueryInputInterface);

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(s_msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(logout) { return await this.controller.router.push("/logout"); }

            else if(!s_state) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            const { current_page, records, total_items, total_pages } = s_data;

            this.updatecontrollerAttributes({ current_page, records, total_items, total_pages })
            
            if(!this.records_initially_fetched) {
                status_alert_payload.status = "success";
                this.controller.event_bus.emit("statusChanged", status_alert_payload);
                this.records_initially_fetched = true;
            }
            
        }
        catch(error: unknown) {
            this.logger.error(`Failed to fetch records`, { error })
        }
        finally { this.controller.state_refs.is_loading.value = false }
    }
    

}

export default RegisteredAppEventHandler;