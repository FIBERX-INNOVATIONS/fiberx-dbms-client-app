<template>
    <section id="MemberProfileView" :class="props.wrapper_class_style">

        <!-- Public ID -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.public_id_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record?.public_id?.toUpperCase?.()"></span>
        </div>

        <!-- Username -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.username_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.username"></span>
        </div>

        <!-- Full name -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.full_name_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.full_name"></span>
        </div>

        <!-- First name -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.first_name_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.first_name"></span>
        </div>

        <!-- Last name -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.last_name_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.last_name"></span>
        </div>

        <!-- Email -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.email_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.email"></span>
        </div>

        <!-- Phone -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.phone_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.phone"></span>
        </div>

        <!-- DOB -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.dob_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_dob"></span>
        </div>

        <!-- Gender -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.gender_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.gender"></span>
        </div>

        <!-- Role -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.role_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="props.record.role_name"></span>
        </div>

        <!-- Verified -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.is_verified_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_verification_status"></span>
        </div>

        <!-- AUTH SECTION -->
        <h3 :class="props.key_text_class_style" style="margin-top: 1rem;">
            {{ content_data?.auth_section_title_text }}
        </h3>

        <!-- Login attempts -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.login_attempts_key_text }}:
            </span>
            <span :class="props.value_text_class_style">{{ props.record.member_auth?.login_attempts }}</span>
        </div>

        <!-- Account locked until -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.account_locked_until_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_account_locked_until"></span>
        </div>

        <!-- Password changed at -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.password_changed_at_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_password_changed_at"></span>
        </div>

        <!-- Last password reset -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.last_password_reset_request_at_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_last_password_reset_request_at"></span>
        </div>

        <!-- 2FA -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.is_2fa_enabled_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_two_fa_status"></span>
        </div>

        <!-- Active/inactive -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.is_active_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_account_status"></span>
        </div>

        <!-- Last login -->
        <div :class="props.info_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.last_login_at_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_last_login"></span>
        </div>

        <!-- Timestamps -->
        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_created_key_text }}:
            </span>
            <span :class="props.value_text_class_style">{{ formatted_created_at }}</span>
        </div>

        <div :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.date_updated_key_text }}:
            </span>
            <span :class="props.value_text_class_style">{{ formatted_updated_at }}</span>
        </div>

        <!-- creator / updator -->
        <div v-if="props.record?.creator?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.creator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_creator"></span>
        </div>

        <div v-if="props.record?.updator?.public_id" :class="props.timestamp_section_wrapper_class_style">
            <span :class="props.key_text_class_style">
                {{ content_data?.updator_key_text }}:
            </span>
            <span :class="props.value_text_class_style" v-html="formatted_updator"></span>
        </div>

    </section>
</template>

<script setup lang="ts">
import MemberProfileViewProps from "./member_profile_view_props";
import MemberProfileViewController from "./member_profile_view_controller";

const props = defineProps(MemberProfileViewProps);
const controller = new MemberProfileViewController(props);

const { state_refs, computed_refs } = controller.getComponentDefinition();

const { content_data } = state_refs;

const {
    formatted_verification_status,
    formatted_two_fa_status,
    formatted_account_status,
    formatted_last_login,
    formatted_password_changed_at,
    formatted_account_locked_until,
    formatted_last_password_reset_request_at,
    formatted_dob,
    formatted_created_at,
    formatted_updated_at,
    formatted_creator,
    formatted_updator
} = computed_refs;
</script>
