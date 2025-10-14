
import { ref }                      from "vue";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import ButtonUI                     from "@ui/version_2/components/ButtonUI/button_ui.vue";
import MenuListUI                   from "@ui/version_2/components/NavigationUI/MenuListUI/menu_list_ui.vue";


class PaginationResultAndBulkActionSectionUIController extends BaseController {

    constructor(props: Record<string, any> = {}) {
        super("pagination_result_and_bulk_action_section_ui", props);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { ButtonUI, MenuListUI }; 
    }

}

export default PaginationResultAndBulkActionSectionUIController;