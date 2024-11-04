import { MdIcon } from "@material/web/icon/icon";
import { createComponent } from "../../common/Component";
import { MdIconComponent } from "./Component";
import { CSSProperties } from "react";

import 'material-symbols/outlined.css';

export type OutlinedIconProps = {};

export const OutlinedIcon = createComponent<MdIcon, OutlinedIconProps>(
  function OutlinedIcon({ style, ...props }, ref) {
    return <MdIconComponent ref={ref as any} style={{ "--md-icon-font": "Material Symbols Outlined", ...style } as CSSProperties} {...props} />;
  }
);
