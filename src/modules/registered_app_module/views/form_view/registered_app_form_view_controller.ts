
import { ref } from "vue";
import BaseFormViewController               from "@/base_classes/form_view/base_form_view_controller";
import RegisteredAppService                 from "@/modules/registered_app_module/base_logic/registered_app_service";
import RegisteredAppFormViewEventHandler    from "./registered_app_form_view_event_handler";
import { CSRF_TOKEN_FOR }                   from "@/enums/constants.enums";

class RegisteredAppFormViewController extends BaseFormViewController {
    public service: RegisteredAppService;
    public event_handler: RegisteredAppFormViewEventHandler;
    public record_id_key: string = "id";

    constructor(props: Record<string, any> = {}) {
        super("registered_app_form_view_ui", props);

        this.service            = new RegisteredAppService(this);
        this.event_handler      = new RegisteredAppFormViewEventHandler(this);

        this.initializeDependencies();
    }

    protected initializeDependencies(): void {
        this.csrf_token_for         = CSRF_TOKEN_FOR.REGISTER_APP;
        this.form_content_data =     this.content_manager?.get("content_resource.registered_app_view_ui.form_view_ui.fieldset") ?? {};
    };

    // Method to get ui form state data
    protected getFormUIStateData (): Record<string, any> { 
        const { record = {} } = this.props;
        const { name = "", prefix = "", base_url = "", logo_url = "", description, social_links = {} } =  record

        const social_link_array         = this.event_handler.buildSocialLinkArray(social_links);
        const prefix_read_only_state    = prefix ? true : false;
        const on_change                 = this.event_handler.handleOnInputchanged.bind(this.event_handler);
        const event_methods             = { on_change };

        this.form_data                  = { name, prefix, base_url, logo_url, description, social_links, social_link_array };
        this.event_handler.form_data    = JSON.parse(JSON.stringify(this.form_data));

        return {
            social_links_array: ref(social_link_array),

            social_links_label_text: this.form_content_data["social_links_label_text"],

            no_info_text: this.form_content_data["no_social_links_text"],

            app_name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "name", name, "text", false, record, event_methods),

            app_prefix_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "prefix", prefix, "text", prefix_read_only_state, record, event_methods),

            app_base_url_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "base_url", base_url, "text", false, record, event_methods),

            app_logo_url_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "logo_url", logo_url, "text", false, record, event_methods),

            app_description_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "description", description, "text_area", false, record, event_methods),

            add_social_link_btn_props: this.props_builder.getObjectAddNewFieldBtnProps(this.event_handler),

        }

    }

}

export default RegisteredAppFormViewController;

