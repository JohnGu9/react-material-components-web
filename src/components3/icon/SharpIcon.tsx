import { MdIcon } from "@material/web/icon/icon";
import { createComponent } from "../../common/Component";
import { MdIconComponent } from "./Component";
import { CSSProperties } from "react";

import 'material-symbols/sharp.css';

export type SharpIconProps = {};

export const SharpIcon = createComponent<MdIcon, SharpIconProps>(
  function SharpIcon({ style, ...props }, ref) {
    return <MdIconComponent ref={ref as any} style={{ "--md-icon-font": "Material Symbols Sharp", ...style } as CSSProperties} {...props} />;
  }
);
