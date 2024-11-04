import { createComponent } from "../../common/Component";
import { MdElevationComponent } from "./Component";
import { CSSProperties } from "react";

export type ElevationProps = {
  level?: 0 | 1 | 2 | 3 | 4 | 5,
  transition?: CSSProperties["transition"],
  // Material 3 Elevation doesn't come with `transition` option
  // But you still can set `transition` by set css `style` `transition-duration` and `transition-timing-function`
};

export const Elevation = createComponent<HTMLDivElement, ElevationProps>(
  function Elevation({ level, transition, children, style, ...props }, ref) {
    const elevationStyle = { "--md-elevation-level": level, transition } as CSSProperties;
    return (
      <div ref={ref} style={{ position: "relative", ...style }} {...props} >
        <MdElevationComponent style={elevationStyle} />
        {children}
      </div>);
  }
);

export type ElevationSupportedCssProps = {
  "--md-elevation-level": "0" | "1" | "2" | "3" | "4" | "5"
  "--md-elevation-shadow-color": string,
};
