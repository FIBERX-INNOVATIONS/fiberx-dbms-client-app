<template>
    <section :class="props.list_data_action_section_class_style">
        <div :class="props.grid_1_wrapper_class_style">
            <span :class="props.pagination_summary_class_style" v-html="props.pagination_summary_text"></span>
        </div>
       
        <div :class="props.grid_2_wrapper_class_style">
            <ButtonUI v-bind="props.bulk_action_btn_props" />
            <MenuListUI v-bind="props.bulk_action_menu_list_props" />
        </div>
        
    </section>
</template>

<script setup lang="ts">
import PaginationResultAndBulkActionSectionUIProps            from "./pagination_result_and_bulk_action_section_ui_props";
import PaginationResultAndBulkActionSectionUIController       from "./pagination_result_and_bulk_action_section_ui_controller";

const props             = defineProps(PaginationResultAndBulkActionSectionUIProps);
const controller        = new PaginationResultAndBulkActionSectionUIController(props);
const { components }    = controller.getComponentDefinition();

const { ButtonUI, MenuListUI } = components
</script>