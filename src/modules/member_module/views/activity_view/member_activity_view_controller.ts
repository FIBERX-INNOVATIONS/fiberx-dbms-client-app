import { ref, }                             from "vue";
import BaseProfileViewController            from "@/base_classes/profile_view/base_profile_view_controller";
import MemberActivityViewEventHandler       from "./member_activity_view_event_handler";
import MemberUIService                      from "@/modules/member_module/base_logic/member_ui_service";
import BaseListViewPropsBuilder             from "@/base_classes/list_view/base_list_view_props_builder";
import ListLoaderUI                         from "@ui/version_2/components/LoaderUI/ListLoaderUI/list_loader_ui.vue";
import SearchFieldUI                        from "@ui/version_2/components/SearchFieldUI/search_field_ui.vue";
import PaginationUI                         from "@ui/version_2/components/NavigationUI/PaginationUI/pagination_ui.vue";
import ActivityListUI                       from "@ui/version_2/components/ActivityListUI/activity_list_ui.vue";


import { 
    SortDirectionType 
} from "@ui/version_2/types/props_builder_type";



class MemberActivityViewController extends BaseProfileViewController {
    public service: MemberUIService;
    public event_handler: MemberActivityViewEventHandler;

    public current_page = 1;
    public total_pages = 0;
    public total_items = 0;
    public size = 30;
    public order_by = "created_at";
    public order_direction: SortDirectionType = "desc";
    public keyword: string | null = null;
    public records: Record<string, any>[] = [];

    constructor(props: Record<string, any> = {}) {
        super("member_activity_view", props);

        this.content_field_key              = "member_view_ui";
        this.content_component_field_key    = "activity_view";
        this.service                        = new MemberUIService(this);
        this.event_handler                  = new MemberActivityViewEventHandler(this);
    }

    // Method to get custom child compnents
    protected getCustomChildComponents(): Record<string, any> { 
        return { ListLoaderUI, SearchFieldUI, PaginationUI, ActivityListUI } 
    }

    // Method to get custom child compnents
    protected getCustomChildUIStateData(): Record<string, any> { 
        return {
            current_page: ref(this.current_page), 

            size: ref(this.size), 

            keyword: ref(this.keyword),
            
            total_pages: ref(this.total_pages),  
            
            total_items: ref (this.total_items), 
            
            order_by: ref(this.order_by), 
            
            order_direction: ref(this.order_direction), 

            records: ref(this.records), 
            
            is_loading: ref(true),

            search_field_props: BaseListViewPropsBuilder.getPageSearchInputGroupProps(this.content_field_key, this.event_handler, this.content_component_field_key),

            pagination_props: BaseListViewPropsBuilder.getPaginationProps(this.event_handler, this.content_field_key),

        } 
    }

    // Method to handle child mounted logic
    protected async getHandleChildMountedLogic (): Promise<void>  {
        await this.event_handler.handleFetchMmeberActivities();
    }

}

export default MemberActivityViewController;
