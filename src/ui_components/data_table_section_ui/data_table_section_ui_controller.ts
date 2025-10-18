
import { ref }                      from "vue";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import DataTableUI                  from "@ui/version_2/components/TableUI/DataTableUI/data_table_ui.vue";
import ButtonUI                     from "@ui/version_2/components/ButtonUI/button_ui.vue";
import MenuListUI                   from "@ui/version_2/components/NavigationUI/MenuListUI/menu_list_ui.vue";

class DataTableSectionUIController extends BaseController {

    constructor(props: Record<string, any> = {}) {
        super("data_table_section_ui", props);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { DataTableUI, ButtonUI, MenuListUI }; 
    }

}

export default DataTableSectionUIController;