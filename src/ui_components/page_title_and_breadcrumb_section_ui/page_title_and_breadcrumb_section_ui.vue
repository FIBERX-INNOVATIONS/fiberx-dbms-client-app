<template>
    <h1 :class="props.header_text_class_style" v-html="props.header_text"></h1>

    <BreadCrumbUI v-bind="props.breadcrumb_props" />
</template>

<script setup lang="ts">
import PageTitleAndBreadcrumbSectionUIProps            from "./page_title_and_breadcrumb_section_ui_props";
import PageTitleAndBreadcrumbSectionUIController       from "./page_title_and_breadcrumb_section_ui_controller";

const props             = defineProps(PageTitleAndBreadcrumbSectionUIProps);
const controller        = new PageTitleAndBreadcrumbSectionUIController(props);
const { components }    = controller.getComponentDefinition();

const { BreadCrumbUI } = components
</script>