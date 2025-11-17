
import { markRaw }                          from "vue";
import ContentManagerUtil                   from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler                     from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }          from "@ui/version_2/types/component_type";
import { InputUIEventMethodsPropsInterface } from "@ui/version_2/types/props_builder_type";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";


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
        this.controller.event_bus.emit("on_columns_array_updated", { columns_array });
        return true
    }

    // Method to handle Add new column field
    public handleAddNewObjectField (event: MouseEvent) {
        const new_row = { name: "", type: { name: "" }, nullable: true };

        this.controller.state_refs.columns_model.value.push(new_row);
        this.form_data.columns_array = [ ...this.controller.state_refs.columns_model.value ];

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
        const input_value       = input_model_value === undefined ? target.value : input_model_value;
        const new_form_data     = InputTransformerUtil.buildFormDataObject(input_id, input_value, this.form_data);
        this.form_data          = { ...this.form_data, ...new_form_data };
        const updated_columns   = this.form_data?.columns_array || [];

        this.controller.state_refs.columns_model.value = [...updated_columns];
        this.onColumnsArrayUpdated();
    }

    // Method to get input field event methods 
    public getInputEventMethods (input_type: string = "text"): InputUIEventMethodsPropsInterface {
        const on_change         = this.handleOnInputchanged.bind(this);
        const event_methods     = { on_change };

        return event_methods
    }

    // Method to handle on drag start
    public onDragStart(index: number, event: DragEvent) {
        const element = event.currentTarget as HTMLElement;

        this.controller.state_refs.dragged_index.value          = index;
        this.controller.state_refs.drag_start_y.value           = event.clientY;
        this.controller.state_refs.dragged_element_height.value = element.offsetHeight;

        event.dataTransfer?.setData('text/plain', String(index));
        event.dataTransfer!.effectAllowed = 'move';
    }

    // Methos to handle on drag over
    public onDragOver(index: number, event: DragEvent) {
        event.preventDefault(); // allow drop

        const refs              = this.controller.state_refs;
        const columns           = refs.columns_model.value;
        const dragged_index     = refs.dragged_index.value;

        if (dragged_index === null || dragged_index === index) { return; }

        const element       = event.currentTarget as HTMLElement;
        const rect          = element.getBoundingClientRect();
        const midpoint      = rect.top + rect.height / 2;

        // Determine if dragging up or down
        if (dragged_index < index && event.clientY > midpoint) {
            // Dragging down past midpoint → swap
            const item = this.controller.state_refs.columns_model.value[dragged_index]
            this.controller.state_refs.columns_model.value.splice(index, 0, item);
            this.controller.state_refs.dragged_index.value = index;
        } 
        else if (dragged_index > index && event.clientY < midpoint) {
            // Dragging up past midpoint → swap
            const item = this.controller.state_refs.columns_model.value[dragged_index]
            this.controller.state_refs.columns_model.value.splice(index, 0, item);
            this.controller.state_refs.dragged_index.value = index;
        }

        this.controller.state_refs.drag_over_index.value = index;

        // Auto scroll if near viewport edges
        const scroll_threshold  = 50;
        const scroll_speed      = 10;
        const y                 = event.clientY;
        const window_height     = window.innerHeight;

        if (y < scroll_threshold) { window.scrollBy(0, -scroll_speed); }

        else if (y > window_height - scroll_threshold) { window.scrollBy(0, scroll_speed); }
    }
    
    // Methos to handle on drag leave
    public onDragLeave(index: number) {
        if (this.controller.state_refs.drag_over_index.value === index) {
            this.controller.state_refs.drag_over_index.value = null;
        }
    }
    
    // Methos to handle on drop 
    public onDrop(drop_index: number) {
        this.controller.state_refs.dragged_index.value = null;
        this.controller.state_refs.drag_over_index.value = null;
    }
 
}

export default ColumnsSectionUIEventHandler;
