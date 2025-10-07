
<template>
    <template v-if="true">
        <header :class="state_refs.base_class_styles.header_class_style">
            <TopBarUI v-bind="state_refs.top_bar_props">
                <template #section_1>
                    <div :class="state_refs.base_class_styles.top_bar_section_1_wrapper_class_style">
                        <ButtonUI v-bind="state_refs.hamburger_btn_props" />
                        <NavLinkUI v-bind="state_refs.logo_link_props" />
                    </div>
                </template>
                <template #section_3>
                    <div :class="state_refs.base_class_styles.top_bar_section_3_wrapper_class_style">
                        <ImgAvatarUI v-bind="state_refs.img_avatar_ui_props" />
                        <MenuListUI v-bind="state_refs.profile_dropdown_list_props" />
                    </div>
                </template>
            </TopBarUI>

        </header>
        <ModalSidebarUI v-bind="state_refs.sidebar_props"></ModalSidebarUI>
        <main :class="state_refs.base_class_styles.main_class_style">
            <RouterView />
        </main>
    </template>
</template>

<script setup lang="ts">
import DashboardBaseViewController from "./dashboard_base_view_controller";

const props            = defineProps({});
const controller       = new DashboardBaseViewController(props)

const { state_refs, components} = controller.getComponentDefinition();
const { TopBarUI, ButtonUI, NavLinkUI, ImgAvatarUI, MenuListUI, ModalSidebarUI } = components;
</script>