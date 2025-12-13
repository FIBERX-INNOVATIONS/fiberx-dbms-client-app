<template>
    <section id="RegisteredAppListView" :class="props?.wrapper_class_style">

        <ImgAvatarUI v-bind="img_avatar_ui_props" />

        <!-- is active -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.is_active_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ props.record.is_active ? content_data?.active_state_value_text : content_data?.inactive_state_value_text }}
            </span>
        </div>

        <!-- base url -->
          <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.base_url_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_base_url"></span>
        </div>

        <!-- Social Links -->
        <div :class="props.social_links_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.social_media_key_text }}:
            </span>
            <span 
                v-for="(social_link, social_index) in formatted_social_links"
                :key="social_index"
                :class="props.social_link_item_class_style" 
                v-html="social_link"></span>
        </div>

        <!-- URLS -->
        <div :class="props.social_links_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.urls_key_text }}:
            </span>
            <span 
                v-for="(url, url_index) in formatted_urls"
                :key="url_index"
                :class="props.social_link_item_class_style" 
                v-html="url"></span>
        </div>

        <!-- timestamps -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_created_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_created_at  }}
            </span>
        </div>

        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_updated_key_text }}:
            </span>
            <span :class="props.value_text_class_style">
                {{ formatted_updated_at }}
            </span>
        </div>

         <!-- creator / updator -->
        <div v-if="props.record?.creator?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.creator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_creator">
            </span>
        </div>

        <div v-if="props.record?.updator?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.updator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updator">
            </span>
        </div>

        <!-- description -->
        <div :class="props.description_section_wrapper_class_style">
            <span :class="props.description_key_text_class_style">
                {{ content_data?.description_key_text }}
            </span>
            <p :class="props.description_value_text_class_style">
                {{ props.record?.description}}
            </p>
        </div>
        

    </section>
</template>


<script setup lang="ts">
import RegisteredAppProfileViewProps       from "./registered_app_profile_view_props";
import RegisteredAppProfileViewController  from "./registered_app_profile_view_controller";

const props            = defineProps(RegisteredAppProfileViewProps);
const controller       = new RegisteredAppProfileViewController(props)

const { state_refs, computed_refs, components} = controller.getComponentDefinition();

const { content_data, img_avatar_ui_props } = state_refs;

const {
    formatted_base_url,
    formatted_social_links,
    formatted_urls,
    formatted_created_at,
    formatted_updated_at,
    formatted_creator,
    formatted_updator
} = computed_refs;

const { ImgAvatarUI } = components;
</script>