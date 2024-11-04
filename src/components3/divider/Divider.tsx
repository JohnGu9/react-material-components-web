import { MdDivider } from "@material/web/divider/divider";
import { createComponent } from "../../common/Component";
import { MdDividerComponent } from "./Component";

export type DividerProps = {
  inset?: boolean | "start" | "end",
};

export const Divider = createComponent<MdDivider, DividerProps>(
  function Divider({ inset, ...props }, ref) {
    const current = { inset: false, insetStart: false, insetEnd: false };
    switch (inset) {
      case true:
        current.inset = true;
        break;
      case "start":
        current.insetStart = true;
        break;
      case "end":
        current.insetEnd = true;
        break;
      default:
        break;
    }
    return <MdDividerComponent ref={ref as any} {...current} {...props} />;
  }
);

export type DividerSupportedCssProps = {
  "--md-divider-color": string,
  "--md-divider-thickness": string,
};
