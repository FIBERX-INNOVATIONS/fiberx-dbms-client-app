<template>
    <section :class="props.list_data_action_section_class_style">
        <div v-if="props.search_field_props" :class="props.grid_1_wrapper_class_style">
            <SearchFieldUI v-bind="props.search_field_props" />
        </div>

        <div v-if="props.form_action_btn_props" :class="props.grid_2_wrapper_class_style">
            <ButtonUI v-bind="props.form_action_btn_props" />
        </div>

        <div v-if="props.select_filter_input_props" :class="props.grid_1_wrapper_class_style">
            <InputGroupUI  v-bind="props.select_filter_input_props" />
        </div>

    </section>
</template>

<script setup lang="ts">
import SearchAndActionBtnSectionUIProps            from "./search_and_action_btn_section_ui_props";
import SearchAndActionBtnSectionUIController       from "./search_and_action_btn_section_ui_controller";

const props             = defineProps(SearchAndActionBtnSectionUIProps);
const controller        = new SearchAndActionBtnSectionUIController(props);
const { components }    = controller.getComponentDefinition();

const { SearchFieldUI, ButtonUI, InputGroupUI } = components
</script>