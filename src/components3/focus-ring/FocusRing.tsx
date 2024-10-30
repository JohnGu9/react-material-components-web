import { CSSProperties } from "react";
import { createComponent } from "../../components/common/Component";
import { MdFocusRingComponent } from "./Component";

export type FocusRingProps = {
  visible?: boolean,
  inward?: boolean,
  color?: string,
  shape?: string,
  width?: string,
  activeWidth?: string,
};

export const FocusRing = createComponent<HTMLDivElement, FocusRingProps>(
  function FocusRing({ visible, inward, color, shape, width, activeWidth, style, children, ...props }, ref) {
    style = { position: "relative", borderRadius: shape, ...style };
    return (
      <div tabIndex={0} ref={ref} style={style} {...props}>
        <MdFocusRingComponent visible={visible} inward={inward} style={{
          "--md-focus-ring-color": color,
          "--md-focus-ring-shape": shape,
          "--md-focus-ring-width": width,
          "--md-focus-ring-active-width": activeWidth,
        } as CSSProperties} />
        {children}
      </div>);
  }
);
