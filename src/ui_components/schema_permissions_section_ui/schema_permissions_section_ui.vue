<template>
    <div :class="props.section_wrapper_class_style">
        <div :class="props.header_section_wrapper_class_style">
            <h2 :class="props.header_section_label_class_style">
                {{ props.content_data?.permissions_label_text }}
            </h2>
        </div>
        <div :class="props.body_class_style">
            <div 
                v-for="(permission_obj, index) in SCHEMA_PERMISSIONS_ACTIONS" 
                :key="index" 
                :class="props.row_class_style"
            >
                <InputGroupUI v-bind="get_input_group_props(props.content_data, `permissions_array.[]`, permissions_array.includes(permission_obj.value), 'checkbox', false, permissions_array, event_methods('checkbox'), { checkbox_value: permission_obj.value })" />

                <span class="text-sm">{{ InputTransformerUtil.toTitleCase(permission_obj?.label_text) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SchemaPermissionsSectionnUIProps      from "./schema_permissions_section_ui_props";
import SchemaPermissionsSectionUIController  from "./schema_permissions_section_ui_controller";
import InputTransformerUtil                  from "@ui/version_2/utils/input_formatter_util";
import { SCHEMA_PERMISSIONS_ACTIONS }       from "@/enums/constants.enums";

const props            = defineProps(SchemaPermissionsSectionnUIProps);
const controller       = new SchemaPermissionsSectionUIController(props);
const event_handler    = controller?.event_handler;
const event_methods    = event_handler.getInputEventMethods.bind(event_handler);

const { state_refs, components }    = controller.getComponentDefinition();
const { InputGroupUI }              = components;

const { 
    permissions_array,
    get_input_group_props,
} = state_refs;
</script>
