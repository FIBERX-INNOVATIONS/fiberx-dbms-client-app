<template>
    <section id="DashboardView" :class="state_refs?.base_class_styles?.wrapper_class_style">
        <h1 :class="state_refs?.base_class_styles?.header_text_class_style" v-html="computed_refs.header_text.value"></h1>

        <!-- Breadcrumb -->
        <BreadCrumbUI v-bind="state_refs.breadcrumb_props" />
        
    </section>
</template>

<script setup lang="ts">
import MainDashboardViewController from "./main_dashboard_view_controller";

const props            = defineProps({});
const controller       = new MainDashboardViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { BreadCrumbUI } = components;
</script>