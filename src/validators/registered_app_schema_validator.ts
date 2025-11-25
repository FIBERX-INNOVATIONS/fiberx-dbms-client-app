import InputValidatorUtil                           from "@ui/version_2/utils/input_validator_util";
import { ValidationResult }                         from "@/types/validation_type";                 
import { RegisteredAppSchemaFormDataInterface }     from "@/types/api_service_type";

import { 
    ColumnNameType,
    ColumnDefinitionInterface,

} from "@/types/schema_type";

import { 
    COLUMN_NAME_TYPE_OPTIONS,
    SCHEMA_PERMISSIONS_ACTIONS,
    REFERENCE_TABLE_ACTIONS
} from "@/enums/constants.enums";


class RegisteredAppSchemaValidator {

    // ✅ Validate columns records
    private static validateColumns(columns?: Record<string, ColumnDefinitionInterface>): ValidationResult {
        if (!columns || typeof columns !== "object" || Object.keys(columns).length === 0) {
            return { v_state: false, v_msg: "invalid_input_columns" };
        }

        let primary_key_count = 0;
        const valid_column_name_regex    = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

        for (const [col_name, col_def] of Object.entries(columns)) {

            if (col_def.primary_key) { primary_key_count++; }

            // 1️⃣ Validate column name
            if (!valid_column_name_regex.test(col_name)) {
                return { v_state: false, v_msg: `invalid_input_column_name_[${col_name}]` };
            }

            // 2️⃣ Validate column definition object
            if (!col_def || typeof col_def !== "object") {
                return { v_state: false, v_msg: `invalid_input_column_definition_[${col_name}]` };
            }

            // 3️⃣ Validate type
            if (!col_def.type || typeof col_def.type !== "object") {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_[${col_name}]` };
            }

            // 4️⃣ Validate column type name
            const type_name = (col_def.type.name || "").toUpperCase();

            if (!col_def.type.name || typeof col_def.type.name !== "string") {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_name_missing_[${col_name}]` };
            }

            if (!COLUMN_NAME_TYPE_OPTIONS.find( (obj) => { return obj.value === type_name as ColumnNameType }) ) {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_name_[${col_name}]` };
            }

            // 5️⃣ Optional numeric validations
            if (col_def.type.length !== undefined && (!Number.isInteger(col_def.type.length) || col_def.type.length <= 0)) {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_length_[${col_name}]` };
            }

