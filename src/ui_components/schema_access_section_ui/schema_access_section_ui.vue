<template>
    <section :class="props.section_wrapper_class_style">
        <div :class="props.header_section_wrapper_class_style">
            <h2 :class="props.header_section_label_class_style">
                {{ props.content_data?.schema_access_label_text }}
            </h2>
            <ButtonUI v-if="!is_edit_mode" v-bind="add_new_schema_access_btn_props" />
        </div>

        <div v-if="schema_access_array.length === 0" :class="props.body_section_wrapper_class_style">
            <span :class="props.body_section_label_class_style">
                {{ props.content_data?.no_schemas_access_selected_text }}
            </span>
        </div>

        <div v-for="(schema_access, i) in schema_access_array" :key="schema_access.id" :class="props.body_section_wrapper_class_style">
            <div :class="props.body_section_row_header_wrapper_class_style">
                <span :class="props.body_section_row_header_label_class_style">
                    {{ props.content_data?.schema_access_label_text }} {{ i + 1 }}
                </span>
                <ButtonUI v-if="!is_edit_mode" v-bind="delete_schema_access_btn_props(event_handler, `${i}`, null)" />
            </div>

            <div :class="props.body_section_row_body_wrapper_class_style">
                <InputGroupUI 
                    v-bind="get_input_group_props(
                        props.content_data, 
                        `schema_access_array.${i}.schema`, 
                        schema_access.schema_id,
                        'select_search',
                        (is_edit_mode),
                        { id: schema_access.schema_id, name: schema_access.schema_name },
                        event_methods('select_search'), 
                    )" 
                />
               

                <div 
                    v-for="(permission_obj, index) in SCHEMA_PERMISSIONS_ACTIONS" 
                    :key="index" 
                    :class="props.body_section_row_class_style"
                >   
                    <InputGroupUI 
                        v-bind="get_input_group_props(
                            props.content_data, 
                            `schema_access_array.${i}.permissions.[]`, 
                            schema_access?.permissions?.includes(permission_obj.value), 
                            'checkbox', 
                            false, 
                            schema_access?.permissions, 
                            event_methods('checkbox'), 
                            { checkbox_value: permission_obj.value }
                        )" 
                    />

                    <span class="text-sm">{{ InputTransformerUtil.toTitleCase(permission_obj?.label_text) }}</span>
                </div>
                
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import SchemaAccessSectionUIProps           from "./schema_access_section_ui_props";
import SchemaAccessSectionUIController      from "./schema_access_section_ui_controller";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";
import { SCHEMA_PERMISSIONS_ACTIONS }       from "@/enums/constants.enums";

const props            = defineProps(SchemaAccessSectionUIProps);
const controller       = new SchemaAccessSectionUIController(props);
const event_handler    = controller?.event_handler;
const event_methods    = event_handler.getInputEventMethods.bind(event_handler);

const { state_refs, components }    = controller.getComponentDefinition();
const { InputGroupUI, ButtonUI }    = components;

const { 
    is_edit_mode,
    schema_access_array,
    add_new_schema_access_btn_props,
    delete_schema_access_btn_props,
    get_input_group_props,
} = state_refs;
</script>