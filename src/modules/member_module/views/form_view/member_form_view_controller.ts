import { ref, }                             from "vue";
import BaseFormViewController               from "@/base_classes/form_view/base_form_view_controller";
import MemberUIService                      from "@/modules/member_module/base_logic/member_ui_service";
import MemberFormEventHandler               from "@/modules/member_module/views/form_view/member_form_view_event_handler";
import { CSRF_TOKEN_FOR }                   from "@/enums/constants.enums";


class MemberFormViewController extends BaseFormViewController {
    public service: MemberUIService;
    public event_handler: MemberFormEventHandler;
    public record_id_key: string = "public_id";

    constructor(props: Record<string, any> = {}) {
        super("member_form_view_ui", props);

        this.service            = new MemberUIService(this);
        this.event_handler      = new MemberFormEventHandler(this);

        this.initializeDependencies();
    }

    protected initializeDependencies(): void {
        this.csrf_token_for         = CSRF_TOKEN_FOR.MEMBER;
        this.form_content_data =     this.content_manager?.get("content_resource.member_view_ui.form_view_ui.fieldset") ?? {};
    };

    // Method to get ui state data
    protected getFormUIStateData (): Record<string, any> {  
        const { record = {} } = this.props;
        const { 
            first_name, last_name, email, role_name,
            phone, dob, gender, profile_photo_link, password = ""
        } =  record;

        const { 
            role_options_list = [],
            gender_options_list = [] 
        } = this.form_content_data

        const on_change                 = this.event_handler.handleOnInputchanged.bind(this.event_handler);
        const event_methods             = { on_change };
        this.form_data                  = { first_name, last_name, email, role_name,  phone, dob, gender, profile_photo_link, password: "" };
        this.event_handler.form_data    = JSON.parse(JSON.stringify(this.form_data));

        return {
            csrf_token: ref(null), 
            
            first_name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "first_name", first_name, "text", false, record, event_methods),

            last_name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "last_name", last_name, "text", false, record, event_methods),

            role_name_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "role_name", role_name, "select", false, record, event_methods, { options: role_options_list}),

            email_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "email", email, "email", false, record, event_methods),

            phone_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "phone", phone, "phone_number", false, record, event_methods),

            dob_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "dob", dob, "date", false, record, event_methods),

            gender_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "gender", gender, "select", false, record, event_methods, { options: gender_options_list}),

            profile_photo_link_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "profile_photo_link", profile_photo_link, "text", false, record, event_methods),

            password_input_group_prop: this.props_builder.getInputGroupProps(this.form_content_data, "password", password, "password", false, record, event_methods),
        } 
    }

}

export default MemberFormViewController;

