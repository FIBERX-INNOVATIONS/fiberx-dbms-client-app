
import { markRaw }                          from "vue";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                     from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }          from "@ui/version_2/types/component_type";
import { InputUIEventMethodsPropsInterface } from "@ui/version_2/types/props_builder_type";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";
import { SchemaPermissionsUpdatedPayloadInterface } from "@/types/app_event_type";


class SchemaPermissionsSectionUIEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager    = ContentManagerUtil.getInstance();
        this.form_data          = {};
    }


    // Method to handle on input change event
    public handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
        if (!target) return;

        const input_id              = target.id;
        const input_value           = input_model_value ?? target.value;
        const new_form_data         = InputTransformerUtil.buildFormDataObject(input_id, input_value, this.form_data);
        this.form_data              = { ...this.form_data, ...new_form_data };
        const updated_permissions   = this.form_data?.permissions_array || [];

        this.controller.state_refs.permissions_array.value = [ ...updated_permissions ];
    }

    // Method to get input field event methods 
    public getInputEventMethods (input_type: string = "text"): InputUIEventMethodsPropsInterface {
        const on_change         = this.handleOnInputchanged.bind(this);
        const event_methods     = { on_change };

        return event_methods
    }

}

export default SchemaPermissionsSectionUIEventHandler;
