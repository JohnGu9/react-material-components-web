import { CSSProperties } from "react";
import { createComponent } from "../../components/common/Component";
import { MdRippleComponent } from "./Component";
import "./styles.scss"

export type RippleProps = {
  unbounded?: boolean | ({ height?: string | number, width?: string | number } & CSSProperties),
};

export const Ripple = createComponent<HTMLDivElement, RippleProps>(
  function Ripple({ unbounded, children, ...props }, ref) {
    return (
      <div ref={ref} {...props}>
        <MdRippleComponent className={unbounded ? "unbounded" : undefined}
          style={typeof unbounded === 'object' ? unbounded : undefined} />
        {children}
      </div>);
  }
);

export type RippleSupportedCssProps = {
  "--md-ripple-hover-color": string,
  "--md-ripple-pressed-color": string,
};
