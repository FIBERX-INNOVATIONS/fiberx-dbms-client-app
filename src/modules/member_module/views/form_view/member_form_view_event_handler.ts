

import BaseFormViewEventHandler         from "@/base_classes/form_view/base_form_view_event_handler";
import MemberValidator                  from "@/validators/member_validator";
import { 
    MemberFormDataInputInterface, 
    RequestQueryInputInterface 
} from "@/types/validation_type";


class MemberFormViewEventHandler extends BaseFormViewEventHandler {

    protected validateFormData(form_data: MemberFormDataInputInterface, record: Record<string, any>) {
        return  MemberValidator.validateMemberInput(form_data, record);
    }

    protected async executeSubmitAction(record_id: string, form_data: MemberFormDataInputInterface) {
        if (!this.controller.service) { return {}; }

        if (record_id) {
            return await this.controller.service.executeUpdateRecord(record_id, form_data);
        }

        return await this.controller.service.executeCreateRecord(form_data);
    }
}

export default MemberFormViewEventHandler;