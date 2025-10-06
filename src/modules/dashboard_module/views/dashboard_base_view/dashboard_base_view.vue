
<template>
    <template v-if="true">
        <main>
            <RouterView />
        </main>
    </template>
</template>

<script setup lang="ts">
import DashboardBaseViewController from "./dashboard_base_view_controller";

const props            = defineProps({});
const controller       = new DashboardBaseViewController(props)

const { state_refs, components} = controller.getComponentDefinition();
const { } = components;
</script>