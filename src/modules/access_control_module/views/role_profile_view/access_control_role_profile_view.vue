<template>
    <section id="AccessControlRoleProfileView" :class="props.wrapper_class_style">

       <!-- ID -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.id_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record?.id"></span>
        </div>


        <!-- Role Name -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.name_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ props.record.name }}
            </span>
        </div>

        <!-- Role Symbol -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.symbol_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ props.record.symbol }}
            </span>
        </div>

        <!-- Member Count -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.member_count_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ props.record.member_count }}
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
        <div :class="props.timestamp_section_wrapper_class_style" v-if="props.record.updated_at">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_updated_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_updated_at }}
            </span>
        </div>

        <!-- Creator -->
        <div v-if="props.record.creator" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.creator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_creator"></span>
        </div>

        <!-- Updator -->
        <div v-if="props.record.updator" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.updator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updator"></span>
        </div>
    </section>
</template>

<script setup lang="ts">

import AccessControlRoleProfileViewProps from "./access_control_role_profile_view_props";
import AccessControlRoleProfileViewController from "./access_control_role_profile_view_controller";

const props = defineProps(AccessControlRoleProfileViewProps);

const controller = new AccessControlRoleProfileViewController(props);

const { state_refs, computed_refs } = controller.getComponentDefinition();

const { content_data } = state_refs;

const {
    formatted_created_at,
    formatted_updated_at,
    formatted_creator,
    formatted_updator,
} = computed_refs;
</script>
