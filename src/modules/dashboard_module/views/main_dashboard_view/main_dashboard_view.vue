<template>
    <section id="DashboardView" :class="base_class_styles?.wrapper_class_style">
        <h1 :class="base_class_styles?.header_text_class_style" v-html="computed_refs.header_text.value"></h1>

        <!-- Breadcrumb -->
        <BreadCrumbUI v-bind="breadcrumb_props" />

        <!-- Metrics Card -->
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
            <CardLoaderUI v-if="is_loading_stat_data" :number_of_cards="4" />

            <StatMetricCardUI
                v-else
                v-for="(stat, stat_index) in metrics_array"
                :key="stat_index"
                v-bind="state_props_builder(stat)"
            />

        </div>

        <!-- Activities -->
        <div class="grid grid-cols-1 gap-2">
            <ListLoaderUI v-if="is_loading_activities" :number_of_bars="10" />

            <ActivityListUI v-else v-bind="activity_list_props" />

        </div>
        
    </section>
</template>

<script setup lang="ts">
import MainDashboardViewController from "./main_dashboard_view_controller";

const props            = defineProps({});
const controller       = new MainDashboardViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { 
    BreadCrumbUI, 
    CardLoaderUI,
    ListLoaderUI,
    StatMetricCardUI,
    ActivityListUI
} = components;

const {
    metrics_array,
    is_loading_stat_data,
    is_loading_activities,
    breadcrumb_props,
    base_class_styles,
    state_props_builder,
    activity_list_props
} = state_refs

</script>