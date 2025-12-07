<template>
    <section :class="props.wrapper_class_style">

        <!-- Name / Model -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.name_key_text }}:
            </span>
            <span :class="props.value_text_class_style">{{ props.record.name }}</span>
        </div>

        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.model_name_key_text  }}:
            </span>
            <span :class="props.value_text_class_style">{{ props.record.model_name }}</span>
        </div>

        <!-- App Info -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data.registered_app_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_registered_app"></span>
        </div>

        <!-- Datasource Info -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.datasource_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_schema_datasource"></span>
        </div>

        <!-- Permissions -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.schema_permissions_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_permissions"></span>
        </div>

        <!-- Primary kEY Columns -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.primary_key_key_text  }}:
            </span>
            <span :class="props.value_text_class_style">{{ props.record.primary_key }}</span>
        </div>

        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.columns_key_text }}
            </span>
            <div :class="props.grid_two_section_wrapper_class_style">
                <span v-for="(col, i) in formatted_columns" :key="i" :class="props.grid_item_class_style" v-html="col"></span>
            </div>
        </div>

        <!-- Indexes -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.indexes_key_text }}
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_indexes"></span>
        </div>

        <!-- Timestamps -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_created_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_created_at"></span>
        </div>

        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                 {{ content_data?.date_updated_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updated_at"></span>
        </div>

        <!-- Creator / Updator -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.creator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_creator"></span>
        </div>

        <div :class="props.timestamp_section_wrapper_class_style" v-if="props.record?.updator?.public_id">
            <span :class="props.key_text_class_style">
                {{ content_data?.updator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updator"></span>
        </div>

    </section>
</template>

<script setup lang="ts">
import RegisteredAppSchemaProfileViewProps from "./registered_app_schema_profile_view_props";
import RegisteredAppSchemaProfileViewController from "./registered_app_schema_profile_view_controller";

const props         = defineProps(RegisteredAppSchemaProfileViewProps);
const controller    = new RegisteredAppSchemaProfileViewController(props);

const { state_refs, computed_refs } = controller.getComponentDefinition();

const { content_data } = state_refs;

const {
    formatted_permissions,
    formatted_columns,
    formatted_indexes,
    formatted_created_at,
    formatted_updated_at,
    formatted_creator,
    formatted_updator,
    formatted_registered_app,
    formatted_schema_datasource
} = computed_refs;
</script>
