
const ClassStyles = {
    app_root: {
        screen_loader_ui: {
            wrapper_class_style: "fixed inset-0 flex items-center justify-center overflow-hidden w-screen h-screen",
            loader_class_style: "flex flex-col items-center justify-center space-y-4 animate-fade-in bg-[#001f3f] z-[100] w-full h-full",
            loader_symbol_class_style: "w-20 h-20 flex items-center justify-center overflow-hidden animate-spin",
            loader_symbol_img_class_style: "object-fit",
            loader_text_class_style: "text-white font-bold text-lg tracking-[0.7em] animate-pulse w-full text-center mt-4",

        },
        status_alert_ui: {
            wrapper_class_style: "fixed inset-0 flex items-start justify-end overflow-hidden bg-[#0d0a0ad6] z-[99]",
            alert_box_class_style: "relative top-6 right-6 max-w-sm w-full flex items-stretch rounded-lg shadow-lg animate-slide-in",
            close_btn_class_style: "absolute -top-3 -left-3 w-8 h-8 flex items-center text-center rounded-full shadow-md cursor-pointer",
            status_icon_wrapper_class_style: "flex items-center justify-center w-2/12  h-full p-2",
            status_icon_class_style: "w-full font-bold",
            status_content_wrapper_class_style: "flex-1 w-10/12 h-full p-4",
            status_content_class_style: "text-sm font-medium",
            sucess_bg_class_style: "bg-gradient-to-r from-green-500 to-green-700",
            error_bg_class_style: "bg-gradient-to-r from-green-500 from-red-700 to-red-900",
            info_bg_class_style: "bg-gradient-to-r from-blue-700 to-blue-900",
            sucess_text_class_style: "text-white font-black",
            error_text_class_style: "text-white font-black",
            info_text_class_style: "text-white font-bold",
        },
    },
    auth: {
        auth_base_view_ui: {
            footer_class_style: "w-screen p-0 m-0 bg-white shadow-md z-50",
            copy_right_ui: {
                wrapper_class_style: "w-full text-center py-4 font-bold text-gray-700 border-t",
                text_class_style: ""
            }
        },
        section_wrapper_class_style: "w-full h-full flex items-center md:justify-end justify-center py-[5%] px-[4%]",
        section_form_box_class_style: "w-full w-sm rounded-lg h-auto bg-white shadow-lg flex items-center justify-start animate-slide-in border-2 border-gray-200 p-6",
        form_box_wrapper_class_style: "w-full flex flex-col space-y-1.5",
        header_text_class_style: "font-semibold tracking-tight text-2xl flex",
        fieldset_class_style: "space-y-6 py-4"

    },
    input_ui: {
        wrapper_class_style: "w-full my-4 flex flex-col space-y-2",
        label_class_style: "text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        label_required_class_style: "italic font-medium",
        input_class_style: "w-full min-h-10 flex w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  bg-gray-200 border-blue-600/70 text-black placeholder-gray-400 focus:ring-sky-500"
    },
    toast_alert_ui: {
        wrapper_class_style: "w-full flex items-stretch justify-start border-l-4 rounded-lg",
        icon_wrapper_class_style: "flex items-center justify-center w-1/12 p-1",
        icon_class_style: "flex items-center justify-center w-6 h-6",
        message_class_style: "flex-1 w-11/12 h-full p-2",
        border_class_styles: {
            success_border_class_style: "bg-green-100 border-l-green-900", 
            error_border_class_style: "bg-red-200 border-l-red-900", 
            info_border_class_style: "bg-blue-300 border-l-blue-900" ,
            warning_border_class_style: "bg-yellow-100 border-l-yellow-900"
        },
        status_class_styles: {
            success_class_style: "text-sm font-semibold text-green-900 bg-green-100", 
            error_class_style: "text-sm font-semibold text-red-900 bg-red-200", 
            info_class_style: "text-sm font-semibold text-blue-900 bg-blue-300" ,
            warning_class_style: "text-sm font-semibold text-amber-900 bg-yellow-100"
        }
    }
}

export default ClassStyles;