

import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import BaseListViewPropsBuilder         from "@/modules/dashboard_module/base_logic/base_list_view_props_builder";
import RegisteredAppTableColumnConfig   from "@/configs/columns_config/registered_app_table_column_config";
import { BaseControllerInterface }      from "@ui/version_2/types/component_type";
import { SortDirectionType }            from "@ui/version_2/types/props_builder_type";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class RegisteredAppEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;


    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager = ContentManagerUtil.getInstance();
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

    // Method to handle on table column sort
    public async handleOnColumnSort (event:MouseEvent, direction: SortDirectionType) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
        const [order_by, order_direction]           = direction.split("-");
        const { event_handler, content_field_key }  = this.controller
        const { 
            order_by: current_order_by,
            order_direction: current_order_direction,
            records
        } = this.controller.state_refs;

        console.log(`Sorting ${records.value.length} Record(s) by column ${order_by} in direction ${order_direction}`)

        if(!records.value || !records.value.length) { return }

        if(!event_handler || !order_by || !order_direction) { return }

        if(order_by === current_order_by.value && order_direction === current_order_direction.value ) { return }

        const new_data_table_header_props = BaseListViewPropsBuilder.getDataTableHeaderProps(event_handler, content_field_key, RegisteredAppTableColumnConfig, order_by, order_direction as SortDirectionType);
        Object.assign(this.controller.state_refs.data_table_header_props, new_data_table_header_props);
    }

    // Method to handle on record change of state
    public async handleOnRecordChnageState (event:MouseEvent | InputEvent) {
        console.log(`Changing state event ${event} this ${this}`);

        await sleep(2000);

        return true
    }
    

}

export default RegisteredAppEventHandler;