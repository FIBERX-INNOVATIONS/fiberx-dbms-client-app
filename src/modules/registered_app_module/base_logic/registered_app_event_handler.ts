

import ContentManagerUtil           from "@ui/version_2/utils/content_manager_util";
import BaseEventHandler             from "@ui/version_2/base_classes/base_event_handler";

import { BaseControllerInterface }  from "@ui/version_2/types/component_type";


class RegisteredAppEventHandler extends BaseEventHandler {
    public content_manager: ContentManagerUtil;
    private redirect_timer: ReturnType<typeof setTimeout> | null = null;


    constructor(controller: BaseControllerInterface) {
        super(controller, controller.component_name);

        this.content_manager = ContentManagerUtil.getInstance();
    }

    // Method to handle form action btn click
    public async handleFormActionBtnClick (event: MouseEvent) {
        console.log(`Form button clicked`)
    }
    

}

export default RegisteredAppEventHandler;