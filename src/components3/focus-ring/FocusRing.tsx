import { CSSProperties } from "react";
import { createComponent } from "../../common/Component";
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
    return (
      <div tabIndex={0} ref={ref}
        style={{ position: "relative", borderRadius: shape, ...style }}
        {...props}>
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

export type FocusRingSupportedCssProps = {
  "--md-focus-ring-color": string,
  "--md-focus-ring-shape": string,
  "--md-focus-ring-width": string,
};
