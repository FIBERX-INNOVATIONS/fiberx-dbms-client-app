
import { ref }                      from "vue";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import BreadCrumbUI                 from "@ui/version_2/components/NavigationUI/BreadCrumbUI/bread_crumb_ui.vue";

class PageTitleAndBreadcrumbSectionUIController extends BaseController {

    constructor(props: Record<string, any> = {}) {
        super("page_title_and_breadcrumb_section_ui", props);
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { BreadCrumbUI }; 
    }

}

export default PageTitleAndBreadcrumbSectionUIController;