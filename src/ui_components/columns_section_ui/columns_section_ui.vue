<template>
    <section :class="props.section_wrapper_class_style">
        <div :class="props.header_section_wrapper_class_style">
            <h2 :class="props.header_section_label_class_style">
                {{ props.content_data?.columns_label_text }}
            </h2>
            <ButtonUI v-bind="add_column_btn_props" />
        </div>

        <div v-if="columns_model.length === 0" :class="props.body_section_wrapper_class_style">
            <span :class="props.body_section_label_class_style">
                {{ props.content_data?.no_columns_text }}
            </span>
        </div>

        <div v-for="(col, i) in columns_model" :key="col.id" :class="props.body_section_wrapper_class_style">
            <div :class="props.body_section_row_header_wrapper_class_style">
                <span :class="props.body_section_row_header_label_class_style">
                    {{ props.content_data?.columns_label_text }} {{ i + 1 }}
                </span>
                <ButtonUI v-bind="delete_column_btn_props(event_handler, `${i}`, null)" />
            </div>

            <!-- Name & Type -->
            <div :class="props.body_section_row_body_responsive_grid_3_class_style">
                <!-- name input -->
                <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.name`, col.name, 'text', false, col, event_methods())" />
                <!-- type input -->
                <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.type.name`, col?.type?.name, 'select', false, col, event_methods('select'), { options: COLUMN_NAME_TYPE_OPTIONS })" />
                <!-- Length, Variant, Precision, etc -->
                <template v-if="showLength(col.type.name)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.type.length`, col?.type?.length, 'number', false, col, event_methods('number'), { min: 100 })" />
                </template>

                <template v-else-if="showVariant(col.type.name)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.type.variant`, col?.type?.variant, 'select', false, col, event_methods('select'), { options: COLUMN_TYPE_VARIANT_OPTIONS })" />
                </template>

                <template v-else-if="showPrecision(col.type.name)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.type.precision`, col?.type?.precision, 'number', false, col, event_methods('number'), { min: 1 })" />

                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.type.scale`, col?.type?.scale, 'number', false, col, event_methods('number'), { min: 0 })" />
                </template>

                <template v-else-if="showValues(col.type.name)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.type.values`, col?.type?.values, 'text', false, col, event_methods('text'))" />
                </template>
            </div>

            <!-- Default & On Update -->
            <div :class="props.body_section_row_body_responsive_grid_2_class_style">
                <!-- default -->
                <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.default`, col?.default, 'text', false, col, event_methods())" />
                <!-- on_update -->
                <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.on_update`, col?.on_update, 'text', false, col, event_methods())" />
            </div>

            <!-- References -->
            <details :class="props.body_section_row_body_details_wrapper_class_style">
                <summary :class="props.body_section_row_body_summary_wrapper_class_style">
                    {{ props.content_data?.references_table_section_text }}
                </summary>
                <div :class="props.body_section_row_body_responsive_grid_3_class_style">
                    <!-- reference table name -->
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.references.table`, col?.references?.table, 'text', false, col, event_methods())" />
                    <!-- Reference table column name -->
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.references.column`, col?.references?.column, 'text', false, col, event_methods())" />
                    <!-- Reference table on delete action -->
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.references.on_delete`, col?.references?.on_delete, 'select', false, col, event_methods('select'), { options: REFERENCE_TABLE_ACTIONS })" />
                    <!-- Reference table on update action -->
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.references.on_update`, col?.references?.on_update, 'select', false, col, event_methods('select'), { options: REFERENCE_TABLE_ACTIONS })" />
                </div>
            </details>

            <!-- Flags -->
            <!-- <div class="flex flex-wrap gap-4 pt-2"> -->
            <div :class="props.body_section_row_body_responsive_grid_3_class_style">
                <!-- nullable -->
                <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.nullable`, col?.nullable, 'checkbox', false, col, event_methods('checkbox'))" />
                <!-- is unique -->
                <template v-if="showUnique(col)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.unique`, col?.unique, 'checkbox', false, col, event_methods('checkbox'))" />
                </template>
                <!-- is primary key -->
                <template v-if="showPrimaryKey(i)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.primary_key`, col?.primary_key, 'checkbox', false, col, event_methods('checkbox'))" />
                </template>
                
                <!-- auto increment -->
                <template v-if="showAutoIncrement(col?.type?.name)">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `columns_array.${i}.auto_increment`, col?.auto_increment, 'checkbox', false, col, event_methods('checkbox'))" />
                </template>
            </div>

        </div>

    </section>

</template>

<script setup lang="ts">
import ColumnsSectionUIProps       from "./columns_section_ui_props";
import ColumnsSectionUIController  from "./columns_section_ui_controller";

import { 
    COLUMN_NAME_TYPE_OPTIONS,
    COLUMN_TYPE_VARIANT_OPTIONS,
    REFERENCE_TABLE_ACTIONS
} from "@/enums/constants.enums";

const props            = defineProps(ColumnsSectionUIProps);
const controller       = new ColumnsSectionUIController(props);
const event_handler    = controller?.event_handler;
const event_methods    = event_handler.getInputEventMethods.bind(event_handler);

const { state_refs, components }    = controller.getComponentDefinition();
const { InputGroupUI, ButtonUI }    = components;

const { 
    showLength, 
    showVariant, 
    showPrecision,
    showValues, 
    showPrimaryKey,
    showAutoIncrement,
    showUnique
} = controller

const { 
    add_column_btn_props,
    delete_column_btn_props,
    columns_model,
    get_input_group_props,

} = state_refs;
</script>