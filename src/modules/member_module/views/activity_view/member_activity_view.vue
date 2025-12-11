<template>
    <section id="MemberActivityView" :class="props.wrapper_class_style">
        <div :class="props.grid_item_class_style">
            <SearchFieldUI v-bind="search_field_props" />
        </div>

        <ListLoaderUI v-if="is_loading" :number_of_bars="6" />

        <div v-else-if="!is_loading && records?.length > 0" class="">
            <ActivityListUI
                :select_mode="false"
                :activity_records="records"
            />


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
import MemberActivityViewProps from "./member_activity_view_props";
import MemberActivityViewController from "./member_activity_view_controller";
import InputTransformerUtil from "@ui/version_2/utils/input_formatter_util";

const transformer_util_ref  = InputTransformerUtil;
const props                 = defineProps(MemberActivityViewProps);
const controller            = new MemberActivityViewController(props);
const event_handler         = controller.event_handler;

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { ListLoaderUI, SearchFieldUI, PaginationUI, ActivityListUI } = components;

const {
    content_data,
    current_page,
    size,
    keyword,
    total_pages,
    total_items:
    order_by,
    order_direction,
    records,
    is_loading,
    search_field_props,
    pagination_props,
} = state_refs;
</script>