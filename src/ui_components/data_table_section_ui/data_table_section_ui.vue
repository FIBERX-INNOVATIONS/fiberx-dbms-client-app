<template>
    <DataTableUI
        :table_id="props.table_id"

        :is_loading="props.is_loading"

        :number_of_loading_bars="props.number_of_loading_bars"

        :header_props="props.header_props"

        :body_props="props.body_props"

        :wrapper_class_style="props.wrapper_class_style"

        :table_class_style="props.table_class_style"

        :lg_table_wrapper_class_style="props.lg_table_wrapper_class_style"
    >
        <template #actions="{ record, record_index }">
            <ButtonUI v-bind="props.action_btn_props_method(record_index, record)" />
            <MenuListUI v-bind="props.action_menu_list_props_method(record_index, record)" />
        </template>
    </DataTableUI>

</template>

<script setup lang="ts">
import DataTableSectionUIProps            from "./data_table_section_ui_props";
import DataTableSectionUIController       from "./data_table_section_ui_controller";

const props             = defineProps(DataTableSectionUIProps);
const controller        = new DataTableSectionUIController(props);
const { components }    = controller.getComponentDefinition();

const { DataTableUI, ButtonUI, MenuListUI } = components
</script>