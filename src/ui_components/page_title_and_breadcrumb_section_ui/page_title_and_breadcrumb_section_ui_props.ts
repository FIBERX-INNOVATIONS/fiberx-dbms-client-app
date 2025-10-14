import { PropType } from "vue";

import ClassStyles  from "@/enums/class_styles.enums";

import { BreadCrumbUIPropsInterface } from "@ui/version_2/types/props_builder_type";

const PageTitleAndBreadcrumbSectionUIProps   = {
    header_text_class_style: { type: String, default: "", required: false },

    header_text: { type: String, default: "", required: false },

    breadcrumb_props: { type: Object as PropType<BreadCrumbUIPropsInterface>, required: true },

}

export default PageTitleAndBreadcrumbSectionUIProps;