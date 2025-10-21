import { Component } from "vue";

export type AppEvents = {
    isLoading: boolean;
    statusChanged: StatusChangedPayloadInterface;
    open_new_modal: OpenNewModalPayloadInterface;
    close_modal: CloseModalPayloadInterface
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