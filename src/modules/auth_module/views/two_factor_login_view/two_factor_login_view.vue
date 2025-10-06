<template>
    <section id="TwoFactorLoginView" :class="props.wrapper_class_style">

        <div :class="props.form_box_class_style">

            <div :class="props.form_box_wrapper_class_style">
                <h2 :class="props.header_text_class_style" v-html="computed_refs.header_text.value"></h2>

                <form  @submit.prevent :class="props.fieldset_class_style">
                    <InputGroupUI v-bind="state_refs.otp_input_group_props" />

                    <ToastAlertUI v-bind="state_refs.toast_alert_props" />

                    <ButtonUI v-bind="state_refs.btn_props" />
                </form>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import TwoFactorLoginViewProps       from "./two_factor_login_view_props";
import TwoFactorLoginViewController  from "./two_factor_login_view_controller";

const props                             = defineProps(TwoFactorLoginViewProps);
const controller                        = new TwoFactorLoginViewController(props)
const event_handler                     = controller.event_handler;

const { state_refs, components, computed_refs } = controller.getComponentDefinition();
const { InputGroupUI, ToastAlertUI, ButtonUI } = components;
</script>
