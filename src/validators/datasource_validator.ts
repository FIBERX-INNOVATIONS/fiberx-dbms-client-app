import InputValidatorUtil               from "@ui/version_2/utils/input_validator_util";
import { DatasourceRecordInterface }    from "@/types/api_service_type";
import { 
    ValidationResult,
    DatasourceFormDataInputInterface
} from "@/types/validation_type";


class DatasourceValidator {

    /** Validate connection info input */
    public static validateConnectionInfoRecord(key: string, url_value: string): ValidationResult {
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
    public static validateDatasourceInput(
        datasource_input: DatasourceFormDataInputInterface,
        old_record: DatasourceRecordInterface
    ): ValidationResult {
        const { 
            csrf_token, registered_app_public_id, name, datasource_type,  host, username, database_name, 
            port, connection_info = {} 
        } = datasource_input;

        const keys_to_check     = ["name", "datasource_type",  "host", "username", "database_name", "port", "connection_info"];
        const has_input_changed = old_record?.id ? InputValidatorUtil.hasInputChanged(datasource_input, old_record, keys_to_check) : true;

        if (!has_input_changed) {  return { v_state: false, v_msg: "input_has_not_changed" }; }

        const is_update_mode        = !!(old_record?.id && old_record.id > 0);
        const isValidOrInherited    = (value: any, old_value?: any) => { 
            return !(InputValidatorUtil.isEmpty(value) && InputValidatorUtil.isEmpty(old_value)); 
        }

        if (!isValidOrInherited(name, old_record?.name)) {
			return { v_state: false, v_msg: "invalid_input_datasource_name" };
		}

        if (name && !InputValidatorUtil.isValidNamey(name)) {
            return { v_state: false, v_msg: "invalid_input_datasource_name" };
        }

        if (!isValidOrInherited(datasource_type, old_record?.datasource_type)) {
            return { v_state: false, v_msg: "invalid_input_datasource_type" };
        }

        if (!isValidOrInherited(host, old_record?.host)) {
            return { v_state: false, v_msg: "invalid_input_datasource_host" };
        }

        if (!isValidOrInherited(username, old_record?.username) || !InputValidatorUtil.isLowerSnakeCase(username)) {
            return { v_state: false, v_msg: "invalid_input_datasource_username" };
        }

        if (!isValidOrInherited(database_name, old_record?.database_name) || !InputValidatorUtil.isLowerSnakeCase(database_name)) {
            return { v_state: false, v_msg: "invalid_input_datasource_database_name" };
        }

        const port_num = Number(port ?? old_record?.port ?? 0);

        if (!isValidOrInherited(port, old_record?.port) || isNaN(port_num) || port_num <= 0) {
            return { v_state: false, v_msg: "invalid_input_datasource_port" };
        }

        if (!is_update_mode && InputValidatorUtil.isEmpty(registered_app_public_id)) {
            return { v_state: false, v_msg: "invalid_input_datasource_app_public_id" };
        }

        if (connection_info && typeof connection_info !== "object") {
            return { v_state: false, v_msg: "invalid_input_datasource_connection_info" };
        }

        if (connection_info && Object.keys(connection_info).length === 0) {
            return { v_state: false, v_msg: "invalid_input_datasource_connection_info" };
        }

        const invalid_connection_info = Object.entries(connection_info)
        .filter(
            ([key, value]) => {
                const is_placeholder_key = /^Key_\d+$/.test(key);
                return (
                    (InputValidatorUtil.isEmpty(value.toString()) ) || 
                    (InputValidatorUtil.isEmpty(key)) || 
                    (!InputValidatorUtil.isLowerSnakeCase(key)) ||
                    is_placeholder_key
                )
            }
        ).map(([key]) => key);

        if (connection_info && invalid_connection_info.length > 0) {
            return { v_state: false, v_msg: "invalid_input_datasource_connection_info" };
        }

        return { v_state: true, v_msg: "valid_input" };
    }


}

export default DatasourceValidator