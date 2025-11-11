<template>
    <section id="DatasourceFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="registered_app_input_group_prop" />
            <InputGroupUI v-bind="name_input_group_prop" />
            <InputGroupUI v-bind="datasource_type_input_group_prop" />
            <InputGroupUI v-bind="host_input_group_prop" />
            <InputGroupUI v-bind="port_input_group_prop" /> 
            <InputGroupUI v-bind="username_input_group_prop" /> 
            <InputGroupUI v-bind="database_name_input_group_prop" /> 
            <div :class="props.connection_info_wrapper_class_style">
                <div :class="props.connection_info_header_class_style">
                    <span :class="props.connection_info_header_label_class_style">
                        {{ connection_info_label_text }}
                    </span>
                    <div :class="props.connection_info_header_add_btn_class_style">
                        <ButtonUI v-bind="add_connection_info_props" />
                    </div>
                </div>
                <div
                    v-for="([key_id, key_value], index) in Object.entries(
                        (connection_info_obj as Record<string, { key: string; value: string; is_deleted?: boolean }>)
                    ).filter(([_, value]) => !value.is_deleted)"
                    :key="key_id"
                    :class="props.connection_info_body_class_stle"
                >
                
                    <!-- Link Name Input -->
                    <div :class="props.connection_info_body_link_name_class_style">
                        <InputGroupUI
                            v-bind="controller.getObjectInputGroupProps(`connection_info_key_${index}`, key_value?.key)"
                        />
                    </div>

                    <!-- Link URL Input -->
                    <div :class="props.connection_info_body_link_value_class_style">
                        <InputGroupUI
                            v-bind="controller.getObjectInputGroupProps(`connection_info_value_${index}`, key_value?.value)"
                        />
                    </div>

                    <!-- Remove Button -->
                    <div :class="props.connection_info_body_delete_btn_class_style">
                        <ButtonUI
                            v-bind="controller.getObjectDeleteBtnProps(key_id, `connection_info_key_${index}`)"
                        />
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
    connection_info_obj,
    registered_app_input_group_prop,
    name_input_group_prop,
    datasource_type_input_group_prop,
    host_input_group_prop,
    port_input_group_prop,
    username_input_group_prop,
    database_name_input_group_prop,
    add_connection_info_props,
    connection_info_label_text,
    toast_alert_props,
    btn_props
} = state_refs
</script>