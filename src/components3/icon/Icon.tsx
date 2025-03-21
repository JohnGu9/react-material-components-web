import { MdIcon } from "@material/web/icon/icon";
import { createComponent } from "../../common/Component";
import { OutlinedIcon } from "./OutlinedIcon";
import { classMap } from "../../common/ClassMap";
import { MdIconComponent } from "./Component";
import { RoundedIcon } from "./RoundedIcon";
import { SharpIcon } from "./SharpIcon";
import React from "react";

// To reduce bundle size, try to import "sub-file"
// For example, just `import { OutlinedIcon } from "rmcw/components3/OutlinedIcon"` to limit bundle css files that only include `material-symbols/outlined.css`

export type IconStyle = "outlined" | "round" | "sharp";

export type IconProps = {
  iconStyle?: IconStyle;
};

// eslint-disable-next-line react-refresh/only-export-components
export const IconContext = React.createContext<React.HTMLProps<HTMLElement> & IconProps>({});

export const Icon = createComponent<MdIcon, IconProps>(
  function Icon({ iconStyle, className: c0, ...props }, ref) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className: c1, ref: _, iconStyle: iconStyleFromContext, ...context } = React.useContext(IconContext);
    const mergeProps = { className: classMap({}, c0, c1), ...context, ...props };
    switch (iconStyle ?? iconStyleFromContext) {
      case "outlined":
        return <OutlinedIcon ref={ref} {...mergeProps} />;
      case "round":
        return <RoundedIcon ref={ref} {...mergeProps} />;
      case "sharp":
        return <SharpIcon ref={ref} {...mergeProps} />;
    }
    return <MdIconComponent ref={ref} {...mergeProps} />;
  }
);

export type IconSupportedCssProps = {
  "--md-icon-font": string,
  "--md-icon-size": string,
};
