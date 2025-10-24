import { Component } from "vue";

export type AppEvents = {
    isLoading: boolean;
    statusChanged: StatusChangedPayloadInterface;
    open_new_modal: OpenNewModalPayloadInterface;
    close_modal: CloseModalPayloadInterface;
    on_new_record_created: NewRecordPayloadInterface;
    on_record_updated: RecordUpdatedPayloadInterface;
    on_record_deleted: RecordDeletedPayloadInterface
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

export interface OpenNewModalPayloadInterface {
    position?: string; 
    width_class?: string;
    title_content: string;
    close_btn_content?: string;
    component?: Component | null;
    component_props?: Record<string, any>
    on_modal_close?: (event: MouseEvent, layer: number) => boolean
}

export interface CloseModalPayloadInterface {
    modal_index?: number
}

export interface NewRecordPayloadInterface {
    record: Record<string, any>;
}

export interface RecordUpdatedPayloadInterface {
    record_id: string;
    record: Record<string, any>;
}

export interface RecordDeletedPayloadInterface {
    record_id: string;
}
