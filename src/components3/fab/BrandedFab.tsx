import { FabSize, MdBrandedFab } from "@material/web/fab/branded-fab";
import { createComponent } from "../../components/common/Component";
import { MdBrandedFabComponent } from "./Component";
import { CSSProperties } from "react";
import { createSlotNode, SlotNode } from "../common/SlotNode";

export type BrandedFabProps = {
  size?: FabSize,
  lowered?: boolean,
  icon?: SlotNode,
};

export const BrandedFab = createComponent<MdBrandedFab, BrandedFabProps>(
  function BrandedFab({ size, icon, style, children, ...props }, ref) {
    let iconSize = 36;
    if (size === "large") {
      iconSize = 48;
    }

    return (
      <MdBrandedFabComponent ref={ref as any} size={size} style={{ "--md-icon-size": `${iconSize}px`, ...style } as CSSProperties} {...props} >
        {icon ? createSlotNode(icon, "icon") : <></>}
        {children}
      </MdBrandedFabComponent >);
  }
);
