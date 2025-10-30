import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { CSRF_TOKEN_FOR, LOCAT_STORAGE_FIELDS } from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import AuthService                              from "@/modules/auth_module/base_logic/auth_service";
import RegisteredAppService                     from "@/modules/registered_app_module/base_logic/registered_app_service";
import RegisteredAppFormViewEventHandler            from "@/modules/registered_app_module/views/form_view/registered_app_form_view_event_handler";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import AuthPropsBuilder                         from "@/modules/auth_module/base_logic/auth_props_builder";
import RegisteredAppFormViewPropsBuilder        from "./registered_app_form_view_props_builder";
import InputGroupUI                             from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ToastAlertUI                             from "@ui/version_2/components/AlertUI/ToastAlertUI/toast_alert_ui.vue";
import ButtonUI                                 from "@ui/version_2/components/ButtonUI/button_ui.vue";
import { 
    ButtonUIPropsInterface, 
    InputGroupPropsInterface,
} from "@ui/version_2/types/props_builder_type";




class RegisteredAppFormViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public service: RegisteredAppService;
    public auth_service: AuthService;
    public event_handler: RegisteredAppFormViewEventHandler;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;


    constructor(props: Record<string, any> = {}) {
        super("registered_app_form_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_manager            = ContentManagerUtil.getInstance();
        this.auth_service               = new AuthService (this);
        this.service                    = new RegisteredAppService(this);
        this.event_handler              = new RegisteredAppFormViewEventHandler(this);
    }

    // Method to populate form data with existing record
    private prepareFormData (): Record<string, any> {
        const { 
            name = "", prefix = "", base_url = "", 
            logo_url = "", description, social_links = {} 
        } = this.props?.record || {};

        const social_link_obj           = this.buildSocialLinkObject(social_links);
        const form_data                 = {name, prefix, base_url, logo_url, description, social_links };
        this.event_handler.form_data    = JSON.parse(JSON.stringify(form_data));

        return { form_data, social_link_obj };
    }

    // Method to build social links object
    public buildSocialLinkObject(
        record_social_links: Record<string, string> = {}
    ): Record<string, { key: string; url_value: string; is_deleted: boolean }> {

        if (!record_social_links || Object.keys(record_social_links).length === 0) {
            return {};
        }

        const social_link_obj: Record<string, { key: string; url_value: string; is_deleted: boolean }> = {};

        // Correct iteration using for...of
        Object.entries(record_social_links).forEach(([key, url_value], index) => {
            const link_id = `Link_${index + 1}`;
            social_link_obj[link_id] = { key, url_value, is_deleted: false };
        });

        return social_link_obj;
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { InputGroupUI, ToastAlertUI, ButtonUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {  
        const { social_link_obj, form_data }    = this.prepareFormData();
        const { prefix = "" }                   = form_data;
        const prefix_read_only_state            = prefix ? true : false;

        return {
            csrf_token: ref(null), social_links_obj: ref(social_link_obj),

            social_links_label_text: this.content_manager.get("content_resource.registered_app_view_ui.app_form.fieldset.social_links_label_text"),

            app_name_input_group_prop: RegisteredAppFormViewPropsBuilder.getInputGroupProps(this.event_handler, "name", this?.props?.record?.name ?? ""),

            app_prefix_input_group_prop: RegisteredAppFormViewPropsBuilder.getInputGroupProps(this.event_handler, "prefix", this?.props?.record?.prefix ?? "", "text", prefix_read_only_state),

            app_base_url_input_group_prop: RegisteredAppFormViewPropsBuilder.getInputGroupProps(this.event_handler, "base_url", this?.props?.record?.base_url ?? ""),

            app_logo_url_input_group_prop: RegisteredAppFormViewPropsBuilder.getInputGroupProps(this.event_handler, "logo_url", this?.props?.record?.logo_url ?? ""),

            app_description_input_group_prop: RegisteredAppFormViewPropsBuilder.getInputGroupProps(this.event_handler, "description", this?.props?.record?.description ?? "", "text_area"),

            add_social_link_props: RegisteredAppFormViewPropsBuilder.getAddSocialLinkProps(this.event_handler),

            toast_alert_props: AuthPropsBuilder.getToastAlertProps(this.event_handler),

            btn_props: RegisteredAppFormViewPropsBuilder.getBtnProps(this.event_handler, true)
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }

        // get csrf token
        await this.auth_service.getFormCsrfToken(CSRF_TOKEN_FOR.REGISTER_APP);
    }

    // Methhod to handle on mount logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        InputTransformerUtil.resetTempObjectMap();
    }

    // Method to get input group props for social links
    public getSocialLinkInputGroupProps (field_key: string, existing_value: string | number | boolean = "",): InputGroupPropsInterface {
        return RegisteredAppFormViewPropsBuilder.getInputGroupProps(this.event_handler, field_key, existing_value)
    }

    // Method to get input group props for social links
    public getDeleteSocialLinkBtnProps (social_link_id: string, social_link_key_input_id: string): ButtonUIPropsInterface {
        return RegisteredAppFormViewPropsBuilder.getRemoveSocialLinkProps(this.event_handler, social_link_id, social_link_key_input_id)
    }

}

export default RegisteredAppFormViewController;

