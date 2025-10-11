
<template>
    <section id="DashboardView" :class="props?.section_wrapper_class_style">
        <h1 :class="props.header_text_class_style" v-html="computed_refs.header_text.value"></h1>

        <!-- Breadcrumb -->
        <BreadCrumbUI v-bind="state_refs.breadcrumb_props" />
        
    </section>
</template>

<script setup lang="ts">
import RegisteredAppListViewProps       from "./registered_app_list_view_props";
import RegisteredAppListViewController  from "./registered_app_llist_view_controller";

const props            = defineProps(RegisteredAppListViewProps);
const controller       = new RegisteredAppListViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { BreadCrumbUI } = components;
</script>