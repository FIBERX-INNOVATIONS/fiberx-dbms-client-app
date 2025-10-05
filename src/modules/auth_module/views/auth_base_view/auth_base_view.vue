
<template>
    <template v-if="true">
        <main :style="state_refs.main_bg_style">
            <RouterView />
        </main>
        <footer :class="state_refs.footer_class_style">
            <CopyRightUI v-bind="state_refs.copyright_props" />
        </footer>
    </template>
</template>

<script setup lang="ts">
import AuthBaseViewController from "./auth_base_view_controller";

const props            = defineProps({});
const controller       = new AuthBaseViewController(props)

const { state_refs, components} = controller.getComponentDefinition();
const { CopyRightUI } = components;
</script>