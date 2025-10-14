
<template>
    <section id="RegisteredAppListView" :class="props?.section_wrapper_class_style">
        <h1 :class="props.header_text_class_style" v-html="computed_refs.header_text.value"></h1>

        <!-- Breadcrumb -->
        <BreadCrumbUI v-bind="state_refs.breadcrumb_props" />

        <section id="ListDataSection" :class="props.data_section_wrapper_class_style">

            <section id="ListDataActionSection" :class="props.list_data_action_section_class_style">
                <SearchFieldUI v-bind="state_refs.search_field_props" />
                <div :class="props.form_action_btn_section_class_style">
                    <ButtonUI v-bind="state_refs.form_action_btn_props" />
                </div>
            </section>

        </section>
        
    </section>
</template>

<script setup lang="ts">
import RegisteredAppListViewProps       from "./registered_app_list_view_props";
import RegisteredAppListViewController  from "./registered_app_llist_view_controller";

const props            = defineProps(RegisteredAppListViewProps);
const controller       = new RegisteredAppListViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { BreadCrumbUI, ButtonUI, SearchFieldUI } = components;
</script>