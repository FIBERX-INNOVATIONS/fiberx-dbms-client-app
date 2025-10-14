
import BreadCrumbUI                     from "@ui/version_2/components/NavigationUI/BreadCrumbUI/bread_crumb_ui.vue";
import ButtonUI                         from "@ui/version_2/components/ButtonUI/button_ui.vue";
import SearchFieldUI                    from "@ui/version_2/components/SearchFieldUI/search_field_ui.vue";

class BaseListViewComponents {
    public readonly name = "base_list_view_components";

    // Method to get ui components
    public static getUIComponents(): Record<string, any> { 
        return  { BreadCrumbUI, ButtonUI, SearchFieldUI }; 
    }
}

export default BaseListViewComponents;