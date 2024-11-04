import { MdMenuItem } from "@material/web/menu/menu-item";
import { createComponent } from "../../common/Component";
import { MdMenuItemComponent } from "./Component";
import { MenuItemType } from "@material/web/menu/internal/controllers/menuItemController";
import { SlotNode, createSlotNode } from "../common/SlotNode";

export type MenuItemProps = {
  selected?: boolean,
  start?: SlotNode,
  end?: SlotNode,
  overline?: SlotNode,
  headline?: SlotNode,
  supportingText?: SlotNode,
  trailingSupportingText?: SlotNode,

  //
  target?: "" | "_blank" | "_parent" | "_self" | "_top",
  type?: MenuItemType,
};

export const MenuItem = createComponent<MdMenuItem, MenuItemProps>(
  function MenuItem({ start, end, overline, headline, supportingText, trailingSupportingText, children, ...props }, ref) {
    return (
      <MdMenuItemComponent ref={ref as any} keepOpen={true} {...props} >
        {children}
        {start ? createSlotNode(start, "start") : <></>}
        {end ? createSlotNode(end, "end") : <></>}
        {overline ? createSlotNode(overline, "overline") : <></>}
        {headline ? createSlotNode(headline, "headline") : <></>}
        {supportingText ? createSlotNode(supportingText, "supporting-text") : <></>}
        {trailingSupportingText ? createSlotNode(trailingSupportingText, "trailing-supporting-text") : <></>}
      </MdMenuItemComponent>);
  }
);

export type MenuItemSupportedCssProps = {
  "--md-menu-item-container-color": string,
  "--md-menu-item-selected-container-color": string,
};
