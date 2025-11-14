
import { markRaw }                          from "vue";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                     from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }          from "@ui/version_2/types/component_type";
import { InputUIEventMethodsPropsInterface } from "@ui/version_2/types/props_builder_type";
import InputTransformerUtil from "@ui/version_2/utils/input_formatter_util";


class ColumnsSectionUIEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;

    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager    = ContentManagerUtil.getInstance();
        this.form_data          = {};
    }

    // Method to send columns array updated event
    public onColumnsArrayUpdated (): boolean {
        const columns_array = this.form_data.columns_array;
        this.controller.event_bus.emit("on_columns_array_updated", {columns_array});
        return true
    }

    // Method to handle Add new column field
    public handleAddNewObjectField (event: MouseEvent) {
        const columns   = this.controller.state_refs?.columns_model?.value || [];

        if (columns.length) { 
            const last = columns[columns.length - 1];

            // return // error message payload
        }

        this.controller.state_refs.columns_model.value.push({
            name: "",
            type: { name: "" },
            nullable: true,
        });
        this.onColumnsArrayUpdated();
    }

    // Method to remove column field
    public handleRemoveObjectField (event: MouseEvent, column_index: number, column_input_id: string) {
        this.controller.state_refs.columns_model.value.splice(Number(column_index), 1);
        this.form_data.columns_array.splice(Number(column_index), 1);
        this.onColumnsArrayUpdated();
    }

    // Method to handle on input change event
    public handleOnInputchanged(event: Event | InputEvent, input_model_value: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
        if (!target) return;

        const existing_columns  = this.controller.state_refs.columns_model.value;
        const input_id          = target.id;
        const input_value       = input_model_value ?? target.value;
        const new_form_data     = InputTransformerUtil.buildFormDataObject(input_id, input_value, this.form_data);
        this.form_data          = { ...this.form_data, ...new_form_data };
        const updated_columns   = this.form_data?.columns_array || [];

        console.log({ data: this.form_data })
        this.controller.state_refs.columns_model.value = [...updated_columns];
        this.onColumnsArrayUpdated();
    }

    // Method to get input field event methods 
    public getInputEventMethods (input_type: string = "text"): InputUIEventMethodsPropsInterface {
        const on_change         = this.handleOnInputchanged.bind(this);
        const event_methods     = { on_change };

        return event_methods
    }
 
}

export default ColumnsSectionUIEventHandler;
