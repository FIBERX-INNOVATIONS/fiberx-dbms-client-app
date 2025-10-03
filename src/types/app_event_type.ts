
export type AppEvents = {
    isLoading: boolean;
    statusChanged: { 
        status: string;
        message: string;
    };
};