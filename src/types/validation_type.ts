import { 
    PermissionType, 
    SchemaDefinitionInterface, 
    IndexDefinitionInterface ,
    ColumnDefinitionInterface,
    SchemaAccessDefinitionInterface
} from "./schema_type";

export interface ValidationResult {
    v_state: boolean;
    v_msg: string;
}

export interface RequestQueryInputInterface {
    page: number;
    size: number;
    order_by: string;
    order_direction: string;
    keyword?: string | null;
    preview_only?: string | boolean;
    app_id?: string;
    hard_reset?: string;
}

export interface LoginFormDataInputInterface  {
    username: string;
    password: string;
    csrf_token: string;
}

export interface TwoFactorFormDataInputInterface  {
    otp_code: string;
    csrf_token: string;
}

export interface RegisteredAppFormDataInputInterface {
  prefix: string;
  csrf_token: string;
  name: string;
  description?: string;
  base_url?: string; 
  logo_url?: string; 
  social_links?: Record<string, string>; 
  urls_string?: string;
  urls?: string[];
  social_links_array: { key: string, value: string }[]
}

export interface DatasourceFormDataInputInterface {
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

export interface RegisteredAppSchemaFormDataInputInterface {
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

export interface SchemaAccessFormDataInputInterface {
    csrf_token: string,
    app_public_id: string;
    schema_access_array: SchemaAccessDefinitionInterface[]
}

export interface SchemaAccessUpdateFormDataInputInterface {
    csrf_token: string;
    schema_name: string;
    permissions: PermissionType[];
}

export interface MemberFormDataInputInterface {
  csrf_token: string;
  first_name: string;
  last_name: string;
  email: string;
  role_name: string;
  phone?: string;
  dob?: string;
  gender?: string;
  profile_photo_link?: string;
  password?: string; 
}

export interface RolePermissionsFormDataInputData {
    csrf_token: string;
    role_id: number
    permission_ids: number[]
}