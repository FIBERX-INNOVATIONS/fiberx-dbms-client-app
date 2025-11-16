<template>
    <section :class="props.section_wrapper_class_style">
        <div :class="props.header_section_wrapper_class_style">
            <h2 :class="props.header_section_label_class_style">
                {{ props.content_data?.indexes_label_text }}
            </h2>
            <ButtonUI v-if="columns_array.filter((obj: { name: string }) => obj.name).length" v-bind="add_index_btn_props" />
        </div>

        <div v-if="indexes_model.length === 0" :class="props.body_section_wrapper_class_style">
            <span :class="props.body_section_label_class_style">
                {{ props.content_data?.no_indexes_text }}
            </span>
        </div>

        <div v-for="(index_obj, i) in indexes_model" :key="index_obj.id" :class="props.body_section_wrapper_class_style">
            <div :class="props.body_section_row_header_wrapper_class_style">
                <span :class="props.body_section_row_header_label_class_style">
                    {{ props.content_data?.indexes_label_text }} {{ i + 1 }}
                </span>
                <ButtonUI v-bind="delete_index_btn_props(event_handler, `${i}`, null)" />
            </div>

            <div :class="props.body_section_row_body_responsive_grid_2_class_style">
                <!-- fields -->
                <div class="flex items-start flex-col justify-center w-full">
                    <div v-for="(col, col_i) in columns_array.filter((obj: { name: string }) => obj.name)" :key="col_i" class="flex items-center gap-2">
                        <InputGroupUI v-bind="get_input_group_props(props.content_data, `indexes_array.${i}.fields.[]`, index_obj?.fields.includes(col?.name), 'checkbox', false, index_obj, event_methods('checkbox'), { checkbox_value: col?.name })" />

                        <span class="text-sm">{{ InputTransformerUtil.toTitleCase(col.name) }}</span>
                    </div>
                 </div>
                

                <!-- unique -->
                <div class="flex items-end justify-center flex-col w-full">
                    <InputGroupUI v-bind="get_input_group_props(props.content_data, `indexes_array.${i}.unique`, index_obj?.unique, 'checkbox', false, index_obj, event_methods('checkbox'))" />
                </div>
                
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import IndexesSectionUIProps        from "./indexes_section_ui_props";
import IndexesSectionUIController   from "./indexes_section_ui_controller";
import InputTransformerUtil         from "@ui/version_2/utils/input_formatter_util";

const props            = defineProps(IndexesSectionUIProps);
const controller       = new IndexesSectionUIController(props);
const event_handler    = controller?.event_handler;
const event_methods    = event_handler.getInputEventMethods.bind(event_handler);

const { state_refs, components }    = controller.getComponentDefinition();
const { InputGroupUI, ButtonUI }    = components;

const { 
    columns_array,
    indexes_model,
    add_index_btn_props,
    delete_index_btn_props,
    get_input_group_props,
} = state_refs;
</script>