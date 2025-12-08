
export interface ValidationResult {
    v_state: boolean;
    v_msg: string;
}

export interface RolePermissionsFormInputData {
    csrf_token: string;
    role_id: number
    permission_ids: number[]
}