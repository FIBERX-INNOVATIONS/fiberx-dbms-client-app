import { reactive  }            from "vue";
import ClassStyles              from "@/enums/class_styles.enums";
import ContentManagerUtil       from "@ui/version_2/utils/content_manager_util";

import { 
    AuthBgStylePropsInterface,
    CopyRightPropsinterface
} from "@/types/props_builder_type";

class DashboardBaseViewPropsBuilder {
    public readonly name = "dashboard_base_view_props_builder";
}

export default DashboardBaseViewPropsBuilder;