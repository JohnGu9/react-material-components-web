import { MdIcon } from "@material/web/icon/icon";
import { createComponent } from "../../components/common/Component";
import { OutlinedIcon } from "./OutlinedIcon";
import { classMap } from "../../components/common/ClassMap";
import { MdIconComponent } from "./Component";
import { RoundedIcon } from "./RoundedIcon";
import { SharpIcon } from "./SharpIcon";
import React from "react";

export const IconContext = React.createContext<React.HTMLProps<HTMLElement>>({});

export type IconProps = {
  iconStyle?: "outlined" | "round" | "sharp"
};

export const Icon = createComponent<MdIcon, IconProps>(
  function Icon({ iconStyle, className: c0, ...props }, ref) {
    const { className: c1, ...context } = React.useContext(IconContext);
    const mergeProps = { className: classMap({}, c0, c1), ...context, ...props };
    switch (iconStyle) {
      case "outlined":
        return <OutlinedIcon ref={ref as any} {...mergeProps} />;
      case "round":
        return <RoundedIcon ref={ref as any} {...mergeProps} />;
      case "sharp":
        return <SharpIcon ref={ref as any} {...mergeProps} />;
    }
    return <MdIconComponent ref={ref as any} {...mergeProps} />;
  }
);
