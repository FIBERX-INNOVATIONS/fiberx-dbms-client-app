<template>
    <section id="MemberFormView" :class="props?.section_wrapper_class_style">
        <form @submit.prevent :class="props?.form_class_style">
            <InputGroupUI v-bind="first_name_input_group_prop" />
            <InputGroupUI v-bind="last_name_input_group_prop" />
            <InputGroupUI v-if="!InputValidatorUtil.isSuperAdmin(record.role_name)" v-bind="role_name_input_group_prop" />
            <InputGroupUI v-bind="email_input_group_prop" />
            <InputGroupUI v-bind="phone_input_group_prop" /> 
            <InputGroupUI v-bind="dob_input_group_prop" /> 
            <InputGroupUI v-bind="gender_input_group_prop" /> 
            <InputGroupUI v-bind="profile_photo_link_input_group_prop" /> 
            <InputGroupUI v-bind="password_input_group_prop" /> 
            
            <ToastAlertUI v-bind="toast_alert_props" />
            <ButtonUI v-bind="btn_props" />
        </form>
    </section>
</template>


<script setup lang="ts">
import MemberFormViewProps       from "./member_form_view_props";
import MemberFormViewController  from "./member_form_view_controller";
import InputValidatorUtil from "@ui/version_2/utils/input_validator_util";

const props            = defineProps(MemberFormViewProps);
const controller       = new MemberFormViewController(props)

const { state_refs, components} = controller.getComponentDefinition();

const {  InputGroupUI, ToastAlertUI, ButtonUI  } = components;

const {
    connection_info_array,
    first_name_input_group_prop,
    last_name_input_group_prop,
    role_name_input_group_prop,
    email_input_group_prop,
    phone_input_group_prop,
    dob_input_group_prop,
    gender_input_group_prop,
    profile_photo_link_input_group_prop,
    password_input_group_prop,
    toast_alert_props,
    btn_props
} = state_refs
</script>