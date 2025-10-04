
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
        }
    }
}

export default ClassStyles;