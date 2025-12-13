<template>
    <section id="RegisteredAppFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="app_name_input_group_prop" />
            <InputGroupUI v-bind="app_prefix_input_group_prop" />
            <InputGroupUI v-bind="app_base_url_input_group_prop" />
            <InputGroupUI v-bind="app_logo_url_input_group_prop" /> 
            <InputGroupUI v-bind="app_description_input_group_prop" /> 

            <div :class="props.object_section_wrapper_class_style">
                <!-- Object header -->
                <div :class="props.object_section_header_class_style">
                    <span :class="props.object_section_header_label_text_class_style">
                        {{ social_links_label_text }}
                    </span>
                    <div :class="props.object_section_header_add_btn_class_style">
                        <ButtonUI v-bind="add_social_link_btn_props" />
                    </div>
                </div>

                <!-- Object body -->
                <div v-if="social_links_array.length === 0" :class="props.object_section_body_class_style">
                    <span>{{ no_info_text }}</span>
                </div>

                <div v-for="(conn, index) in social_links_array" :class="props.object_section_body_class_style">
                    <div :class="props.object_section_body_row_class_style">
                        <span :class="props.object_section_body_row_label_text_class_style">
                            {{ social_links_label_text }} {{ index + 1 }}
                        </span>
                        <ButtonUI v-bind="controller.getObjectDeleteBtnProps(index, `social_links_array.${index}`)" />
                    </div>

                    <div :class="props.object_section_body_row_class_style">
                        <div :class="props.object_body_key_class_style">
                            <InputGroupUI v-bind="controller.getObjectInputGroupProps(`social_links_array.${index}.key`, conn?.key)" />
                        </div>

                        <div :class="props.object_body_value_class_style">
                            <InputGroupUI v-bind="controller.getObjectInputGroupProps(`social_links_array.${index}.value`, conn?.value)" />
                        </div>
                    </div>

                </div>
            </div>

            <InputGroupUI v-bind="app_urls_input_group_prop" /> 

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
    social_links_array,
    no_info_text,
    app_name_input_group_prop, 
    app_prefix_input_group_prop, 
    app_base_url_input_group_prop, 
    app_logo_url_input_group_prop, 
    social_links_label_text,
    app_description_input_group_prop,
    add_social_link_btn_props,
    app_urls_input_group_prop,
    toast_alert_props,
    btn_props
} = state_refs
</script>