import { FabSize, FabVariant, MdFab } from "@material/web/fab/fab";
import { createComponent } from "../../components/common/Component";
import { MdFabComponent } from "./Component";
import { CSSProperties } from "react";

export type FabProps = {
  size?: FabSize,
  lowered?: boolean,
  variant?: FabVariant,
  icon?: React.ReactNode,
};

export const Fab = createComponent<MdFab, FabProps>(
  function Fab({ size, icon, style, children, ...props }, ref) {
    let iconSize = 24;
    if (size === "large") {
      iconSize = 36;
    }

    return (
      <MdFabComponent ref={ref as any} size={size} style={{ "--md-icon-size": `${iconSize}px`, ...style } as CSSProperties} {...props} >
        {icon ? <div slot="icon">{icon}</div> : <></>}
        {children}
      </MdFabComponent>);
  }
);
