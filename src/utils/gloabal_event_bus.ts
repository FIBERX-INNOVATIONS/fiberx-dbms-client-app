import mitt, { Emitter } from "mitt";
import { AppEvents } from "@/types/app_event_type";

export const EventBus: Emitter<AppEvents> = mitt<AppEvents>();