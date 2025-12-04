<template>
    <section id="TwoFactorInfoView" :class="props.wrapper_class_style">
        <ListLoaderUI v-if="is_loading" :number_of_bars="6" />

        <div v-else class="">
            <!-- Secret Key Component -->
            <div :class="props.info_section_wrapper_class_style">
                <span :class="props.key_text_class_style">
                    {{ content_data?.secret_key_label_text }}:
                </span>
                <MaskedRevealUI
                    :secret_data="secret_data"
                    :reveal_duration_in_seconds="10"
                />
            </div>

            <!-- QR Code Display -->
            <div v-if="qr_code_data_url && typeof qr_code_data_url === 'string'" :class="props.info_section_wrapper_class_style">
                <span :class="props.key_text_class_style">
                    {{ content_data?.scan_qr_code_text }}:
                </span>
                <img :src="qr_code_data_url" alt="TOTP QR Code" class="w-48 h-48" />
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
import MemberTwoFactorInfoViewProps from "./member_two_factor_info_view_props";
import MemberTwoFactorInfoViewController from "./member_two_factor_info_view_controller";


const props = defineProps(MemberTwoFactorInfoViewProps);
const controller = new MemberTwoFactorInfoViewController(props);

const { state_refs, computed_refs, components } = controller.getComponentDefinition();

const { ListLoaderUI, MaskedRevealUI } = components

const {
    content_data,
    is_loading,
    secret_data,
    qr_code_data
} = state_refs;

const { qr_code_data_url } = computed_refs;
</script>