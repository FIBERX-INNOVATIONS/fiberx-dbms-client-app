
import { markRaw }                          from "vue";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                     from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }          from "@ui/version_2/types/component_type";
import { InputUIEventMethodsPropsInterface } from "@ui/version_2/types/props_builder_type";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";
import { ColumnsArrayUpdatedPayloadInterface } from "@/types/app_event_type";


class IndexesSectionUIEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager    = ContentManagerUtil.getInstance();
        this.form_data          = {};
    }

    // Method to send indexes array updated event
    public onIndexesArrayUpdated (): boolean {
        const indexes_array = this.form_data.indexes_array;
        this.controller.event_bus.emit("on_indexes_array_updated", {indexes_array});
        return true
    }

    // Method to handle update columns array
    public handleColumnsArrayUpdate (payload: ColumnsArrayUpdatedPayloadInterface) {
        const { columns_array } = payload;
        this.controller.state_refs.columns_array.value = columns_array;
    }

    // Method to handle Add new indexes field
    public handleAddNewObjectField (event: MouseEvent) {
        const new_row = { fields: [], unique: false };

        this.controller.state_refs.indexes_model.value.push(new_row);
        this.form_data.indexes_array = [ ...this.controller.state_refs.indexes_model.value ];
        
        this.onIndexesArrayUpdated();
    }

    // Method to remove indexes field
    public handleRemoveObjectField (event: MouseEvent, index_index: number, index_input_id: string) {
        this.controller.state_refs.indexes_model.value.splice(Number(index_index), 1);
        this.form_data.indexes_array.splice(Number(index_index), 1);
        this.onIndexesArrayUpdated();
    }

    // Method to handle on input change event
    public handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
        if (!target) return;

        const input_id          = target.id;
        const input_value       = input_model_value ?? target.value;
        const new_form_data     = InputTransformerUtil.buildFormDataObject(input_id, input_value, this.form_data);
        this.form_data          = { ...this.form_data, ...new_form_data };
        const updated_indexes   = this.form_data?.indexes_array || [];

        console.log({ data: this.form_data })

        this.controller.state_refs.indexes_model.value = [...updated_indexes];
        this.onIndexesArrayUpdated();
    }

    // Method to get input field event methods 
    public getInputEventMethods (input_type: string = "text"): InputUIEventMethodsPropsInterface {
        const on_change         = this.handleOnInputchanged.bind(this);
        const event_methods     = { on_change };

        return event_methods
    }

}

export default IndexesSectionUIEventHandler;
