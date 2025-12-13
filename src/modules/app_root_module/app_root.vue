<template>
    <template v-if="true">
        <!-- loader -->
        <ScreenLoaderUI v-bind="state_refs.screen_loader_props" @isLoading="event_handler.handleLoading" />
        <!-- alert -->
        <StatusAlertUI v-bind="state_refs.status_alert_props" @alert_status_updated="event_handler.handleStatusChanged" />
        <!-- Auth View -->
        <AuthBaseView v-if="computed_refs.is_auth_route.value" />
        <!-- Dashboard View -->
        <DashboardBaseView v-else />
        <!-- Modals -->
         <ModalUI
            v-for="(modal_prop, index) in modals"
            :key="index"
            :layer="index"
            v-bind="modal_prop"
        />


    </template>
</template>

<script setup lang="ts">
import AppRootController from "./app_root_controller";

const props                             = defineProps({});
const controller                        = new AppRootController(props)
const event_handler                     = controller.event_handler;

const { state_refs, components, computed_refs } = controller.getComponentDefinition();
const { ScreenLoaderUI, StatusAlertUI, AuthBaseView, DashboardBaseView, ModalUI } = components;
const { modals } = state_refs;
</script>