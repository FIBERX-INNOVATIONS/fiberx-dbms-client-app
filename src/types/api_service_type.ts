
export interface LoginFormDataInterface  {
    username: string;
    password: string;
    csrf_token: string;
}

export interface TwoFactorFormDataInterface  {
    otp_code: string;
    csrf_token: string;
}