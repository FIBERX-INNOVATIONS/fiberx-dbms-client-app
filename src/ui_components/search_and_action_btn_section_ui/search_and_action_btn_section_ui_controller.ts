
import { ref }                      from "vue";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import SearchFieldUI                from "@ui/version_2/components/SearchFieldUI/search_field_ui.vue";
import ButtonUI                     from "@ui/version_2/components/ButtonUI/button_ui.vue";


class SearchAndActionBtnSectionUIController extends BaseController {

    constructor(props: Record<string, any> = {}) {
        super("search_and_action_btn_section_ui", props);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { SearchFieldUI, ButtonUI }; 
    }

}

export default SearchAndActionBtnSectionUIController;