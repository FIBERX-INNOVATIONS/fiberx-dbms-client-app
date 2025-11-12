<template>
    <section id="RegisteredAppSchemaFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="schema_app_input_group_prop" />
            <InputGroupUI v-bind="schema_datasource_input_group_prop" />
            <InputGroupUI v-bind="model_name_input_group_prop" />
            <InputGroupUI v-bind="migration_priority_input_group_prop" />
            
            <div :class="props.columns_wrapper_class_style">

                <div :class="props.columns_header_class_style">
                    <span :class="props.columns_header_label_class_style">
                        {{ columns_label_text }}
                    </span>
                    <div :class="props.columns_header_add_btn_class_style">
                        <ButtonUI v-bind="add_columns_btn_props" />
                    </div>
                </div>

                <div v-if="columns_obj.length === 0" :class="props.columns_body_class_style">
                    <span>{{ no_columns_text }}</span>
                </div>

                <div v-for="(col, index) in columns_obj" :class="props.columns_body_class_style">
                    <!-- Column header -->
                    <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-700">Column {{ index + 1 }}</span>
                        <ButtonUI v-bind="controller.getObjectDeleteBtnProps(index, `columns_${index}`)" />
                    </div>
                    <!-- Column Fields -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        <InputGroupUI v-bind="controller.getObjectInputGroupProps(`columns.${index}.name`, col?.name)" />
                    </div>

                </div>
            
            </div>

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

const { InputGroupUI, ToastAlertUI, ButtonUI } = components;

const {
    columns_obj,
    schema_app_input_group_prop,
    schema_datasource_input_group_prop,
    model_name_input_group_prop,
    migration_priority_input_group_prop,
    columns_label_text,
    add_columns_btn_props,
    no_columns_text,
    
    toast_alert_props,
    btn_props
} = state_refs
</script>