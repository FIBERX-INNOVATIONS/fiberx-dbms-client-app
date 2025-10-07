
import DashboardBaseViewPropsBuilder    from "./dashboard_base_view_props_builder";
import BaseEventHandler                 from "@ui/version_2/base_classes/base_event_handler";
import { BaseControllerInterface }      from "@ui/version_2/types/component_type";


class DashboardBaseViewEventHandler extends BaseEventHandler {
    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);
    }

    // method to hide menu on outside click
    private handleOutsideClick = (event: MouseEvent) => {
        const trigger_el   = document.getElementById("MemberProfileAvatar");
        const menu_list_el = document.getElementById("MemberProfileMenuList");

        if (!trigger_el || !menu_list_el) return;

        const clicked_element = event.target as HTMLElement;

        // If click was *outside* both trigger and menu → hide dropdown
        if (!menu_list_el.contains(clicked_element) && !trigger_el.contains(clicked_element)) {
            menu_list_el.classList.add("hidden");
            document.removeEventListener("click", this.handleOutsideClick);
        }
    };

    // Method to handle on click event
    public toggleSidebarModal (event: MouseEvent) {
        const { sidebar_props } = this.controller.state_refs;

        if(!sidebar_props) { return }

        const is_visible        = sidebar_props.visible;
        const new_props_value   = DashboardBaseViewPropsBuilder.getModalSidebarUIProps(this, !is_visible);

        Object.assign(this.controller.state_refs.sidebar_props, new_props_value);
    }

    // Method to handle on click event to show profile dropdown
    public toggleProfileDropdown (event: MouseEvent) {
        const trigger_id            = "MemberProfileAvatar";
        const menu_list_id          = "MemberProfileMenuList";
        const trigger_el            = document.getElementById(trigger_id);
        const menu_list_el          = document.getElementById(menu_list_id);

        if(!trigger_el || !menu_list_el) { return }

        const is_visible = (menu_list_el.classList.contains("hidden") === false);

        if(is_visible) {
            menu_list_el.classList.add("hidden");
            document.removeEventListener("click", this.handleOutsideClick as any);
            return;
        }

        menu_list_el.classList.remove("hidden");

        // Delay the listener slightly to avoid immediately closing on this click
        setTimeout(() => {
            document.addEventListener("click", this.handleOutsideClick as any);
        }, 0);
    }
}

export default DashboardBaseViewEventHandler;