
export type AppEvents = {
    isLoading: boolean;
    statusChanged: StatusChangedPayloadInterface
};

export interface StatusPayloadOptionsInterface { 
    duration?: number; 
    should_reload?: boolean; 
    redirect_url?: string; 
    close_modal?: boolean; 
}; 

export interface StatusChangedPayloadInterface {
    status: string;
    message: string;
    options?: StatusPayloadOptionsInterface
}