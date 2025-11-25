

import BaseProfileViewController            from "@/base_classes/profile_view/base_profile_view_controller";
import DatasourceProfileViewPropsBuilder    from "./datasource_profile_view_props_builder";
import InputTransformerUtil                 from "@ui/version_2/utils/input_formatter_util";



class DatasourceProfileViewController  extends BaseProfileViewController {

    constructor(props: Record<string, any> = {}) {
        super("datasource_profile_view", props);

        this.content_field_key  = "datasource_view_ui"
        this.route_query_key    = "";
    }

    // Method to to get ui computed data
    protected getCustomChildComputedData(): Record<string, () => any> { 
        const { 
            connection_info = {}, 
            host = "", 
            database_name, 
            datasource_type = "",
        } = this.props.record ?? {};

        return {
            formatted_databse_name_type: () => { return `${database_name} (${datasource_type?.toUpperCase()})` },

            formatted_host: () => { return InputTransformerUtil.formatURLToAnchorHtml(host, host); },

            formatted_connection_info: () => { 
                return Object.keys(connection_info)
                .map(
                    (connection_info_key: string) => { 
                        return `
                        <strong>${connection_info_key.toUpperCase()}:</strong> 
                        <span>${connection_info[connection_info_key]}</span>
                        `
                    }
            )}
        }; 
    }
}

export default DatasourceProfileViewController;