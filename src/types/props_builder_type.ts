
export type BackgroundSizeType = | "auto" | "cover" | "contain" | (string & {});

export type BackgroundPositionType = | "left" | "center" | "right" | "top" | "bottom" | `${"left" | "center" | "right"} ${"top" | "center" | "bottom"}` | (string & {});

export type BackgroundRepeatType = | "repeat" | "no-repeat" | "repeat-x" | "repeat-y" | "space" | "round";

export type OverflowType = | "visible" | "hidden" | "scroll" | "auto" | (string & {});

export interface ScreenLoaderPropsInterface {
    visible: boolean;
    loader_symbol: string | object;
    loader_text: string;
    wrapper_class_style?: string;
    loader_class_style?: string;
    loader_symbol_class_style?: string;
    loader_text_class_style?: string;
}

export interface StatusAlertPropsInterface {
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

export interface AuthBgStylePropsInterface {
    backgroundImage: string; 
    backgroundSize: BackgroundSizeType;
    backgroundPosition: BackgroundPositionType;
    backgroundRepeat: BackgroundRepeatType;
    minHeight: string;
    width: string;
    height: string
    overflow: OverflowType;
    margin: number | string;
    padding: number | string;
}

export interface CopyRightPropsinterface {
    powered_by_text: string; 
    author_text: string; 
    wrapper_class_style?: string;
    text_class_style?: string;
}