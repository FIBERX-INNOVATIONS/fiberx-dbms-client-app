export type PermissionType = "read" | "create" | "update" | "delete";

export type ColumnNameType = "ABSTRACT" | "STRING" | "CHAR" | "TEXT" | "NUMBER" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | 
"INTEGER" | "BIGINT" | "FLOAT" | "DOUBLE" | "DOUBLE_PRECISION" | "DECIMAL" | "NUMERIC" | "REAL" | "DATE" | "DATEONLY" | 
"TIME" | "NOW" | "BOOLEAN" | "BLOB" | "UUID" | "UUIDV1" | "UUIDV4" | "JSON" | "JSONB" | "ARRAY" | "NONE" | "ENUM" | 
"RANGE" | "GEOMETRY" | string;

export interface ColumnType {
    name: ColumnNameType;
    length?: number;                       // for STRING, CHAR, ABSTRACT
    variant?: "tiny" | "medium" | "long";  // for TEXT and BLOB
    precision?: number | null;            // for FLOAT, DOUBLE, DECIMAL, NUMERIC
    scale?: number | null;                // for DECIMAL, NUMERIC
    element_type?: ColumnType | null;     // for ARRAY
    values?: (string | number)[];         // for ENUM
    sub_type?: string | null;             // for RANGE
    type?: string | null;                 // for GEOMETRY
    srid?: number | null;                 // for GEOMETRY
    unsigned?: boolean
}

export type ReferentialAction = "CASCADE"| "SET NULL"| "SET DEFAULT"| "RESTRICT"| "NO ACTION" | string;

export interface ColumnDefinitionInterface {
    type: ColumnType;
    auto_increment?: boolean;
    unique?: boolean;
    primary_key?: boolean;
    nullable?: boolean;
    default?: string | number | boolean | null;
    on_update?: string;
    references?: { table:string; column: string; on_delete?: ReferentialAction, on_update?: ReferentialAction }
}

export interface IndexDefinitionInterface { fields: string[]; unique: boolean; }

export interface SchemaDefinitionInterface {
    id?: number;
    name?: string;
    app_id?: string;
    table_name?: string;
    model_name?: string;
    datasource_name?: string;
    datasource_type?: "mysql" | "postgres" | string;
    primary_key?: string;
    migration_priority?: number;
    timestamps?: 0 | 1 | boolean;
    permissions?: PermissionType[];
    columns?: Record<string, ColumnDefinitionInterface>;
    indexes?: IndexDefinitionInterface[];
    status?: "PENDING" | "ACTIVE" | "DEPRECATED" | string;
}

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
    page: number, 
    size: number, 
    order_by: string, 
    order_direction: string, 
    keyword?: string | null, 
    preview_only?: string | boolean
}

export interface RegisteredAppFormDataInterface {
  prefix: string;
  csrf_token: string, 
  name: string;
  description?: string;
  base_url?: string; 
  logo_url?: string; 
  social_links?: Record<string, string>; 
}

export interface DatasourceFormDataInterface {
    csrf_token: string, 
    registered_app_public_id: string;
    name: string; 
    datasource_type: string;
    host: string;
    username: string; 
    database_name: string;
    port: string;
    connection_info: Record<string, any>
}

export interface RegisteredAppSchemaFormDataInterface {
    csrf_token: string, 
    app_public_id: string;
	model_name: string;
	datasource_id: number
	primary_key: string;
	migration_priority: number; 
	permissions: string[];
	columns: Record<string, SchemaDefinitionInterface>;
	indexes: IndexDefinitionInterface[];   

}