import { 
    PermissionType, 
    SchemaDefinitionInterface, 
    IndexDefinitionInterface ,
    ColumnDefinitionInterface,
    SchemaAccessDefinitionInterface
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
    hard_reset?: string;
}


export interface PaginationResponseInterface<T> {
    total_items: number;
    total_pages: number;
    current_page: number;
    records: T
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

export interface SchemaAccessFormInputInterface {
    csrf_token: string,
    app_public_id: string;
    schema_access_array: SchemaAccessDefinitionInterface[]
}

export interface SchemaAccessUpdateFormInputInterface {
    csrf_token: string;
    schema_name: string;
    permissions: PermissionType[];
}

export interface MemberFormInputInterface {
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

export interface MemberRecordInterface {
    public_id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean | number;
    profile_photo_link: string;
    full_name: string;
    member_preview: string;
    dob: string | null
}

export interface RoleRecordInterface {
    id: number;
    name: string;
    symbol: string;
    member_count: number,
    created_at?: string;
    updated_at?: string | null,
    creator?: MemberRecordInterface;
    updator?: MemberRecordInterface;
}

export interface PermissionRecordInterface {
    id: number;
    name: string;
    module_name: string;
    description: string;
    created_at: string;
    updated_at: string | null;

}

export interface RoleAssignedPermissionInterface {
    id: number;
    role_id: number;
    created_at: string;
    updated_at: string | null;
    creator: MemberRecordInterface;
    updator?: MemberRecordInterface;
    permission: PermissionRecordInterface;
}

export interface UpdatedRolePermissionsInterface {
    role: RoleRecordInterface;
    permissions: PermissionRecordInterface[];
}
