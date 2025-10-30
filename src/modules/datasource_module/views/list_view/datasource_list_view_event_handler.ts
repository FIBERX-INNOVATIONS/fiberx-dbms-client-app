
import { markRaw }                      from "vue";
import ClassStyles                      from "@/enums/class_styles.enums";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import RenderHtmlUtil                   from "@ui/version_2/utils/render_html_util";
import SVGIcons                         from "@ui/version_2/resources/svg_icon_resource";
import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import BaseListViewPropsBuilder         from "@/modules/dashboard_module/base_logic/base_list_view_props_builder";
import DatasourceTableColumnConfig      from "@/configs/columns_config/datasource_table_column_config";
import DatasourceProfileView            from "@/modules/datasource_module/views/profile_view/datasource_profile_view.vue";
import DatasourceFormView               from "@/modules/datasource_module/views/form_view/datasource_form_view.vue";
import ConfirmActionUI                  from "@ui/version_2/components/confirm_action_ui/confirm_action_ui.vue";
import { SortDirectionType }            from "@ui/version_2/types/props_builder_type";
import { RequestQueryInputInterface }   from "@/types/api_service_type";
import { debounceMethod, sleep }        from "@ui/version_2/utils/debounce_util";
import { NON_INPUT_KEYS  }              from "@ui/version_2/enums/constants.enum";
import { 
    BaseControllerInterface,
    ListControllerAttributesInterface } from "@ui/version_2/types/component_type";
import { 
    NewRecordPayloadInterface,
    OpenNewModalPayloadInterface, 
    RecordDeletedPayloadInterface, 
    RecordUpdatedPayloadInterface, 
    StatusPayloadOptionsInterface }     from "@/types/app_event_type";


class DatasourceListViewEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;
    private status_alert_options: StatusPayloadOptionsInterface;
    private debouncedFetchRecords: () => Promise<void>;
    private records_initially_fetched: boolean


    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager            = ContentManagerUtil.getInstance();
        this.status_alert_options       = { duration: 3000, close_modal: true };
        this.debouncedFetchRecords      = debounceMethod(this.handleFetchRecords.bind(this), 2000);
        this.records_initially_fetched  = false
    }

    // Method to update controller attributes
    private updateControllerAttributes (updated_attr: ListControllerAttributesInterface): boolean {
        const { 
            current_page, records, total_items, total_pages, selected_record, 
            order_by, order_direction, keyword, selected_records
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

        if(Array.isArray(selected_records)) {
            this.controller.selected_records = selected_records;
            this.controller.state_refs.selected_records.value = selected_records;
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
        this.handleOpenFormModal(event, {});
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
        this.logger.log(`Bulk Delete button clicked`)
    }

    // Method to handle on record selected
    public async afterRecordSelected (updated_array: string[]) {
        const { 
            state_refs, bulk_action_btn_id, bulk_action_menu_id, content_field_key,
            order_by, order_direction, records, record_id_key
        } = this.controller;

        const { bulk_action_btn_props } = state_refs;

        const btn_is_hidden     = bulk_action_btn_props?.btn_class_style.includes("hidden");
        const should_show       = updated_array.length > 0;
        const content_manager   = ContentManagerUtil.getInstance();
        const content_data      = content_manager?.get(`content_resource.${content_field_key}.bulk_action_menu`) ?? {};
        const btn_text          = content_data?.selected_row_counter_text.replace("%", updated_array.length);

        const new_bulk_action_btn_props = BaseListViewPropsBuilder.getEllipsisBtnProps(bulk_action_btn_id, this, should_show, btn_text);
        const new_table_header_props    = BaseListViewPropsBuilder.getDataTableHeaderProps(this, content_field_key, DatasourceTableColumnConfig, order_by, order_direction, records.length, updated_array);
        const new_table_body_props      = BaseListViewPropsBuilder.getDataTableBodyProps(this, content_field_key, DatasourceTableColumnConfig, record_id_key, order_by, order_direction, records, updated_array);

        Object.assign(this.controller.state_refs.bulk_action_btn_props, new_bulk_action_btn_props);
        Object.assign(this.controller.state_refs.table_header_props, new_table_header_props);
        Object.assign(this.controller.state_refs.table_body_props, new_table_body_props);
    }

    // Method to handle update table body props
    public async updateTableBodyProps (updated_array: Record<string, any>[]) {
        const { state_refs, content_field_key, order_by, order_direction, record_id_key } = this.controller;

        if(!Array.isArray(updated_array)) { return }

        const new_table_body_props = BaseListViewPropsBuilder.getDataTableBodyProps(
            this, 
            content_field_key, 
            DatasourceTableColumnConfig, 
            record_id_key,
            order_by, 
            order_direction, 
            updated_array,
            state_refs.selected_records.value
        );

        Object.assign(this.controller.state_refs.table_body_props, new_table_body_props); 
    }

    // Method to handle on search input 
    public async handleOnSearchInput (event: KeyboardEvent, search_input: string) {
        const pressed_key = event.key;

        // List of keys we don’t want to trigger fetch
        if (NON_INPUT_KEYS.includes(pressed_key)) { return; }

        const previous_keyword  = this.controller.keyword ?? "";
        const new_keyword       = search_input.trim();
        const is_deleting       = pressed_key === "Backspace" || pressed_key === "Delete";

        // Case 1: if there was no text before and user presses Backspace/Delete → do nothing
        if (!previous_keyword.length && is_deleting && !new_keyword.length) { return; }

        // Case 2: update controller keyword
        this.controller.state_refs.is_loading.value = true
        this.updateControllerAttributes({ keyword: new_keyword, current_page: 1 })

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
                records,
                size,
                selected_records
            } = this.controller.state_refs;

            if(!records.value || !records.value.length) { return }

            if(!event_handler || !order_by || !order_direction) { return }

            if(order_by === current_order_by.value && order_direction === current_order_direction.value ) { return }

            const new_table_header_props = BaseListViewPropsBuilder.getDataTableHeaderProps(
                event_handler, 
                content_field_key, 
                DatasourceTableColumnConfig, 
                order_by, order_direction as SortDirectionType,
                records.value.length,
                selected_records.value
            );
    
            Object.assign(this.controller.state_refs.table_header_props, new_table_header_props);

            const _order_direction  = order_direction as SortDirectionType;
            const updated           = this.updateControllerAttributes({ order_by, order_direction: _order_direction });

            if(updated) { await this.debouncedFetchRecords(); }
        }
        catch(error: unknown) {
            this.logger.error(`Failed to sort and fetch records`, { error })
        }
        finally { this.controller.state_refs.is_loading.value = false }
    }

    // Method to handle on record selected 
    public async handleOnRecordSelected (event: Event | InputEvent, record: Record<string, any>, checked: boolean) {
        const { record_id_key, selected_records } = this.controller;

        if (!record_id_key || !Array.isArray(selected_records)) { return; }

        const record_value          = record?.[record_id_key];

        if (!record_value) { return; }

        let new_selected_records    = [...selected_records];

        if (checked && !new_selected_records.includes(record_value)) { 
            new_selected_records.push(record_value); 
        } 

        else if (!checked) {
            new_selected_records = new_selected_records.filter( (id) => id !== record_value);  
        }

        this.updateControllerAttributes({ selected_records: new_selected_records });
    }

    // Method to ahndle on all records selected
    public async handleOnAllRecordsSelected (event: Event | InputEvent, checked: boolean) {
        const { record_id_key, selected_records, records } = this.controller;

        if (!Array.isArray(records) || !records.length || !record_id_key) { return; }

        let new_selected_records    = [...selected_records];

        if(!records.length) { return }

        if (checked) {  
            new_selected_records = records
            .map((obj: Record<string, any>) => obj?.[record_id_key])
            .filter((id: any) => id !== undefined && id !== null);
        }
        else { new_selected_records = []; }

        this.updateControllerAttributes({ selected_records: new_selected_records });
    }

    // Method to handle on new record created
    public async handleOnNewRecordCreated (payload: NewRecordPayloadInterface) {
        const { record } = payload;
        const { total_items = 0, total_pages = 0, size = 12, records = [], current_page } = this.controller;

        if(current_page > 1) { return;  }

        // 🟩 1. Add the new record to the top of the records array,
        //  Increment total_items (total count of records in database)
        // Recalculate total_pages based on size
        const updated_records       = [record, ...records];
        const updated_total_items   = (total_items ?? 0) + 1;
        const updated_total_pages   = Math.ceil(updated_total_items / size);

        // 🟨 2. If we exceed the page size, remove the last record (FIFO behavior)
        if (updated_records.length > size.value) { updated_records.pop(); }

        this.updateControllerAttributes({ records: updated_records, total_items: updated_total_items, total_pages: updated_total_pages })
        this.logger.log("✅ New record added:", record);
        this.logger.log("📊 Updated pagination:", {
            total_items: total_items,
            total_pages: total_pages,
            current_records_length: records.length,
        });
    }

    // Method to handle on update a record in records
    public async handleOnRecordUpdated (payload: RecordUpdatedPayloadInterface) {
        const { record, record_id }             = payload;
        const { record_id_key, records = [] }   = this.controller;
        const record_to_update_index            = records.findIndex(
            (obj: Record<string, any>) => { return obj[record_id_key] === record_id }
        );

        if(record_to_update_index < 0) { return }

        const existing_record   = records[record_to_update_index];
        const updated_record    = { ...existing_record, ...record };
        const updated_records   = [...records];

        updated_records[record_to_update_index] = updated_record

        this.updateControllerAttributes({ records: updated_records });
        this.logger.log("✅ Record updated successfully:", { record_id, updated_record });
    }

    // Method to handle on record change of state
    public async handleOnRecordChangeState (event:MouseEvent | InputEvent, new_state_value: boolean): Promise<boolean> {
        await sleep(2000);
        try {
            const target        = event.target as HTMLInputElement | HTMLTextAreaElement | null;
            const record_id     = target?.id;

            if(!record_id) { return false }

            const { s_state, s_msg, s_data, logout }    = await this.controller.service?.executeChangeRecordState?.(Number(record_id));

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(s_msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(logout) { return await this.controller.router.push("/logout"); }

            else if(!s_state) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            const payload = { record_id, record: { is_active: new_state_value } };
            this.controller.event_bus.emit("on_record_updated",  payload);
            return true
        }
        catch(error: unknown) {
            return false
        }
    }

    // Method to handle on delete record in recods
    public async handleOnRecordDeleted (payload: RecordDeletedPayloadInterface) {
        const { record_id } = payload;
        const { record_id_key, records = [], total_items = 0, total_pages = 0, size = 12 } = this.controller;

        // 🟩 Find the index of the record to delete
        const record_index = records.findIndex((obj: Record<string, any>) => obj[record_id_key] === record_id);

        if (record_index < 0) {
            this.logger.warn(`⚠️ Record with ID '${record_id}' not found.`);
            return;
        }

        // 🔴 Remove record completely from array and Recalculate total items and pages
        const updated_records       = records.filter((obj: Record<string, any>) => obj[record_id_key] !== record_id);
        const updated_total_items   = Math.max(total_items - 1, 0);
        const updated_total_pages   = Math.ceil(updated_total_items / size);

        // 🟥 Update controller attributes
        this.updateControllerAttributes({ records: updated_records, total_items: updated_total_items, total_pages: updated_total_pages });

        this.logger.log("🗑️ Deleted record successfully:", record_id);
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

            this.updateControllerAttributes({ current_page, records, total_items, total_pages })
            
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
    
    // Method to handle on page change
    public async handleOnPageChange (event:MouseEvent | InputEvent, new_page_value: number): Promise<boolean> {
        try {
            if(!new_page_value || !Number.isInteger(new_page_value) || new_page_value <= 0) { return false }

            this.updateControllerAttributes({ current_page: new_page_value });

            await this.handleFetchRecords();

            return true
        }
        catch(error: unknown) { return false }
    }

    // Method to handle delete confim
    public async handleConfirmDelete (event: Event | InputEvent, record: Record<string, any> = {}) {
        try {

            if(record.is_active) { return };

            const class_styles = ClassStyles.confirm_action_ui;
            const content_data = this.content_manager?.get("content_resource.datasource_view_ui.confirm_delete_modal");

            const { title_text, question_text, cancel_btn_text, confirm_btn_text }    = content_data;
            const { 
                wrapper_class_style, 
                content_text_wrapper_class_style, 
                content_class_style, 
                action_btn_wrapper_class_style,
                cancel_action_btn_ui,
                confirm_action_btn_ui
            } = class_styles

            const cancel_btn_class_style        = cancel_action_btn_ui.content_class_style;
            const cancel_btn_icon_class_style   = cancel_action_btn_ui.icon_class_style;
            const confirm_btn_class_style       = confirm_action_btn_ui.content_class_style;
            const confirm_btn_icon_class_style  = cancel_action_btn_ui.icon_class_style
            const title_content                 = title_text;
            const question_content              = question_text.replace("%", record?.name);
            const component                     = markRaw(ConfirmActionUI);
            const cancel_btn_content            = RenderHtmlUtil.renderHtml({ text: cancel_btn_text, icon: SVGIcons.delete_trash_svg_icon, class_style: cancel_btn_class_style, icon_class_style: cancel_btn_icon_class_style});
            const confirm_btn_content           = RenderHtmlUtil.renderHtml({ text: confirm_btn_text, icon: SVGIcons.check_circle_svg_icon, class_style: confirm_btn_class_style, icon_class_style: confirm_btn_icon_class_style });
            const on_cancel_click               = (event: MouseEvent) => { this.controller.event_bus.emit("close_modal", {}); };
            const on_confirm_click              = (event: MouseEvent) => { this.handleDeleteARecord(event, record ); }
            const component_props       = { 
                question_text: question_content, confirm_btn_content, cancel_btn_content,
                wrapper_class_style, content_text_wrapper_class_style, content_class_style, 
                action_btn_wrapper_class_style, on_cancel_click, on_confirm_click
            };

            const open_modal_payload: OpenNewModalPayloadInterface = {
                position: "center", width_class: "w-lg", title_content,
                component, component_props, 
            }
            this.controller.event_bus.emit("open_new_modal", open_modal_payload);
        }
        catch(error: unknown) {
            const formatted_api_msg     = this.content_manager?.getAPIResponseValue("app_record_not_found");
            const status_alert_payload  = { status: "error", message: formatted_api_msg, options: this.status_alert_options };
            this.controller.event_bus.emit("statusChanged", status_alert_payload);
        }
    }

    // Method to handle opening registered app profile modal
    public async handleOpenProfileModal (event: Event | InputEvent, record: Record<string, any>) {
        try {
            const content_data      = this.content_manager?.get("content_resource.datasource_view_ui.app_profile");
            const { title_text }    = content_data;
            const title_content     = title_text.replace("%", record?.name);
            const component         = markRaw(DatasourceProfileView);
            const component_props   = { record };

            const open_modal_payload: OpenNewModalPayloadInterface = {
                position: "center", width_class: "w-lg", title_content,
                component, component_props
            }
            this.controller.event_bus.emit("open_new_modal", open_modal_payload);
        }
        catch(error: unknown) {
            const formatted_api_msg     = this.content_manager?.getAPIResponseValue("app_record_not_found");
            const status_alert_payload  = { status: "error", message: formatted_api_msg, options: this.status_alert_options };
            this.controller.event_bus.emit("statusChanged", status_alert_payload);
        }

    }

    // Method to handle opening registered app form modal
    public async handleOpenFormModal (event: Event | InputEvent, record: Record<string, any> = {}) {
        try {
            const content_data = this.content_manager?.get("content_resource.datasource_view_ui.datasource_form");

            const { new_app_title_text, edit_app_title_text }  = content_data;

            const title_content     = record?.name ? edit_app_title_text.replace("%", record?.name) : new_app_title_text;
            const component         = markRaw(DatasourceFormView);
            const component_props   = { record };

            const open_modal_payload: OpenNewModalPayloadInterface = {
                position: "center", width_class: "w-lg", title_content,
                component, component_props
            }
            this.controller.event_bus.emit("open_new_modal", open_modal_payload);
        }
        catch(error: unknown) {
            const formatted_api_msg     = this.content_manager?.getAPIResponseValue("form_open_failed_refresh_page");
            const status_alert_payload  = { status: "error", message: formatted_api_msg, options: { duration: 0 } };
            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            return;
        }
    }

    // Method to handle login submit btn click
    public async handleDeleteARecord (event: MouseEvent | InputEvent, record: Record<string, any> = {}) {
        if(record.is_active) { return };

        try {
            const { record_id_key }     = this.controller;
            const record_id             = record?.[record_id_key];
            const event_name            = "on_record_deleted";
            const status_alert_payload  = { status: "error", message: "", options: this.status_alert_options };

            if(!record_id) {
                status_alert_payload.message = this.content_manager?.getAPIResponseValue("app_record_not_found");
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            if(!this.controller?.service) { return }

            const { s_state, s_msg, logout } = await this.controller.service?.executeDeleteDatasource(record_id);

            if(logout) { return await this.controller.router.push("/logout"); }

            if(!s_state) {
                status_alert_payload.message = this.content_manager?.getAPIResponseValue(s_msg);
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            status_alert_payload.status     = "success";
            status_alert_payload.message    = this.content_manager?.getAPIResponseValue(s_msg);
            const event_payload             = { record_id };

            this.controller.event_bus.emit("statusChanged", status_alert_payload);
            this.controller.event_bus.emit(event_name, event_payload);
            return;
        }
        catch(error: unknown) {
            this.logger.error(`Failed to delete a record`, { error })
        }
    }

}

export default DatasourceListViewEventHandler;