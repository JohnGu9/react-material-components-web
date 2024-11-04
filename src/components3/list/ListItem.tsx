import { ListItemType, MdListItem } from "@material/web/list/list-item";
import { createComponent } from "../../common/Component";
import { MdListItemComponent } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";

export type ListItemProps = {
  start?: SlotNode,
  end?: SlotNode,
  overline?: SlotNode,
  headline?: SlotNode,
  supportingText?: SlotNode,
  trailingSupportingText?: SlotNode,
  //
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  type?: ListItemType,
};

export const ListItem = createComponent<MdListItem, ListItemProps>(
  function List({ start, end, overline, headline, supportingText, trailingSupportingText, children, ...props }, ref) {
    return (
      <MdListItemComponent ref={ref as any} {...props} >
        {children}
        {start ? createSlotNode(start, "start") : <></>}
        {end ? createSlotNode(end, "end") : <></>}
        {overline ? createSlotNode(overline, "overline") : <></>}
        {headline ? createSlotNode(headline, "headline") : <></>}
        {supportingText ? createSlotNode(supportingText, "supporting-text") : <></>}
        {trailingSupportingText ? createSlotNode(trailingSupportingText, "trailing-supporting-text") : <></>}
      </MdListItemComponent>);
  }
);

export type ListItemSupportedCssProps = {
  "--md-list-item-container-shape": string,
  "--md-list-item-label-text-color": string,
  "--md-list-item-supporting-text-color": string,
  "--md-list-item-trailing-supporting-text-color": string,
  "--md-list-item-label-text-font": string,
  "--md-list-item-supporting-text-font": string,
  "--md-list-item-trailing-supporting-text-font": string,

  "--md-list-item-leading-icon-color": string,
  "--md-list-item-trailing-icon-color": string,
  "--md-list-item-leading-icon-size": string,
  "--md-list-item-trailing-icon-size": string,
};
