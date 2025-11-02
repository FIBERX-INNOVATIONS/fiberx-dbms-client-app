<template>
    <section id="DatasourceListView" :class="props?.wrapper_class_style">

        <!-- ID -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.id_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.id"></span>
        </div>


        <!-- Name -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.name_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.name?.toUpperCase()"></span>
        </div>


        <!-- Username -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.username_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.username"></span>
        </div>

        <!-- Database name -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.database_name_type_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_databse_name_type"></span>
        </div>

        <!-- host -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.host_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_host"></span>
        </div>

        <!-- port -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.port_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props?.record.port"></span>
        </div>

        <!-- registered app -->
        <div v-if="props.record?.datasource_app?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.registered_app_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_registered_app">
            </span>
        </div>

        <!-- is active -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.is_active_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ props.record.is_active ? profile_content_data?.active_state_value_text : profile_content_data?.inactive_state_value_text }}
            </span>
        </div>

        <!-- is created -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.is_created_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ props.record.is_created ? profile_content_data?.created_value_text : profile_content_data?.destroyed_value_text }}
            </span>
        </div>

        <!-- connection info -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.connection_info_key_text }}:
            </span>
            <div :class="props.grid_two_section_wrapper_class_style">
                <span 
                v-for="(connection_info_obj, connection_info_index) in formatted_connection_info"
                :key="connection_info_index"
                :class="props.grid_item_class_style" 
                v-html="connection_info_obj"></span>
            </div>
            
        </div>
        

        <!-- timestamps -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.date_created_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_created_at  }}
            </span>
        </div>

        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.date_updated_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_updated_at }}
            </span>
        </div>

        <!-- creator / updator -->
        <div v-if="props.record?.creator?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.creator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_creator">
            </span>
        </div>

        <div v-if="props.record?.updator?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ profile_content_data?.updator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updator">
            </span>
        </div>

    </section>
</template>

<script setup lang="ts">
import DatasourceProfileViewProps       from "./datasource_profile_view_props";
import DatasourceProfileViewController  from "./datasource_profile_view_controller";

const props            = defineProps(DatasourceProfileViewProps);
const controller       = new DatasourceProfileViewController(props)

const { state_refs, computed_refs } = controller.getComponentDefinition();

const { profile_content_data } = state_refs;

const {
    formatted_databse_name_type,
    formatted_host,
    formatted_connection_info,
    formatted_created_at,
    formatted_updated_at,
    formatted_creator,
    formatted_updator,
    formatted_registered_app
} = computed_refs;

</script>