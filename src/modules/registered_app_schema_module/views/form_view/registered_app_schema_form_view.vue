<template>
    <section id="RegisteredAppSchemaFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="schema_app_input_group_prop" />
            <InputGroupUI v-bind="schema_datasource_input_group_prop" />
            <InputGroupUI v-bind="model_name_input_group_prop" />
            <InputGroupUI v-bind="migration_priority_input_group_prop" />

            <SchemaDesignerUI 
                :columns_defintion="columns_array"
                :indexes_definition="indexes"
                :content_data="schema_designer_content_data"
            />

            <ToastAlertUI v-bind="toast_alert_props" />
            <ButtonUI v-bind="btn_props" />
        </form>
    </section>
</template>


<script setup lang="ts">
import RegisteredAppSchemaFormViewProps       from "./registered_app_schema_form_view_props";
import RegisteredAppSchemaFormViewController  from "./registered_app_schema_form_view_controller";

const props            = defineProps(RegisteredAppSchemaFormViewProps);
const controller       = new RegisteredAppSchemaFormViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { InputGroupUI, ToastAlertUI, ButtonUI, SchemaDesignerUI } = components;

const {
    columns_array,
    indexes,
    schema_designer_content_data,
    schema_app_input_group_prop,
    schema_datasource_input_group_prop,
    model_name_input_group_prop,
    migration_priority_input_group_prop,
    toast_alert_props,
    btn_props
} = state_refs
</script>