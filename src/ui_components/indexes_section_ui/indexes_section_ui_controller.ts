
import { ref }                      from "vue";
import { EventBus }                 from "@/utils/gloabal_event_bus";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import InputGroupUI                 from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ButtonUI                     from "@ui/version_2/components/ButtonUI/button_ui.vue";
import BaseFormViewPropsBuilder     from "@/base_classes/form_view/base_form_view_props_builder";
import IndexesSectionUIEventHandler from "./indexes_section_ui_event_handler";

import { ColumnsArrayUpdatedPayloadInterface } from "@/types/app_event_type";
import { 
    ColumnDefinitionInterface, 
    IndexDefinitionInterface
} from "@/types/schema_type";


class IndexesSectionUIController extends BaseController {
    public event_handler: IndexesSectionUIEventHandler;
    public event_bus = EventBus;

    constructor(props: Record<string, any> = {}) {
        super("indexes_section_ui", props);

        this.event_handler = new IndexesSectionUIEventHandler(this);
    }

    protected getUIComponents(): Record<string, any> {
        return { InputGroupUI, ButtonUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> { 
        const columns_array: ColumnDefinitionInterface[]    = this.props?.columns ? [ ...this.props.columns ] : [];
        const indexes_model: IndexDefinitionInterface[]     = this.props?.indexes ? [ ...this.props.indexes ] : [];

        this.event_handler.form_data = { indexes_array: indexes_model }

        return {
            columns_array: ref<ColumnDefinitionInterface[]>(columns_array),

            indexes_model: ref<IndexDefinitionInterface[]>(indexes_model),

            add_index_btn_props: BaseFormViewPropsBuilder.getObjectAddNewFieldBtnProps(this.event_handler),

            delete_index_btn_props: BaseFormViewPropsBuilder.getObjectRemoveFieldBtnProps,

            get_input_group_props: BaseFormViewPropsBuilder.getInputGroupProps
        } 
    }

    // Method to get ui watchers
    protected getUIWatchers(): Record<string, (new_val: any, old_val: any) => void> { 
        return {
            indexes_model: (new_val) => { 
                // new_val.forEach(this?.cleanColumnModel.bind(this)); 
                this.event_bus.emit("on_indexes_array_updated", { indexes_array: new_val});
            },
        }; 
    }

    protected async handleOnMountedLogic(): Promise<void> {
        this.event_bus.on("on_columns_array_updated", async (payload: ColumnsArrayUpdatedPayloadInterface) => {
            this.event_handler.handleColumnsArrayUpdate(payload);
        });
    }


}

export default IndexesSectionUIController;