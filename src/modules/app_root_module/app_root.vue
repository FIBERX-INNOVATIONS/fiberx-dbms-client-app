<template>
    <template v-if="true">
        <!-- loader -->
        <ScreenLoaderUI v-bind="state_refs.screen_loader_props" @isLoading="event_handler.handleLoading" />
        <!-- alert -->
        <StatusAlertUI v-bind="state_refs.status_alert_props" @statusChanged="event_handler.handleStatusChanged" />
        <!-- Auth View -->
        <AuthBaseView v-if="computed_refs.is_auth_route" />
        <!-- Dashboard View -->
        <DashboardBaseView v-if="computed_refs.is_auth_route === false" />


    </template>
</template>

<script setup lang="ts">
import AppRootController from "./app_root_controller";

const props                             = defineProps({});
const controller                        = new AppRootController(props)
const event_handler                     = controller.event_handler;

const { state_refs, components, computed_refs } = controller.getComponentDefinition();
const { ScreenLoaderUI, StatusAlertUI, AuthBaseView, DashboardBaseView } = components;
</script>