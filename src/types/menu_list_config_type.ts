import { NavLinkUIPropsInterface } from "@ui/version_2/types/props_builder_type";
import { BaseEventHandlerInterface } from "@ui/version_2/types/component_type";

/**
 * Interface representing the RegisteredAppMenuListConfig utility.
 * Provides methods to build menu items and generate bulk action menu lists.
 */
export interface MenuListConfigInterface {
  /**
   * The name identifier for this config class.
   */
  readonly name: string;

  /**
   * Builds a single menu item object for rendering in a list or dropdown.
   *
   * @param menu_id - Unique identifier for the menu item.
   * @param menu_text - The display text for the menu.
   * @param menu_link - The navigation link (if applicable).
   * @param menu_icon_name - Optional key referencing an icon from SVGIcons.
   * @param on_click - Optional click handler for the menu item.
   * @returns A reactive NavLinkUIPropsInterface object.
   */
  buildMenuItem?(
    menu_id: string,
    menu_text: string,
    menu_link: string,
    menu_icon_name?: string,
    on_click?: (event: MouseEvent) => void
  ): NavLinkUIPropsInterface;

  /**
   * Builds and returns a list of bulk action menu items
   * based on member permissions and content resource configuration.
   *
   * @param event_handler - The event handler responsible for UI events.
   * @param content_field_key - The content resource key used to fetch menu text/icons.
   * @returns An array of reactive NavLinkUIPropsInterface objects.
   */
  getBulkActionMenuList(
    event_handler: BaseEventHandlerInterface,
    content_field_key: string
  ): NavLinkUIPropsInterface[];

  getTableMenuList(
    event_handler: BaseEventHandlerInterface,
    content_field_key: string
  ): NavLinkUIPropsInterface[];
}
