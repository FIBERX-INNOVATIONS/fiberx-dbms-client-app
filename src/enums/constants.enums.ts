
export const LOCAL_STORAGE_FIELDS = {
    MEMBER_KEY: "84JRJFU",
    MEMBER_PERMISSIONS_KEY: "H84UHFUR8JU",
    MEMBER_TOKEN_KEY: "NFJFUR84HJRI30",
    ACCESS_TOKEN_KEY: "G7kP4sD9Qw2LxR1M",
    ACCESS_TOKEN_EXPIRES_AT_KEY: "hryru496gjgugi",
    DEVICE_ID_KEY: "B8fH2vJ5Nq7ZcT3Y",
    DEVICE_NAME_KEY: "X1rL6mV8Kp3QwS9A"
}

export const CSRF_TOKEN_FOR = {
    LOGIN: "login",
    TWO_FACTOR: "two_factor_login",
    REGISTER_APP: "register_app",
    DATASOURCE: "datasource",
    REGISTERED_APP_SCHEMA: "registered_app_schema",
    SCHEMA_ACCESS: "schema_access"

    
}

export const DEFAULT_PROFILE_PHOTO = "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8";

export const COLUMN_NAME_TYPE_OPTIONS = [
  { value: "STRING", label_text: "STRING" },
  { value: "CHAR", label_text: "CHAR" },
  { value: "TEXT", label_text: "TEXT" },
  { value: "INTEGER", label_text: "INTEGER" },
  { value: "FLOAT", label_text: "FLOAT" },
  { value: "DECIMAL", label_text: "DECIMAL" },
  { value: "DATE", label_text: "DATE" },
  { value: "BOOLEAN", label_text: "BOOLEAN" },
  { value: "ENUM", label_text: "ENUM" },
  { value: "UUID", label_text: "UUID" },
  { value: "BIGINT", label_text: "BIGINT" },
  { value: "NUMBER", label_text: "NUMBER" },
];

export const COLUMN_TYPE_VARIANT_OPTIONS = [
  { value: "tiny", label_text: "Tiny" },
  { value: "medium", label_text: "Medium" },
  { value: "long", label_text: "Long" },
];

export const REFERENCE_TABLE_ACTIONS = [
  { value: "CASCADE", label_text: "CASCADE" },
  { value: "SET NULL", label_text: "SET NULL" },
  { value: "SET DEFAULT", label_text: "SET DEFAULT" },
  { value: "RESTRICT", label_text: "RESTRICT" },
  { value: "NO ACTION", label_text: "NO ACTION" },
]

export const SCHEMA_PERMISSIONS_ACTIONS = [
  { value: "read", label_text: "Permission to Read Table data"},
  { value: "create", label_text: "Permission to Add to Table Data"},
  { value: "update", label_text: "Permission to Update Table Data" },
  { value: "delete", label_text: "Permission to Delete From Table Data"},
  { value: "alter_table", label_text: "Permission to Alter Table Structure" },
]