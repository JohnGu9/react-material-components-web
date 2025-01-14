import { FabSize, FabVariant, MdFab } from "@material/web/fab/fab";
import { createComponent } from "../../common/Component";
import { MdFabComponent } from "./Component";
import { CSSProperties } from "react";
import { createSlotNode, SlotNode } from "../common/SlotNode";

export type FabProps = {
  size?: FabSize,
  lowered?: boolean,
  variant?: FabVariant,
  icon?: SlotNode,
};

export const Fab = createComponent<MdFab, FabProps>(
  function Fab({ size, icon, style, children, ...props }, ref) {
    let iconSize = 24;
    if (size === "large") {
      iconSize = 36;
    }

    return (
      <MdFabComponent ref={ref} size={size} style={{ "--md-icon-size": `${iconSize}px`, ...style } as CSSProperties} {...props} >
        {icon ? createSlotNode(icon, "icon") : <></>}
        {children}
      </MdFabComponent>);
  }
);

export type FabSupportedCssProps = {
  "--md-fab-container-color": string,
  "--md-fab-lowered-container-color": string,
  "--md-fab-container-shape": string,
  "--md-fab-icon-color": string,
  "--md-fab-icon-size": string,

  "--md-fab-small-container-shape": string,
  "--md-fab-small-icon-size": string,
  "--md-fab-large-container-shape": string,
  "--md-fab-large-icon-size": string,

  "--md-fab-label-text-font": string,
};
