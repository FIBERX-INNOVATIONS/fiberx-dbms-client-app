import { ref, }                                 from "vue";
import { Router, useRouter }                    from "vue-router";
import { CSRF_TOKEN_FOR, LOCAT_STORAGE_FIELDS } from "@/enums/constants.enums";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import AuthService                              from "@/modules/auth_module/base_logic/auth_service";
import DatasourceService                        from "@/modules/datasource_module/base_logic/datasource_service";
import DatasourceFormEventHandler               from "@/modules/datasource_module/views/form_view/datasource_form_view_event_handler";
import MemberAuthManagerUtil                    from "@ui/version_2/utils/member_auth_manager_util";
import ContentManagerUtil                       from "@ui/version_2/utils/content_manager_util";
import InputTransformerUtil                     from "@ui/version_2/utils/input_formatter_util";
import AuthPropsBuilder                         from "@/modules/auth_module/base_logic/auth_props_builder";
import DatasourceFormViewPropsBuilder           from "./datasource_form_view_props_builder";
import InputGroupUI                             from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ToastAlertUI                             from "@ui/version_2/components/AlertUI/ToastAlertUI/toast_alert_ui.vue";
import ButtonUI                                 from "@ui/version_2/components/ButtonUI/button_ui.vue";
import { 
    ButtonUIPropsInterface, 
    InputGroupPropsInterface,
} from "@ui/version_2/types/props_builder_type";


class DatasourceFormViewController extends BaseController {
    public router: Router;
    private member_auth_manager: MemberAuthManagerUtil;
    public service: DatasourceService;
    public auth_service: AuthService;
    public event_handler: DatasourceFormEventHandler;
    public content_manager: ContentManagerUtil;
    public event_bus = EventBus;


    constructor(props: Record<string, any> = {}) {
        super("datasource_form_view", props);

        this.router                     = useRouter();
        this.member_auth_manager        = MemberAuthManagerUtil.getInstance();
        this.content_manager            = ContentManagerUtil.getInstance();
        this.auth_service               = new AuthService (this);
        this.service                    = new DatasourceService(this);
        this.event_handler              = new DatasourceFormEventHandler(this);
    }

    // Method to populate form data with existing record
    private prepareFormData (): Record<string, any> {
        const { 
            name, datasource_type,  host, username, database_name, 
            port, connection_info = {}
        } = this.props?.record || {};

        const connection_info_obj           = this.buildConnectionInfoObject(connection_info);
        const form_data                     = { name, datasource_type,  host, username, database_name, port, connection_info };
        this.event_handler.form_data        = JSON.parse(JSON.stringify(form_data));

        return { form_data, connection_info_obj };
    }

    // Method to build social links object
    public buildConnectionInfoObject(
        record_connection_info: Record<string, string> = {}
    ): Record<string, { key: string; value: string; is_deleted: boolean }> {

        if (!record_connection_info || Object.keys(record_connection_info).length === 0) {
            return {};
        }

        const connection_info_obj: Record<string, { key: string; value: string; is_deleted: boolean }> = {};

        // Correct iteration using for...of
        Object.entries(record_connection_info).forEach(([key, value], index) => {
            const link_id = `Connection_Info_${index + 1}`;
            connection_info_obj[link_id] = { key, value, is_deleted: false };
        });

        return connection_info_obj;
    }

    // Method to get ui components
    protected getUIComponents(): Record<string, any> { 
        return  { InputGroupUI, ToastAlertUI, ButtonUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> {  
        const { connection_info_obj, form_data }    = this.prepareFormData();

        return {
            csrf_token: ref(null), connection_info_obj: ref(connection_info_obj),

            connection_info_label_text: this.content_manager.get("content_resource.datasource_view_ui.datasource_form.fieldset.connection_info_label_text"),

            app_name_input_group_prop: DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, "name", this?.props?.record?.name ?? ""),

            app_datasource_type_input_group_prop: DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, "datasource_type", this?.props?.record?.datasource_type ?? ""),

            app_host_input_group_prop: DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, "host", this?.props?.record?.host ?? ""),

            app_port_input_group_prop: DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, "port", this?.props?.record?.port ?? ""),

            app_username_input_group_prop: DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, "username", this?.props?.record?.username ?? ""),

            app_database_name_input_group_prop: DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, "database_name", this?.props?.record?.database_name ?? ""),

            add_connection_info_props: DatasourceFormViewPropsBuilder.getAddConnectionInfoProps(this.event_handler),

            toast_alert_props: AuthPropsBuilder.getToastAlertProps(this.event_handler),

            btn_props: DatasourceFormViewPropsBuilder.getBtnProps(this.event_handler, true)
        } 
    }

    // Method to handle on mount logic
    protected async handleOnMountedLogic(): Promise<void> {
        const is_fully_authenticated        = this.member_auth_manager.isMemberFullyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);
        const is_partially_authenticated    = this.member_auth_manager.isMemberPartiallyLoggedIn(LOCAT_STORAGE_FIELDS.MEMBER_KEY);

        if(is_partially_authenticated) { await this.router.push("/two-factor-login") }

        if(!is_fully_authenticated) { await this.router.push("/logout") }

        // get csrf token
        await this.auth_service.getFormCsrfToken(CSRF_TOKEN_FOR.DATASOURCE);
    }

    // Methhod to handle on mount logic
    protected async handleBeforeUnmountedLogic(): Promise<void> {
        InputTransformerUtil.resetTempObjectMap();
    }

    // Method to get input group props for social links
    public getConnectionInfoInputGroupProps (field_key: string, existing_value: string | number | boolean = "",): InputGroupPropsInterface {
        return DatasourceFormViewPropsBuilder.getInputGroupProps(this.event_handler, field_key, existing_value)
    }

    // Method to get input group props for social links
    public getDeleteConnectionInfoBtnProps (connection_info_id: string, connection_info_key_input_id: string): ButtonUIPropsInterface {
        return DatasourceFormViewPropsBuilder.getRemoveConnectionInfoProps(this.event_handler, connection_info_id, connection_info_key_input_id)
    }

}

export default DatasourceFormViewController;

