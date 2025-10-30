
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