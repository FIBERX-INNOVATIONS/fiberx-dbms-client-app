
import { ref }                      from "vue";
import { EventBus }                 from "@/utils/gloabal_event_bus";
import BaseController               from "@ui/version_2/base_classes/base_controller";
import InputGroupUI                 from "@ui/version_2/components/InputGroupUI/input_group_ui.vue";
import ButtonUI                     from "@ui/version_2/components/ButtonUI/button_ui.vue";
import BaseFormViewPropsBuilder     from "@/base_classes/form_view/base_form_view_props_builder";
import ColumnsSectionUIEventHandler from "./columns_section_ui_event_handler";
import { ColumnDefinitionInterface} from "@/types/schema_type";


class ColumnsSectionUIController extends BaseController {
    public event_handler: ColumnsSectionUIEventHandler;
    public event_bus = EventBus;

    constructor(props: Record<string, any> = {}) {
        super("columns_section_ui", props);

        this.event_handler = new ColumnsSectionUIEventHandler(this);
    }

    protected getUIComponents(): Record<string, any> {
        return { InputGroupUI, ButtonUI };
    }

    // Method to get ui state data
    protected getUIStateData(): Record<string, any> { 
        const columns_model: ColumnDefinitionInterface[]    = this.props?.columns ? [ ...this.props.columns ] : [];

        this.event_handler.form_data = { columns_array: columns_model }

        return {
            columns_model: ref<ColumnDefinitionInterface[]>(columns_model),

            add_column_btn_props: BaseFormViewPropsBuilder.getObjectAddNewFieldBtnProps(this.event_handler),

            delete_column_btn_props: BaseFormViewPropsBuilder.getObjectRemoveFieldBtnProps,

            get_input_group_props: BaseFormViewPropsBuilder.getInputGroupProps
        } 
    }

    // Method to get ui watchers
    protected getUIWatchers(): Record<string, (new_val: any, old_val: any) => void> { 
        return {
            columns_model: (new_val) => { 
                console.log({ new_val });
                new_val.forEach(this?.cleanColumnModel.bind(this)); 
                this.event_bus.emit("on_columns_array_updated", { columns_array: new_val});
                console.log({ new_val })
            },
        }; 
    }

    // Method to check column type reuires length
    public showLength = (t: string) => { return ["STRING", "CHAR", "ABSTRACT"].includes(t); }

    // Method to check column type reuires variant
    public showVariant = (t: string) => { return ["TEXT", "BLOB"].includes(t); }

    // Method to check column type reuires precision
    public showPrecision = (t: string) => { return ["FLOAT", "DOUBLE", "DECIMAL", "NUMBER"].includes(t); }

    public showValues = (t: string) => { return ["ENUM", "SET"].includes(t); }

    // Method to check if you can select primary key
    public showPrimaryKey = (index: number) => {
        const columns_array         = this.state_refs.columns_model.value || [];
        const primary_key_index     = columns_array.findIndex((obj: ColumnDefinitionInterface) => { return obj.primary_key === true});

        return primary_key_index === index || primary_key_index === -1;
    }

    // Method to check column type reuires auto increment
    public showAutoIncrement = (t: string) => { return ["FLOAT", "DOUBLE", "DECIMAL", "NUMBER", "INTEGER", "BIGINT"].includes(t); }

    // Method to check column type reuires auto increment
    public showUnique = (col: ColumnDefinitionInterface) => { 
        const type_name = col?.type?.name;
        const length    = col?.type?.length;

        // Types that are always allowed to be unique regardless of length
        const ALWAYS_UNIQUE_TYPES = ["BIGINT", "INTEGER", ];

        // Allow unique if type is BIGINT or INTEGER
        if (ALWAYS_UNIQUE_TYPES.includes(type_name)) { return true; }

        // For all other types, unique requires a length and length ≤ 500
        return Number.isInteger(length) && Number(length) <= 500;
    }

    // Method to clean column model
    public cleanColumnModel (col: ColumnDefinitionInterface) {
        const t = col.type?.name;

        if (t && !this.showLength(t))    { delete col.type.length; }

        if (t && !this.showVariant(t))   { delete col.type.variant; }

        if (t && !this.showPrecision(t)) {
            delete col.type.precision;
            delete col.type.scale;
        }

        if (t && !this.showAutoIncrement(t)) { delete col.auto_increment; }
        
        if (col?.name && !this.showUnique(col)) { delete col.unique; }
    }


}

export default ColumnsSectionUIController;