import { reactive } from "vue";
import ClassStyles from "@/enums/class_styles.enums";
import RenderHtmlUtil from "@ui/version_2/utils/render_html_util";
import { ImgAvatarUIPropsInterface } from "@ui/version_2/types/props_builder_type";

class MemberProfileViewPropsBuilder {
    public static getImgAvatarUIProps(record: Record<string, any>): ImgAvatarUIPropsInterface {
        const id = "MemberProfileAvatar";

        if (!record?.public_id) { return { id }; }

        const class_styles = ClassStyles?.profile_img_avatar_ui ?? {};

        const {
            full_name: title_text,
            profile_photo_link: img_src,
            public_id: sub_title_text
        } = record;

        const {
            wrapper_class_style,
            avatar_circle_class_style,
            img_class_style,
            initials_class_style,
            right_slot_class_style,
            right_slot_wrapper_class_style,
            right_slot_title_text_class_style,
            right_slot_sub_title_class_style
        } = class_styles;

        const img_alt_text = `${title_text} Profile Photo`;
        const initials = `${title_text?.[0] ?? ""}${title_text?.[1] ?? ""}`;

        const right_slot_content = RenderHtmlUtil.renderTitleAndSubtitleHTML({
            title_text,
            sub_title_text,
            wrapper_class_style: right_slot_wrapper_class_style,
            title_class_style: right_slot_title_text_class_style,
            sub_title_class_style: right_slot_sub_title_class_style,
        });

        return reactive({
            id,
            img_src,
            img_alt_text,
            initials,
            right_slot_content,
            wrapper_class_style,
            avatar_circle_class_style,
            img_class_style,
            initials_class_style,
            right_slot_class_style,
        });
    }
}

export default MemberProfileViewPropsBuilder;
