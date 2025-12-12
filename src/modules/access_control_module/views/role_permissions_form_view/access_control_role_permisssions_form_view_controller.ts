import { ref, }                                             from "vue";
import { CSRF_TOKEN_FOR }                                   from "@/enums/constants.enums";
import BaseFormViewController                               from "@/base_classes/form_view/base_form_view_controller";
import AccessControlUIService                               from "@/modules/access_control_module/base_logic/access_control_ui_service";
import AccessControlRolePermissionsFormViewEventHandler     from "@/modules/access_control_module/views/role_permissions_form_view/access_control_role_permisssions_form_view_event_handler";
import BaseFormViewPropsBuilder                             from "@/base_classes/form_view/base_form_view_props_builder";


class AccessControlRolePermissionsFormViewController extends BaseFormViewController {
    public service: AccessControlUIService;
    public event_handler: AccessControlRolePermissionsFormViewEventHandler;
    public record_id_key: string = "id";

    constructor(props: Record<string, any> = {}) {
        super("access_control_role_permissions_form_view", props);

        this.service            = new AccessControlUIService(this);
        this.event_handler      = new AccessControlRolePermissionsFormViewEventHandler(this);

        this.initializeDependencies();
    }

    protected initializeDependencies(): void {
        this.csrf_token_for         = CSRF_TOKEN_FOR.ACCESS_CONTROL;
        this.form_content_data =     this.content_manager?.get("content_resource.access_control_view_ui.form_view_ui.fieldset") ?? {};
    };

    // Method to get ui state data
    protected getFormUIStateData (): Record<string, any> {  
        const { record = {} } = this.props;
        const { id: role_id } = record;

        this.form_data                  = { role_id, permission_ids: [] };
        this.event_handler.form_data    = JSON.parse(JSON.stringify(this.form_data));

        return {
            csrf_token: ref(null), 

            unassigned_permissions: ref([]),

            has_more: ref(false),

            is_loading: ref(false),

            current_page: ref(1),
            
            total_pages: ref(0),
            
            page_size: ref(100),

            get_input_group_props: BaseFormViewPropsBuilder.getInputGroupProps
        } 
    }

    // Method to handle on mount logic
    protected async formMountedLogic (): Promise<void> { 
        await this.event_handler.handleFetchRecords();
    }

}

export default AccessControlRolePermissionsFormViewController;

