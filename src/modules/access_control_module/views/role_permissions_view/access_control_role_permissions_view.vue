<template>
    <section id="AccessControlRolePermissionsView" :class="props.wrapper_class_style">
        <div :class="props.list_data_action_section_class_style">
            <div :class="props.grid_1_wrapper_class_style">
                <SearchFieldUI v-bind="search_field_props" />
            </div>
       
            <div :class="props.grid_2_wrapper_class_style">
                <ButtonUI v-bind="form_action_btn_props" />
            </div>
        </div>

        <ListLoaderUI v-if="is_loading" :number_of_bars="6" />

        <div v-else-if="!is_loading && records?.length > 0" class="">
            <PaginationResultAndBulkActionSectionUI
                :list_data_action_section_class_style="props.list_data_action_section_class_style"
                :grid_1_wrapper_class_style="props.grid_1_wrapper_class_style"
                :grid_2_wrapper_class_style="props.grid_2_wrapper_class_style"
                :pagination_summary_class_style="props.pagination_summary_class_style"
                :pagination_summary_text="computed_refs.pagination_result_text.value"
                :bulk_action_btn_props="state_refs.bulk_action_btn_props"
                :bulk_action_menu_list_props="state_refs.bulk_action_dropdown_menu_props"
            />

            <ActivityListUI  v-bind="activity_list_props" />


            <!-- pagination ui -->
            <PaginationUI 
                v-bind="pagination_props"
                :total_pages="total_pages"
                :current_page="current_page"
            />
        </div>
        <div v-else>
            {{ content_data.no_data_text }}
        </div>
    </section>
</template>

<script setup lang="ts">
import AccessControlRolePermissionsViewProps        from "./access_control_role_permissions_view_props";
import AccessControlRolePermissionsViewController   from "./access_control_role_permissions_view_controller";
import InputTransformerUtil                         from "@ui/version_2/utils/input_formatter_util";

const transformer_util_ref  = InputTransformerUtil;
const props                 = defineProps(AccessControlRolePermissionsViewProps);
const controller            = new AccessControlRolePermissionsViewController(props);
const event_handler         = controller.event_handler;

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { 
    ListLoaderUI, 
    SearchFieldUI, 
    ButtonUI,
    PaginationResultAndBulkActionSectionUI,
    PaginationUI, 
    ActivityListUI 
} = components;



const {
    content_data,
    current_page,
    total_pages,
    total_items,
    records,
    is_loading,
    search_field_props,
    pagination_props,
    activity_list_props,
    form_action_btn_props,
} = state_refs;

</script>