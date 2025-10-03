
export interface ScreenLoaderProps {
    visible: boolean;
    loader_symbol: string | object;
    loader_text: string;
    wrapper_class_style?: string;
    loader_class_style?: string;
    loader_symbol_class_style?: string;
    loader_text_class_style?: string;
}

export interface StatusAlertProps {
    alert_box_id: string;
    
    visible: boolean;

    wrapper_class_style?: string;

    alert_box_class_style?: string;

    close_btn_class_style?: string;

    status_icon_wrapper_class_style?: string;

    status_icon_class_style?: string;

    status_content_wrapper_class_style?: string;

    status_content_class_style?: string;

    alert_status: string;

    close_btn_icon?: string;

    status_icon?: string;

    status_content_messgae: string;

    on_close: Function
}