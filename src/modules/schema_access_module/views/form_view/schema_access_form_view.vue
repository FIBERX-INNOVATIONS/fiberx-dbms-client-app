<template>
    <section id="SchemaAccessFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="schema_app_input_group_prop" />

            <SchemaAccessDesignerUI 
                :app_public_id="app_public_id"
                :schema_access_definition="schema_access_array"
                :content_data="schema_designer_content_data"
            />

            <ToastAlertUI v-bind="toast_alert_props" />
            <ButtonUI v-bind="btn_props" />
        </form>
    </section>
</template>


<script setup lang="ts">
import SchemaAccessFormViewProps       from "./schema_access_form_view_props";
import SchemaAccessFormViewController  from "./schema_access_form_view_controller";

const props            = defineProps(SchemaAccessFormViewProps);
const controller       = new SchemaAccessFormViewController(props)

const { state_refs, components} = controller.getComponentDefinition();

const { InputGroupUI, ToastAlertUI, ButtonUI, SchemaAccessDesignerUI } = components;

const {
    app_public_id,
    schema_designer_content_data,
    schema_app_input_group_prop,
    schema_access_array,
    toast_alert_props,
    btn_props
} = state_refs
</script>