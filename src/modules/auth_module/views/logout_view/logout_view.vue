<template>
    <section id="LogoutView" :class="props.wrapper_class_style">

        <div :class="props.form_box_class_style">

            <div :class="props.form_box_wrapper_class_style">
                <h2 :class="props.header_text_class_style" v-html="computed_refs.header_text.value"></h2>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import LogoutViewProps       from "./logout_view_props";
import LogoutViewController  from "./logout_view_controller";

const props             = defineProps(LogoutViewProps);
const controller        = new LogoutViewController(props)
const { computed_refs } = controller.getComponentDefinition();
</script>
