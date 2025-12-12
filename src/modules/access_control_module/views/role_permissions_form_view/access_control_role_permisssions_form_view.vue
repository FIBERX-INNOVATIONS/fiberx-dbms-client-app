<template>
    <section id="AccessControlRolePermissionsFormView" :class="props?.section_wrapper_class_style">
        <form v-if="unassigned_permissions.length" @submit.prevent :class="props?.form_class_style">
            <!-- Render permissions -->
             <div 
                v-for="(permission, index) in unassigned_permissions"
                :key="index" 
                :class="props.border_seperated_wrapper_class_style"
            >   
                <InputGroupUI 
                    v-bind="get_input_group_props(
                        controller.form_content_data, 
                        `permission_ids.[]`, 
                        event_handler?.form_data?.permission_ids?.includes(permission?.id), 
                        'checkbox', 
                        false, 
                        permission, 
                        event_methods('checkbox'), 
                        { checkbox_value: permission?.id }
                    )" 
                />

                <div :class="props.object_section_wrapper_class_style">
                    <span :class="props.bold_label_class_style">{{ permission.name }}</span>
                    <span :class="props.label_class_style">{{ permission.description }}</span>
                </div>
            </div>

            <!-- Load more -->
            <div v-if="has_more" class="text-center my-4">
                <button
                    @click="event_handler.handleFetchRecords"
                    class="text-blue-600 underline"
                    :disabled="is_loading"
                >
                    {{ is_loading ? "Loading..." : "Load more permissions" }}
                </button>
            </div>

            <ToastAlertUI v-bind="toast_alert_props" />
            <ButtonUI  v-bind="btn_props" />
        </form>
        <div v-else :class="props?.form_class_style">
            {{ controller?.form_content_data?.no_permisisons_to_assign }}
        </div>
    </section>
</template>


<script setup lang="ts">
import AccessControlRolePermissionsFormViewProps       from "./access_control_role_permisssions_form_view_props";
import AccessControlRolePermissionsFormViewController  from "./access_control_role_permisssions_form_view_controller";

const props                                     = defineProps(AccessControlRolePermissionsFormViewProps);
const controller                                = new AccessControlRolePermissionsFormViewController(props);
const event_handler                             = controller.event_handler;
const event_methods                             = event_handler.getInputEventMethods.bind(event_handler);
const { state_refs, components }                = controller.getComponentDefinition();
const { InputGroupUI, ToastAlertUI, ButtonUI }  = components;

const {
    has_more,
    is_loading,
    unassigned_permissions,
    toast_alert_props,
    btn_props,
    get_input_group_props
} = state_refs
</script>