
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
        modal_ui: {
            overlay_class_style: "fixed inset-0 flex justify-center items-center bg-black/70",
            modal_box_class_style: "overflow-hidden relative bg-white shadow-lg rounded-lg",
            header_wrapper_class_style: "flex w-full h-[70px] border-b items-center justify-between overflow-hidden",
            header_title_content_class_style: "flex items-center justify-start w-11/12 h-full py-2 px-2 overflow-hidden",
            header_title_class_style: "font-black uppercase w-full truncate",
            header_close_btn_content_class_style: "flex items-center justify-center w-1/12 h-full p-2 overflow-hidden",
            close_btn_class_style: "w-[24px] h-[24px] cursor-pointer font-bold rounded-full hover:shadow-2xl flex items-center justify-center bg-gray-200",
            body_class_style: "flex-1",
            left_modal_position_class_style: "fixed left-0 top-0 h-full",
            right_modal_position_class_style: "fixed right-0 top-0 h-full",
            center_modal_position_class_style: "relative mx-auto my-auto",
            close_btn_content_class_style: "w-full h-full font-bold flex items-center justify-center"
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
        otp_wrapper_class_style: "flex gap-2 justify-center",
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
    },
    form_button_ui: {
        icon_class_style: "w-4 h-4 ml-2 flex items-center",
        btn_class_style: "md:w-auto w-full  cursor-pointer inline-flex mt-4 items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider py-3",
        auto_width_btn_class_style: "w-auto cursor-pointer inline-flex items-center justify-center rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider py-3"
    },
    dashboard_base_ui: {
        header_class_style: "fixed top-0 left-0 w-screen p-0 m-0 bg-white shadow-md z-[80]",
        main_class_style: "pt-[92px] pb-[60px] h-screen overflow-y-auto overflow-x-hidden",
        top_bar_section_1_wrapper_class_style: "flex items-center w-full h-full space-x-2",
        top_bar_section_3_wrapper_class_style: "flex items-center justify-end w-full h-full space-x-2"
    },
    top_bar_ui: {
        wrapper_class_style: "w-screen px-4 flex flex-wrap items-center justify-between relative h-[70px] w-full bg-[#001f3f] py-2",
        section_1_wrapper_class_style: "md:w-3/12 w-6/12 flex items-center overflow-hidde h-full",
        section_2_wrapper_class_style: "md:w-6/12 w-full flex items-center overflow-hidden md:order-1 order-2 h-full",
        section_3_wrapper_class_style: "md:w-3/12 w-6/12 flex items-center  md:order-2 order-1 h-full relative",
    },
    hamburger_btn_ui: {
        hamburger_btn_class_style: "w-10 h-10 flex items-center justify-center overflow-hidden text-white cursor-pointer",
        icon_class_style: "w-6 h-6 flex items-center mr-2",
    },
    logo_link_ui: {
        wrapper_class_style: "flex items-center cursor-pointer",
        active_menu_class_style: "",
        icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden",
        icon_img_class_style: "w-full h-auto object-cover",
        content_class_style: "flex items-center text-white text-[20px] font-black"
    },
    img_avatar_ui: {
        wrapper_class_style: "w-full max-w-8/12 flex items-center justify-end h-full space-x-2 hover:shadow-lg hover:bg-[#031329] px-2 rounded-lg cursor-pointer",
        avatar_circle_class_style: "flex items-center rounded-full overflow-hidden w-[40px] h-[40px] border-4 border-white bg-gray-200",
        img_class_style: "w-full h-auto object-cover",
        initials_class_style: "uppercase text-[#001f3f] flex items-center justify-center font-bold w-full h-full text-center rounded-full border border-[#001f3f]",
        right_slot_class_style: "items-center text-white sm:flex hidden w-9/12 overflow-hidden",
        right_slot_wrapper_class_style: "flex flex-col items-center justify-end w-full",
        right_slot_title_text_class_style: "text-white font-bold text-md w-full truncate text-start",
        right_slot_sub_title_class_style: "text-xs font-medium text-gray-200 capitalize text-start w-full"

    },
    table_img_avatar_ui: {
        wrapper_class_style: "w-full flex items-center justify-end h-full space-x-2 hover:shadow-lg px-2 rounded-lg cursor-pointer",
        avatar_circle_class_style: "flex items-center rounded-full overflow-hidden w-[60px] h-[60px] border-4 border-black bg-gray-200",
        img_class_style: "w-full h-auto object-cover",
        initials_class_style: "uppercase text-black flex items-center justify-center font-bold w-full h-full text-center rounded-full border border-black",
        right_slot_class_style: "items-center text-black sm:flex hidden w-9/12 overflow-hidden",
        right_slot_wrapper_class_style: "flex flex-col items-start justify-start w-full",
        right_slot_title_text_class_style: "text-black font-bold text-md w-full truncate text-start",
        right_slot_sub_title_class_style: "text-[10px] text-start font-medium text-white bg-green-900 truncate font-black uppercase rounded-full shadow px-2 py-1"

    },
    table_is_active_class_styles: {
        wrapper_class_style: "w-full flex relative items-center justify-center",
        loader_class_style: "flex items-center justify-center flex-col",
        switch_btn_class_style: "group inline-flex h-6 w-11 transition items-center rounded-full cursor-pointer",
        active_class_style: "bg-blue-500",
        inactive_class_style: "bg-gray-500",
        knob_class_style: "size-4 rounded-full transition transform bg-white",
        label_text_class_style: "",
        loader_content_class_style: "w-6 h-6 ml-2 flex items-center"
    },
    profile_dropdown_menu_list_ui: {
        wrapper_class_style: "hidden divide-y divide-gray-100 w-[170px] bg-[#001f3f] p-0 min-h-[114px] m-0 absolute border border-white top-14 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out origin-top",
        list_class_style: "py-2 w-full border-b-2 border-[#6f7e8d6e] last:border-b-0",
        list_item_class_style: "w-full p-0 m-0",
        menu_list_item_ui: {
            wrapper_class_style: "flex items-center cursor-pointer px-4 py-2 flex justify-between items-center group/link w-full hover:bg-[#6f7e8d6e]",
            active_menu_class_style: "bg-[#6f7e8d6e]",
            icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-3/12 p-2",
            icon_img_class_style: "w-full h-auto text-white",
            content_class_style: "flex items-center justify-start text-white text-[16px] text-start w-full"
        }
    },
    sidebar_ui: {
        wrapper_class_style: "fixed inset-0 z-[90] bg-[#000000cc] cursor-pointer",
        sidebar_class_style: "fixed top-0 h-screen transition-all duration-[2000s] ease-in-out bg-[#001f3f] shadow-lg w-48",
        section_1_wrapper_class_style: "h-[15%] flex items-center justify-center overflow-hidden w-full",
        section_2_wrapper_class_style: "h-[85%] overflow-x-hidden overflow-y-auto w-full ",
        left_position_class_style: "left-0",
        right_position_class_style: "right-0",
        transition_x_class_style: "translate-x-0",
        left_transition_x_class_style: "-translate-x-full",
        right_transition_x_class_style: "translate-x-full",
    },
    sidebar_logo_ui: {
        wrapper_class_style: "w-full h-full flex items-center justify-center p-2 border-b border-white overflow-hidden",
        img_wrapper_class_style: "w-full h-auto flex items-center justify-center p-0 m-0",
        img_class_style: "object-contian w-full",
        text_class_style: "",
    },
    sidebar_menu_list_ui: {
        wrapper_class_style: "divide-y divide-gray-100 w-full bg-[#001f3f] p-0 h-full m-0 border shadow-lg",
        list_class_style: "py-2 w-full border-b-2 border-[#6f7e8d6e] last:border-b-0",
        list_item_class_style: "w-full p-0 m-0",
        menu_list_item_ui: {
            wrapper_class_style: "flex items-center cursor-pointer px-4 py-2 flex justify-between items-center group/link w-full hover:bg-[#6f7e8d6e]",
            active_menu_class_style: "bg-[#6f7e8d6e]",
            icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-3/12 p-2",
            icon_img_class_style: "w-full h-auto text-white",
            content_class_style: "flex items-center justify-start text-white text-[16px] text-start w-full"
        }
    },
    main_dashboard_ui: {
        wrapper_class_style: "w-full px-[5%]",
        header_text_class_style: "font-bold text-start capitalize text-2xl flex w-full items-center justify-start"
    },
    bread_crumb_ui: {
        wrapper_class_style: "w-full py-4 px-[2%] rounded-3xl bg-white shadow-lg border border-gray-100 my-2 h-[50px]",
        list_class_style: "inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse",
        list_item_class_style: "inline-flex items-center",
        divider_class_style: "px-2 text-gray-400",
        menu_list_item_ui: {
            wrapper_class_style: "inline-flex items-center text-sm font-medium cursor-pointer text-gray-700 hover:text-blue-600",
            active_menu_class_style: "",
            icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-4 h-4 me-2",
            icon_img_class_style: "w-full h-auto",
            content_class_style: "flex space-x-2 items-center justify-start text-md"
        }
    },
    search_field_ui: {
        wrapper_class_style: "w-full my-4 md:items-start items-center flex flex-col px-2 md:justify-start justify-center",
        label_class_style: "",
        label_required_class_style: "",
        search_wrapper_class_style: "w-full flex items-center justify-between",
        btn_wrapper_class_style: "w-1/12 flex items-center justify-center mr-1",
        input_wrapper_class_style: "w-11/12 flex items-center justify-center",
        btn_class_style: "w-full p-2 cursor-pointer flex items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider",
        icon_class_style: "w-6 h-6 flex items-center",
    },
    ellipsis_menu_options_ui: {
        icon_class_style: "w-6 h-6 flex items-center",
        btn_class_style: "rounded-full p-2 cursor-pointer hover:bg-gray-300 hover:shadow-lg flex "
    },
    table_menu_options_ui: {
        icon_class_style: "w-6 h-6 flex items-center",
        btn_class_style: "rounded-full p-2 cursor-pointer hover:bg-gray-300 hover:shadow-lg flex "
    },
    list_view_ui: {
        section_wrapper_class_style: "w-full px-[5%]",
        header_text_class_style: "font-bold text-start capitalize text-2xl flex w-full items-center justify-start",
        data_section_wrapper_class_style: "my-4 w-full bg-white flex flex-col justify-center rounded-3xl border border-gray-200 p-6 relative break-words flex-col card shadow-md",
        list_data_action_section_class_style: "py-4 grid md:grid-cols-2 grid-cols-1",
        pagination_summary_class_style: "text-gray-500 text-sm flex items-center w-full md:justify-start justify-center",
        grid_1_wrapper_class_style: "relative w-full my-4 md:items-start items-center flex flex-col px-2 justify-center",
        grid_2_wrapper_class_style: "relative w-full my-4 md:items-end items-center flex flex-col px-2 justify-center",
        data_table_section_wrapper_class_style: "w-full py-4 grid grid-cols-1 relative",
        data_table_class_style: "w-full border-separate border-spacing-y-2",
        lg_table_wrapper_class_style: "border rounded-md border-ld overflow-x-auto bg-gray-200 pb-[150px]",

        dropdown_menu_list_ui: {
            wrapper_class_style: "hidden divide-y divide-gray-100 w-[170px] bg-white shadow-xl border border-gray-200 z-[10] p-0 min-h-[114px] m-0 absolute top-10 rounded-2xl transform transition-all duration-300 ease-in-out origin-top",
            list_class_style: "py-2 w-full",
            list_item_class_style: "w-full p-0 m-0 border-b-2 border-[#6f7e8d6e] last:border-b-0",

            menu_list_item_ui: {
                wrapper_class_style: "flex items-center cursor-pointer px-4 py-2 flex justify-between items-center group/link w-full hover:bg-[#6f7e8d6e]",
                active_menu_class_style: "bg-[#6f7e8d6e]",
                icon_img_wrapper_class_style: "flex items-center justify-center overflow-hidden  w-3/12 p-1.5",
                icon_img_class_style: "w-full h-auto text-gray-900",
                content_class_style: "flex items-center justify-start text-gray-900 text-[16px] text-start w-full"
            }
        },
        data_table_ui: {
            table_header_ui: {
                wrapper_class_style: "group/head text-sm font-medium capitalize ",
                header_row_class_style: "",
                header_cell_class_style: "border-b border-black group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg px-4 py-4 text-md font-semibold text-black capitalize text-center",
                sortable_cell_wrapper_class_style: "border-b border-black group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg px-4 py-4 text-md font-semibold text-black capitalize text-center",
                sortable_icon_class_style: "w-4 h-4 cursor-pointer flex",
                sortable_cell_content_wrapper_class_style: "flex space-x-2 items-center justify-center",
                selected_checkbox_class_style: "w-4 h-4 p-2 rounded-lg cursor-pointer"
            },
            table_body_ui: {
                wrapper_class_style: "group/body divide-y divide-border border-black",
                body_row_class_style: "group/row text-sm",
                body_cell_class_style: "px-4 py-3 whitespace-nowrap border-b border-black text-sm text-center relative",
                selected_checkbox_class_style: "w-4 h-4 p-2 rounded-lg cursor-pointer"
            },
            menu_list_item_ui: {
                wrapper_class_style: "hidden divide-y divide-gray-100 w-[170px] bg-white shadow-xl border border-gray-200 z-[10] p-0 min-h-[114px] m-0 absolute top-16 right-2 rounded-2xl transform transition-all duration-300 ease-in-out origin-top",
                list_class_style: "py-2 w-full",
                list_item_class_style: "w-full p-0 m-0 border-b-2 border-[#6f7e8d6e] last:border-b-0",
            }
        },
        pagination_ui: {
            wrapper_class_style: "w-full flex items-center justify-center px-[10%] py-4",
            prev_button_class_style: "p-2 cursor-pointer flex items-center justify-center rounded-l-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider",
            next_button_class_style: "p-2 cursor-pointer flex items-center justify-center rounded-r-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-900 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed text-md text-white font-semibold tracking-wider",
            disabled_class_style: "disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed border-1",
            select_class_style: "border h-10 w-[150px] m-0 bg-gray-100 text-center",
            prev_btn_content_class_style: "w-6 h-6 flex items-center",
            next_btn_content_class_style: "w-6 h-6 flex items-center"
        }
    },
    
}

export default ClassStyles;