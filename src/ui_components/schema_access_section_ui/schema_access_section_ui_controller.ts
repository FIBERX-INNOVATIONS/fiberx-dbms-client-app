
import { ref }                              from "vue";
import { EventBus }                         from "@/utils/gloabal_event_bus";
import BaseController                       from "@ui/version_2/base_classes/base_controller";
import InputGroupUI                         from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ButtonUI                             from "@ui/version_2/components/ButtonUI/button_ui.vue";
import BaseFormViewPropsBuilder             from "@/base_classes/form_view/base_form_view_props_builder";
import SchemaAccessSectionUIEventHandler    from "./schema_access_section_ui_event_handler";

import { SchemaAccessDefinitionInterface}   from "@/types/schema_type";


class SchemaAccessSectionUIController extends BaseController {
    public event_handler: SchemaAccessSectionUIEventHandler;
    public event_bus = EventBus;

    constructor(props: Record<string, any> = {}) {
        super("schema_access_section_ui", props);

        this.event_handler = new SchemaAccessSectionUIEventHandler(this);
    }

    protected getUIComponents(): Record<string, any> {
        return { InputGroupUI, ButtonUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> { 
        const schema_access_array: SchemaAccessDefinitionInterface[]    = this.props?.schema_access_definition ? [ ...this.props.schema_access_definition ] : [];
        const is_edit_mode = (this.props.app_public_id && this.props?.schema_access_definition && this.props?.schema_access_definition?.length ? true : false);

        this.event_handler.form_data = { schema_access_array };
        console.log({
            schema_access_array,
            props_schema_access_array: this.props.schema_access_definition,
            form_data_schema_access_array: this.event_handler.form_data
        });

        return {
            is_edit_mode: ref(is_edit_mode),

            schema_access_array: ref<SchemaAccessDefinitionInterface[]>(schema_access_array),

            add_new_schema_access_btn_props: BaseFormViewPropsBuilder.getObjectAddNewFieldBtnProps(this.event_handler),

            delete_schema_access_btn_props: BaseFormViewPropsBuilder.getObjectRemoveFieldBtnProps,

            get_input_group_props: BaseFormViewPropsBuilder.getInputGroupProps
        } 
    }

    // Method to get ui watchers
    protected getUIWatchers(): Record<string, (new_val: any, old_val: any) => void> { 
        return {
            schema_access_array: (new_val) => { 
                this.event_bus.emit("on_schema_access_arrayupdated", { schema_access_array: new_val });
            },
        }; 
    }
}

export default SchemaAccessSectionUIController;