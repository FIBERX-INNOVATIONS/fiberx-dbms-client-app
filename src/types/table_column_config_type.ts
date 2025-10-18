import { TableColumnInterface, SortDirectionType } from "@ui/version_2/types/props_builder_type";
import { BaseEventHandlerInterface } from "@ui/version_2/types/component_type";

export interface TableColumnConfigInterface {
  /**
   * The name identifier for this config class.
   */
  readonly name: string;


  getTableColumnConfig(
    event_handler: BaseEventHandlerInterface,
    content_field_key: string,
    order_by: string,
    order_direction: SortDirectionType
  ): TableColumnInterface[];
}