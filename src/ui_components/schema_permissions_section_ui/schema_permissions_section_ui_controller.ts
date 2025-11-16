
import { ref }                                  from "vue";
import { EventBus }                             from "@/utils/gloabal_event_bus";
import BaseController                           from "@ui/version_2/base_classes/base_controller";
import InputGroupUI                             from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import BaseFormViewPropsBuilder                 from "@/base_classes/form_view/base_form_view_props_builder";
import SchemaPermissionsSectionUIEventHandler   from "./schema_permissions_section_ui_event_handler";

import { SchemaPermissionsUpdatedPayloadInterface } from "@/types/app_event_type";
import { PermissionType } from "@/types/schema_type";


class SchemaPermissionsSectionUIController extends BaseController {
    public event_handler: SchemaPermissionsSectionUIEventHandler;
    public event_bus = EventBus;

    constructor(props: Record<string, any> = {}) {
        super("schema_permissions_ui", props);

        this.event_handler = new SchemaPermissionsSectionUIEventHandler(this);
    }

    protected getUIComponents(): Record<string, any> {
        return { InputGroupUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> { 
        const permissions_array: PermissionType[]    = this.props?.permissions ? [ ...this.props.permissions ] : [];

        this.event_handler.form_data = { permissions_array }

        return {
            permissions_array: ref<PermissionType[]>(permissions_array),

            get_input_group_props: BaseFormViewPropsBuilder.getInputGroupProps
        } 
    }

    // Method to get ui watchers
    protected getUIWatchers(): Record<string, (new_val: any, old_val: any) => void> { 
        return {
            permissions_array: (new_val) => { 
                this.event_bus.emit("on_schema_permissions_updated", { permissions_array: new_val });
            },
        }; 
    }

}

export default SchemaPermissionsSectionUIController;