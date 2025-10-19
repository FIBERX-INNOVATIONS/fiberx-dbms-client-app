
<template>
    <section id="RegisteredAppListView" :class="props?.section_wrapper_class_style">
        <PageTitleAndBreadcrumbSectionUI
            :header_text_class_style="props.header_text_class_style"
            :header_text="computed_refs.header_text.value"
            :breadcrumb_props="state_refs.breadcrumb_props"
        />
        

        <section id="ListDataSection" :class="props.data_section_wrapper_class_style">

            <SearchAndActionBtnSectionUI
                :list_data_action_section_class_style="props.list_data_action_section_class_style"
                :grid_1_wrapper_class_style="props.grid_1_wrapper_class_style"
                :grid_2_wrapper_class_style="props.grid_2_wrapper_class_style"
                :search_field_props="state_refs.search_field_props"
                :form_action_btn_props="state_refs.form_action_btn_props"
            />

            table {{ state_refs.records.value.length }}
            
            <PaginationResultAndBulkActionSectionUI
                :list_data_action_section_class_style="props.list_data_action_section_class_style"
                :grid_1_wrapper_class_style="props.grid_1_wrapper_class_style"
                :grid_2_wrapper_class_style="props.grid_2_wrapper_class_style"
                :pagination_summary_class_style="props.pagination_summary_class_style"
                :pagination_summary_text="computed_refs.pagination_result_text.value"
                :bulk_action_btn_props="state_refs.bulk_action_btn_props"
                :bulk_action_menu_list_props="state_refs.bulk_action_dropdown_menu_props"
            />

            <DataTableSectionUI
                table_id="RegisteredAppDataTable"
                :is_loading="state_refs.is_loading.value"
                :header_props="state_refs.table_header_props"
                :body_props="state_refs.table_body_props"
                :wrapper_class_style="props.data_table_section_wrapper_class_style"
                :table_class_style="props.data_table_class_style"
                :lg_table_wrapper_class_style="props.lg_table_wrapper_class_style"
                :action_menu_list_props_method="controller.getTableRecordMenuListProps"
                :action_btn_props_method="controller.getTableActionBtnProps"
            />

        </section>
        
    </section>
</template>

<script setup lang="ts">
import RegisteredAppListViewProps       from "./registered_app_list_view_props";
import RegisteredAppListViewController  from "./registered_app_llist_view_controller";

const props            = defineProps(RegisteredAppListViewProps);
const controller       = new RegisteredAppListViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { 
    PageTitleAndBreadcrumbSectionUI,
    SearchAndActionBtnSectionUI,
    PaginationResultAndBulkActionSectionUI,
    DataTableSectionUI
} = components;
</script>