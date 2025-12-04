<template>
    <section id="MemberActivityView" :class="props.wrapper_class_style">
        <div :class="props.grid_item_class_style">
            <SearchFieldUI v-bind="search_field_props" />
        </div>

        <ListLoaderUI v-if="is_loading" :number_of_bars="6" />

        <div v-else-if="!is_loading && records?.length > 0" class="">
            <div  class="w-full block items-center justify-center my-4">
                <div v-for="(record, index) in records" :key="index" class="w-full h-auto block border-2 rounded p-0 my-2">
                    <div class="w-full h-[25px] p-2 border-b-4 shadow flex items-center justify-between bg-gray-300">
                        <span class="font-bold text-sm truncate">{{ (index + 1) }}.</span>
                        <span class="font-bold text-sm truncate">{{ InputTransformerUtil.formatReadableDateTime(record.created_at) }}</span>
                    </div>
                    <div class="w-full p-2 bg-white text-center break-words whitespace-normal">
                        <span class="uppercase text-xs font-bold block">
                            {{ record.description }}
                        </span>
                    </div>
                </div>
            </div>


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


const props             = defineProps(MemberActivityViewProps);
const controller        = new MemberActivityViewController(props);
const event_handler     = controller.event_handler;

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { ListLoaderUI, SearchFieldUI, PaginationUI } = components;

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