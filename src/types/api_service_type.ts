import { 
    IndexDefinitionInterface ,
    ColumnDefinitionInterface,
} from "./schema_type";



export interface PaginationResponseInterface<T> {
    total_items: number;
    total_pages: number;
    current_page: number;
    records: T
}

export interface MemberAuthRecordInterface {
    login_attempts: number;
    account_locked_until: string | null
    password_changed_at: string | null
    last_password_reset_request_at: string | null
    is_2fa_enabled: boolean | number;
    is_active: boolean | number;
    last_login_at: string | null
}

export interface MemberRecordInterface {
    public_id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_verified: boolean | number;
    is_active: boolean | number;
    is_2fa_enabled: boolean | number;
    profile_photo_link: string;
    full_name: string;
    member_preview: string;
    dob: string | null;
    gender?: string | null;
    role_name?: string | null;
    last_login_at?: string | null
    permissions?: string[],
    member_auth?: MemberAuthRecordInterface;
    is_fully_authenticated: boolean;
}

export interface MemberActiviityRecordInterface {
        id: number;
        member_public_id: string;
        permission_name: string;
        description: string;
        created_at: string;
        updated_at: string | null;
        creator?: MemberRecordInterface
}

export interface MemberTwoFactorRecordInterface {
    secret_key: string;
    otpauth_url: string;
}

export interface CSRFTokenRecordInterface {
    token: string;
    expires_at: string;
}

export interface AuthenticatedMemberRecordInterface {
    current_member: MemberRecordInterface;
    access_token: string;
    expires_in_secs?: number;
}

export interface RegisteredAppRecordInterface {
    public_id: string;
    name: string;
    prefix: string;
    description: string;
    base_url: string;
    logo_url: string;
    is_active: boolean | number;
    social_links: Record<string, string>
    urls: string[],
    created_at?: string;
    updated_at?: string | null;
    creator?: MemberRecordInterface;
    updator?: MemberRecordInterface;
}

export interface DatasourceRecordInterface {
    id: number;
    name: string;
    datasource_type:  string;
    host:  string;
    username:  string;
    database_name:  string;
    port: number;
    connection_info?: Record<string, any>,
    is_active: boolean | number;
    is_created: boolean | number;
    created_at?: string;
    updated_at?: string | null;
    creator?: MemberRecordInterface;
    updator?: MemberRecordInterface;
    datasource_app: RegisteredAppRecordInterface
}

export interface RegisteredAppSchemaRecordInterface {
    id: number;
    name: string;
    app_id: string;
    table_name: string;
    model_name: string;
    datasource_name: string;
    datasource_type: string;
    primary_key: string;
    migration_priority: number;
    timestamps?: boolean | number;
    permissions?: string[];
    columns?: Record<string, ColumnDefinitionInterface>;
    indexes?: IndexDefinitionInterface[]
    created_at?: string;
    updated_at?: string | null;
    creator?: MemberRecordInterface;
    updator?: MemberRecordInterface;
    schema_app: RegisteredAppRecordInterface
    schema_datasource?: DatasourceRecordInterface;     
}

export interface SchemaAccessRecordInterface {
    id: number;
    schema_id: number;
    permissions: string[];
    is_owner: boolean | number;
    is_granted: boolean | number;
    created_at?: string;
    updated_at?: string | null,
    creator?: MemberRecordInterface;
    updator?: MemberRecordInterface;
    registered_app?: RegisteredAppRecordInterface
    schema?: RegisteredAppSchemaRecordInterface
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

export interface RoleAssignedPermissionRecordInterface {
    id: number;
    role_id: number;
    created_at?: string;
    updated_at?: string | null;
    creator?: MemberRecordInterface;
    updator?: MemberRecordInterface;
    permission: PermissionRecordInterface;
}

export interface UpdatedRolePermissionsRecordInterface {
    role: RoleRecordInterface;
    permissions: PermissionRecordInterface[];
}

export type MetricKeyType = keyof SystemMetricObjectinterface;

export type MetricLookupType = Record<string, number>;

export interface SystemMetricObjectinterface {
  registered_apps_in_active: number;
  registered_apps_active: number;
  schemas: number;
  datasources_in_active: number;
  datasources_active: number;
  members_in_active: number;
  members_active: number;
  [key: string]: number;
}
