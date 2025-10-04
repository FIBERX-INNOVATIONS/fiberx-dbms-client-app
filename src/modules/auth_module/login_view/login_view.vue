<template>
    <section id="LoginView" :class="props.wrapper_class_style">

        <div :class="props.form_box_class_style">

            <div :class="props.form_box_wrapper_class_style">
                <h2 :class="props.header_text_class_style" v-html="computed_refs.header_text.value"></h2>

                <fieldset :class="props.fieldset_class_style">
                    <InputGroupUI v-bind="state_refs.username_input_group_props" />

                    <InputGroupUI v-bind="state_refs.password_input_group_props" />

                    <ToastAlertUI v-bind="state_refs.toast_alert_props" />
                </fieldset>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import LoginViewProps       from "./login_view_props";
import LoginViewController  from "./login_view_controller";

const props                             = defineProps(LoginViewProps);
const controller                        = new LoginViewController(props)
const event_handler                     = controller.event_handler;

const { state_refs, components, computed_refs } = controller.getComponentDefinition();
const { InputGroupUI, ToastAlertUI } = components;
</script>
