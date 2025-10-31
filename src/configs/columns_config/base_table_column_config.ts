
import { markRaw, reactive  }           from "vue";
import ClassStyles                      from "@/enums/class_styles.enums";
import RenderHtmlUtil                   from "@ui/version_2/utils/render_html_util";

import { 
    ImgAvatarUIPropsInterface, 
    InputUIPropsInterface 
} from "@ui/version_2/types/props_builder_type";


class BaseTableColumnConfig {
    public readonly name = "base_table_column_config";

    // Method to render avatar ui props
    public static getImgAvatarUIProps (
        record_id: string,
        logo_url: string,
        title_text: string,
        sub_title_text: string,
    ): ImgAvatarUIPropsInterface {
        const id                    = record_id;
        const class_styles          = ClassStyles?.table_img_avatar_ui ?? {};

        const { 
            wrapper_class_style, avatar_circle_class_style, img_class_style, 
            initials_class_style, right_slot_class_style, right_slot_wrapper_class_style,
            right_slot_title_text_class_style, right_slot_sub_title_class_style
        } = class_styles;

        const img_src               = logo_url;
        const img_alt_text          = `${title_text} App Name`;
        const initials              = `${title_text?.[0]} ${title_text?.[1]}`;

        const right_slot_content    = RenderHtmlUtil.renderTitleAndSubtitleHTML({ 
            title_text, sub_title_text, wrapper_class_style: right_slot_wrapper_class_style,
            title_class_style: right_slot_title_text_class_style, sub_title_class_style: right_slot_sub_title_class_style
        })

        return reactive({
            id, img_src, img_alt_text, initials, right_slot_content,
            wrapper_class_style, avatar_circle_class_style, img_class_style, initials_class_style,
            right_slot_class_style
        })
    }

    // Method to get is active toggle switch props
    public static geIsActiveSwitchProps (
        record_id: string,
        value: boolean,
        type: string = "switch"
    ): InputUIPropsInterface {
        const class_styles  = ClassStyles?.table_is_active_class_styles ?? {};
        const {
            wrapper_class_style,
            loader_class_style,
            switch_btn_class_style,
            active_class_style,
            inactive_class_style,
            knob_class_style,
            label_text_class_style,
        } = class_styles;

        const switch_btn_id     = record_id;
        const switch_input_id   = `record-switch-${record_id}`
        const loader_content    = RenderHtmlUtil.renderLoaderHtml({});

        return reactive({
            id: switch_input_id, switch_btn_id, value, type, loader_content, required: true, is_checked: value,
            wrapper_class_style, loader_class_style,
            switch_btn_class_style, active_class_style, inactive_class_style,
            knob_class_style, label_text_class_style,
        })

    }

}

export default BaseTableColumnConfig