import { createComponent } from "../../common/Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { RmcwDialog, RmcwDialogComponent } from "./Component";

export type DialogProps = {
  open?: boolean,
  quick?: boolean,
  noFocusTrap?: boolean,
  icon?: SlotNode,
  headline?: SlotNode,
  actions?: SlotNode,
  onEscapeKey?: (e: Event) => unknown,
  onScrimClick?: (e: Event) => unknown,
  //
  type?: "alert",
};

export const Dialog = createComponent<RmcwDialog, DialogProps>(
  function Dialog({ icon, headline, actions, children, ...props }, ref) {
    const mergeChildren = <>
      {icon ? createSlotNode(icon, "icon") : <></>}
      {headline ? createSlotNode(headline, "headline") : <></>}
      {children ? createSlotNode(children, "content") : <></>}
      {actions ? createSlotNode(actions, "actions") : <></>}
    </>;
    return <RmcwDialogComponent ref={ref} {...props} >{mergeChildren}</RmcwDialogComponent>;
  }
);

export type DialogSupportedCssProps = {
  "--md-dialog-container-color": string,
  "--md-dialog-headline-color": string,
  "--md-dialog-headline-font": string,
  "--md-dialog-supporting-text-color": string,
  "--md-dialog-supporting-text-font": string,
};
