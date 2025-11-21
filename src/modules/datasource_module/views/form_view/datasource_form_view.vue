<template>
    <section id="DatasourceFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="registered_app_input_group_prop" />
            <InputGroupUI v-bind="name_input_group_prop" />
            <InputGroupUI v-bind="datasource_type_input_group_prop" />
            <InputGroupUI v-bind="host_input_group_prop" />
            <InputGroupUI v-bind="port_input_group_prop" /> 
            <InputGroupUI v-bind="username_input_group_prop" /> 

            <div :class="props.object_section_wrapper_class_style">
                <!-- Object header -->
                <div :class="props.object_section_header_class_style">
                    <span :class="props.object_section_header_label_text_class_style">
                        {{ connection_info_label_text }}
                    </span>
                    <div :class="props.object_section_header_add_btn_class_style">
                        <ButtonUI v-bind="add_connection_info_btn_props" />
                    </div>
                </div>

                <!-- Object body -->
                <div v-if="connection_info_array.length === 0" :class="props.object_section_body_class_style">
                    <span>{{ no_info_text }}</span>
                </div>

                <div v-for="(conn, index) in connection_info_array" :class="props.object_section_body_class_style">
                    <div :class="props.object_section_body_row_class_style">
                        <span :class="props.object_section_body_row_label_text_class_style">
                            {{ connection_info_label_text }} {{ index + 1 }}
                        </span>
                        <ButtonUI v-bind="controller.getObjectDeleteBtnProps(index, `connection_info_array.${index}`)" />
                    </div>

                    <div :class="props.object_section_body_row_class_style">
                        <div :class="props.object_body_key_class_style">
                            <InputGroupUI v-bind="controller.getObjectInputGroupProps(`connection_info_array.${index}.key`, conn?.key)" />
                        </div>

                        <div :class="props.object_body_value_class_style">
                            <InputGroupUI v-bind="controller.getObjectInputGroupProps(`connection_info_array.${index}.value`, conn?.value)" />
                        </div>
                    </div>

                </div>
            </div>
            
            <ToastAlertUI v-bind="toast_alert_props" />
            <ButtonUI v-bind="btn_props" />
        </form>
    </section>
</template>


<script setup lang="ts">
import DatasourceFormViewProps       from "./datasource_form_view_props";
import DatasourceFormViewController  from "./datasource_form_view_controller";

const props            = defineProps(DatasourceFormViewProps);
const controller       = new DatasourceFormViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const {  InputGroupUI, ToastAlertUI, ButtonUI  } = components;

const {
    connection_info_array,
    registered_app_input_group_prop,
    name_input_group_prop,
    datasource_type_input_group_prop,
    host_input_group_prop,
    port_input_group_prop,
    username_input_group_prop,
    database_name_input_group_prop,
    add_connection_info_btn_props,
    connection_info_label_text,
    no_info_text,
    toast_alert_props,
    btn_props
} = state_refs
</script>