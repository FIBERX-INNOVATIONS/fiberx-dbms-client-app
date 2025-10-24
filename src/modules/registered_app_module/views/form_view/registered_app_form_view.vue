<template>
    <section id="RegisteredAppFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="app_name_input_group_prop" />
            <InputGroupUI v-bind="app_prefix_input_group_prop" />
            <InputGroupUI v-bind="app_base_url_input_group_prop" />
            <InputGroupUI v-bind="app_logo_url_input_group_prop" /> 
            <InputGroupUI v-bind="app_description_input_group_prop" /> 
            <div :class="props.social_links_wrapper_class_style">
                <div :class="props.social_links_header_class_style">
                    <span :class="props.social_links_header_label_class_style">
                        {{ social_links_label_text }}
                    </span>
                    <div :class="props.social_links_header_add_btn_class_style">
                        <ButtonUI v-bind="add_social_link_props" />
                    </div>
                </div>
                <div
                    v-for="([link_id, link_value], index) in Object.entries(
                        (social_links_obj as Record<string, { key: string; url_value: string; is_deleted?: boolean }>)
                    ).filter(([_, value]) => !value.is_deleted)"
                    :key="link_id"
                    :class="props.social_links_body_class_stle"
                >
                
                    <!-- Link Name Input -->
                    <div :class="props.social_links_body_link_name_class_style">
                        <InputGroupUI
                            v-bind="controller.getSocialLinkInputGroupProps(`social_links_key_${index}`, link_value?.key)"
                        />
                    </div>

                    <!-- Link URL Input -->
                    <div :class="props.social_links_body_link_value_class_style">
                        <InputGroupUI
                            v-bind="controller.getSocialLinkInputGroupProps(`social_links_value_${index}`, link_value?.url_value)"
                        />
                    </div>

                    <!-- Remove Button -->
                    <div :class="props.social_links_body_delete_btn_class_style">
                        <ButtonUI
                            v-bind="controller.getDeleteSocialLinkBtnProps(link_id, `social_links_key_${index}`)"
                        />
                    </div>

                </div>
            </div>
            <ToastAlertUI v-bind="toast_alert_props" />
            <ButtonUI v-bind="btn_props" />
        </form>
    </section>
</template>


<script setup lang="ts">
import RegisteredAppFormViewProps       from "./registered_app_form_view_props";
import RegisteredAppFormViewController  from "./registered_app_form_view_controller";

const props            = defineProps(RegisteredAppFormViewProps);
const controller       = new RegisteredAppFormViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const {  InputGroupUI, ToastAlertUI, ButtonUI  } = components;

const {
    social_links_obj,
    app_name_input_group_prop, 
    app_prefix_input_group_prop, 
    app_base_url_input_group_prop, 
    app_logo_url_input_group_prop, 
    social_links_label_text,
    app_description_input_group_prop,
    add_social_link_props,
    toast_alert_props,
    btn_props
} = state_refs
</script>