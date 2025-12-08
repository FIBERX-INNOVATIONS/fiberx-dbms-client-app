

import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import ContentManagerUtil               from "@ui/version_2/utils/content_manager_util";
import { debounceMethod, sleep }        from "@ui/version_2/utils/debounce_util";
import { NON_INPUT_KEYS  }              from "@ui/version_2/enums/constants.enum";

import { RequestQueryInputInterface }   from "@/types/validation_type";

import { 
    StatusPayloadOptionsInterface,
} from "@/types/app_event_type";

import { 
    BaseControllerInterface, 
    ListControllerAttributesInterface 
} from "@ui/version_2/types/component_type";


class MemberActivityViewUIEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    protected status_alert_options: StatusPayloadOptionsInterface;
    protected records_initially_fetched = false;
    protected debouncedFetchRecords: () => Promise<void>;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager                = ContentManagerUtil.getInstance();
        this.status_alert_options           = { duration: 3000, close_modal: true };
        this.debouncedFetchRecords          = debounceMethod(this.handleFetchMmeberActivities.bind(this), 2000);
    }

    // Method to update controller attributes
    public updateControllerAttributes (updated_attr: ListControllerAttributesInterface): boolean {
        const { 
            current_page, records, total_items, total_pages, 
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

        if(typeof keyword === "string" || keyword === null) {
            this.controller.keyword = keyword
            this.controller.state_refs.keyword.value = keyword;
        }

        return true;
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
        if (new_keyword.length > 0 || (previous_keyword.length > 0 && new_keyword.length === 0)) {
            await this.debouncedFetchRecords();
        }
    }

    // Method to handle fetch member activities
    public async handleFetchMmeberActivities () {
        this.controller.state_refs.is_loading.value = true;
        try {
            if(!this.controller?.service) { return }

            const { record } = this.controller.props;

            const { current_page: page, size, order_by, order_direction, keyword = null, preview_only = false,  } = this.controller;
            
            const params: RequestQueryInputInterface  = { page, size, order_by, order_direction, keyword, preview_only }

            const { s_state, s_msg, s_data, logout }    = await this.controller.service?.executeFetchMemberActivities?.(record?.public_id, params);

            const formatted_api_msg     = this.content_manager?.getAPIResponseValue(s_msg);
            const status_alert_payload  = { status: "", message: formatted_api_msg, options: this.status_alert_options };

            if(logout) { return await this.controller.router.push("/logout"); }

            else if(!s_state) {
                status_alert_payload.status = "error";
                return this.controller.event_bus.emit("statusChanged", status_alert_payload);
            }

            const { current_page, records, total_items, total_pages } = s_data;

            this.updateControllerAttributes({ current_page, records, total_items, total_pages })
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

            await this.handleFetchMmeberActivities();

            return true
        }
        catch(error: unknown) { return false }
    }

}

export default MemberActivityViewUIEventHandler;