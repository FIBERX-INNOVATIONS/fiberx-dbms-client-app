<template>
    <section id="SchemaAccessProfileView" :class="props.wrapper_class_style">
        <!-- ID -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.id_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.id"></span>
        </div>

        <!-- Schema -->
        <div v-if="formatted_schema" :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.schema_key_text }}:
            </span>
            <span :class="props.underline_value_text_class_style" v-html="formatted_schema"></span>
        </div>

        <!-- Registered App -->
        <div v-if="formatted_registered_app" :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.registered_app_key_text }}:
            </span>
            <span :class="props.underline_value_text_class_style" v-html="formatted_registered_app"></span>
        </div>

        <!-- Permissions -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.permissions_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_permissions }}
            </span>
        </div>

        <!-- Is Owner -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.is_owner_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_is_owner }}
            </span>
        </div>

        <!-- Is Granted -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.is_granted_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_is_granted }}
            </span>
        </div>

        <!-- Created At -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_created_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_created_at }}
            </span>
        </div>

        <!-- Updated At -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_updated_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_updated_at }}
            </span>
        </div>

        <!-- Creator -->
        <div v-if="formatted_creator" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.creator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_creator"></span>
        </div>

        <!-- Updator -->
        <div v-if="formatted_updator" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.updator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updator"></span>
        </div>

    </section>
</template>

<script setup lang="ts">
import SchemaAccessProfileViewProps from "./schema_access_profile_view_props";
import SchemaAccessProfileViewController from "./schema_access_profile_view_controller";

const props = defineProps(SchemaAccessProfileViewProps);
const controller = new SchemaAccessProfileViewController(props);

const { state_refs, computed_refs } = controller.getComponentDefinition();

const { content_data } = state_refs;

const {
    formatted_schema,
    formatted_registered_app,
    formatted_permissions,
    formatted_is_owner,
    formatted_is_granted,
    formatted_created_at,
    formatted_updated_at,
    formatted_creator,
    formatted_updator,
} = computed_refs;
</script>