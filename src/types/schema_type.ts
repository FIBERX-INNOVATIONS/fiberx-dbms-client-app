export type PermissionType = "read" | "create" | "update" | "delete";

export type SeederStatusType = "PENDING" | "APPLIED" | "ROLLED_BACK";

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
    name: string,
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