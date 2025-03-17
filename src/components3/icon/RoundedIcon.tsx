import { MdIcon } from "@material/web/icon/icon";
import { createComponent } from "../../common/Component";
import { MdIconComponent } from "./Component";
import { CSSProperties } from "react";

import 'material-symbols/rounded.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type RoundedIconProps = {};

export const RoundedIcon = createComponent<MdIcon, RoundedIconProps>(
  function RoundedIcon({ style, ...props }, ref) {
    return <MdIconComponent ref={ref} style={{ "--md-icon-font": "Material Symbols Rounded", ...style } as CSSProperties} {...props} />;
  }
);
