import { 
    PermissionType, 
    SchemaDefinitionInterface, 
    IndexDefinitionInterface ,
    ColumnDefinitionInterface
} from "./schema_type";




export interface LoginFormDataInterface  {
    username: string;
    password: string;
    csrf_token: string;
}

export interface TwoFactorFormDataInterface  {
    otp_code: string;
    csrf_token: string;
}

export interface RequestQueryInputInterface {
    page: number;
    size: number;
    order_by: string;
    order_direction: string;
    keyword?: string | null;
    preview_only?: string | boolean;
    app_id?: string;
}

export interface RegisteredAppFormDataInterface {
  prefix: string;
  csrf_token: string;
  name: string;
  description?: string;
  base_url?: string; 
  logo_url?: string; 
  social_links?: Record<string, string>; 
  social_links_array: { key: string, value: string }[]
}

export interface DatasourceFormDataInterface {
    csrf_token: string;
    registered_app_public_id: string;
    name: string; 
    datasource_type: string;
    host: string;
    username: string; 
    database_name: string;
    port: string;
    connection_info: Record<string, any>
    connection_info_array: { key: string, value: string }[]
}

export interface RegisteredAppSchemaFormDataInterface {
    csrf_token: string;
    app_public_id: string;
	model_name: string;
	datasource_id: number
	primary_key: string;
	migration_priority: number; 
	permissions: string[];
	columns: Record<string, ColumnDefinitionInterface>;
    columns_array: ColumnDefinitionInterface[];
	indexes: IndexDefinitionInterface[];   

}