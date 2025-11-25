
import BaseProfileViewController    from "@/base_classes/profile_view/base_profile_view_controller";
import { IndexDefinitionInterface } from "@/types/schema_type";


class RegisteredAppSchemaProfileViewController extends BaseProfileViewController {

    constructor(props: Record<string, any> = {}) {
        super("registered_app_schema_profile_view", props);

        this.content_field_key  = "registered_app_schema_view_ui"
        this.route_query_key    = "schema_profile";
    }


    // Computed formatted data
    protected getCustomChildComputedData(): Record<string, () => any> {
        const {
            columns = {},
            indexes = [],
            schema_datasource = {},
        } = this.props.record ?? {};

        return {
            formatted_columns: () => {
                return Object.keys(columns).map(
                    (col_name: string) => {
                        const col = columns[col_name];
                        return `<strong>${col_name}</strong> (${col.type?.name}${col.type?.length ? `:${col.type.length}` : ""})`;
                    }
                );
            },

            formatted_indexes: () => { 
                return indexes.map(
                    (idx: IndexDefinitionInterface) => { return idx.fields.join(", "); } 
                ).join(" | ");
            },

            formatted_schema_datasource: () => {
                return `${schema_datasource?.name} (${schema_datasource?.datasource_type?.toUpperCase()})`
            },
        };
    }
}

export default RegisteredAppSchemaProfileViewController;