            if (col_def.type.precision !== undefined && (typeof col_def.type.precision !== "number" || col_def.type.precision < 0)) {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_precision_[${col_name}]` };
            }

            if (col_def.type.scale !== undefined && (typeof col_def.type.scale !== "number" || col_def.type.scale < 0)) {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_scale_[${col_name}]` };
            }

            // 6️⃣ Validate ENUM or ARRAY types
            if (type_name === "ENUM" && (!Array.isArray(col_def.type.values) || col_def.type.values.length === 0)) {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_enum_values_[${col_name}]` };
            }

            if (type_name === "ARRAY" && (!col_def.type.element_type || typeof col_def.type.element_type !== "object")) {
                return { v_state: false, v_msg: `invalid_input_column_definition_type_array_element_type_[${col_name}]` };
            }

            // 7️⃣ Validate references (if exists)
            if (col_def?.references) {
                const ref = col_def?.references;
                const valid_on_delete_action = REFERENCE_TABLE_ACTIONS.find((obj) => { return obj?.value === (ref?.on_delete?.toUpperCase()) })
                const valid_on_update_action = REFERENCE_TABLE_ACTIONS.find((obj) => { return obj?.value === (ref?.on_update?.toUpperCase()) })

                if (!ref.table || typeof ref.table !== "string" || !InputValidatorUtil.isLowerSnakeCase(ref.table)) {
                    return { v_state: false, v_msg: `invalid_input_column_definition_reference_table_name_[${col_name}]` };
                }
                if (!ref.column || typeof ref.column !== "string") {
                    return { v_state: false, v_msg: `invalid_input_column_definition_reference_table_column_[${col_name}]` };
                }
                if (ref.on_delete && !valid_on_delete_action) {
                    return { v_state: false, v_msg: `invalid_input_column_definition_reference_on_delete_[${col_name}]` };
                }
                if (ref.on_update && !valid_on_update_action) {
                    return { v_state: false, v_msg: `invalid_input_column_definition_reference_on_update_[${col_name}]` };
                }
            }

            // 8️⃣ Validate default values type consistency (basic check)
            if (col_def?.default !== undefined && col_def?.default !== null && (typeof col_def?.default === "object" || typeof col_def?.default === "function")) {
                return { v_state: false, v_msg: `invalid_input_column_definition_default_[${col_name}]` };
            }
        }

        if (primary_key_count > 1) {
            return { v_state: false, v_msg: "invalid_input_multiple_primary_keys" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }

    /** Validate connection info input */
    public static validateColumnsRecord(key: string, url_value: string): ValidationResult {
        if (InputValidatorUtil.isEmpty(key)) {
            return { v_state: false, v_msg: "invalid_input_connection_info_key" };
        }

        if (
            InputValidatorUtil.isEmpty(url_value)
        ) {
            return { v_state: false, v_msg: "invalid_input_connection_info_value" };
        }

        if (!InputValidatorUtil.isLowerSnakeCase(key)) {
            return { v_state: false, v_msg: "invalid_input_connection_info_key_case" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }

    /** Validate registered app input */
    public static validateRegisteredAppSchemaInput(
        schema_input: RegisteredAppSchemaFormDataInterface,
        old_record: Record<string, any>
    ): ValidationResult {
        const { 
            csrf_token, model_name, datasource_id, app_public_id,
            primary_key, migration_priority, permissions, columns, indexes 
        } = schema_input;

        const keys_to_check     = ["model_name", "primary_key", "migration_priority", "permissions", "columns", "indexes", "datasource_type", "database_name,"];
        const has_input_changed = old_record?.id ? InputValidatorUtil.hasInputChanged(schema_input, old_record, keys_to_check) : true;

        if (!has_input_changed) {  return { v_state: false, v_msg: "input_has_not_changed" }; }

        const is_update_mode        = !!(old_record?.id && old_record.id > 0);
        const isValidOrInherited    = (value: any, old_value?: any) => { 
            return !(InputValidatorUtil.isEmpty(value) && InputValidatorUtil.isEmpty(old_value)); 
        }

        if (!isValidOrInherited(app_public_id, old_record?.schema_app?.public_id)) {
            return { v_state: false, v_msg: "invalid_input_app_schema_app_id" };
        }

        // Model Name
        if (!isValidOrInherited(model_name) || !InputValidatorUtil.isLowerSnakeCase(model_name)) {
            return { v_state: false, v_msg: "invalid_input_app_schema_model_name" };
        }

        // Migration Priority
        if (isNaN(Number(migration_priority)) || Number(migration_priority) <= 0) {
            return { v_state: false, v_msg: "invalid_input_app_schema_migration_priority" };
        }

        // Datasource ID
        if (!datasource_id || datasource_id <= 0) {
            return { v_state: false, v_msg: "invalid_input_datasource_id" };
        }

        // Permissions / Columns / Indexes
        if (!Array.isArray(permissions) || permissions.length === 0) {
            return { v_state: false, v_msg: "invalid_input_app_schema_permissions" };
        }
 
        const is_valid_permissions = permissions.every((el: string) => { return SCHEMA_PERMISSIONS_ACTIONS.find((obj) => { return obj.value === el}); });

        if(!is_valid_permissions) {
            return { v_state: false, v_msg: "invalid_input_app_schema_permissions" };
        }

        if (!columns || typeof columns !== "object" || Object.keys(columns).length === 0) {
            return { v_state: false, v_msg: "invalid_input_columns" };
        }

        const column_names      = Object.keys(columns);
        const invalid_columns   = Object.keys(columns).filter(c => !InputValidatorUtil.isLowerSnakeCase(c));

        if (invalid_columns.length > 0) {
            return { v_state: false, v_msg: "invalid_input_app_schema_column_names" };
        }

        // Primary Key
        if (!column_names.includes(primary_key)) {
            return { v_state: false, v_msg: "invalid_input_app_schema_primary_key" };
        }

        // Primary Key
        if (!isValidOrInherited(primary_key)) {
            return { v_state: false, v_msg: "invalid_input_app_schema_primary_key" };
        }

        const { v_state, v_msg } = this.validateColumns(columns);

        if(!v_state) { return { v_state, v_msg }; }

        // 3️⃣ Timestamp rule validation
        const has_created = !!columns["created_at"];
        const has_updated = !!columns["updated_at"];

        if (has_created !== has_updated) {
            return { v_state: false, v_msg: "invalid_input_app_schema_timestamp_pair" };
        }

        if (!Array.isArray(indexes))  {
            return { v_state: false, v_msg: "invalid_input_app_schema_indexes" };
        }

        // Ensure each index has valid structure and valid column references
        const invalid_indexes = indexes.filter((idx: any) => {
            if (!Array.isArray(idx.fields) || idx.fields.length === 0) { return true; }

            // Check if all fields exist in columns
            const invalid_fields = idx.fields.filter(
                (field: string) => !columns.hasOwnProperty(field)
            );

            return invalid_fields.length > 0;
        });

        if (invalid_indexes.length > 0) {
            return { v_state: false, v_msg: "invalid_input_app_schema_index_format" };
        }

    

        return { v_state: true, v_msg: "valid_input" };
    }


}

export default RegisteredAppSchemaValidator