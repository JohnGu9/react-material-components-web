import { FabSize, FabVariant, MdFab } from "@material/web/fab/fab";
import { createComponent } from "../../components/common/Component";
import { MdFabComponent } from "./Component";
import { IconContext } from "../icon/Icon";

export type FabProps = {
  size?: FabSize,
  lowered?: boolean,
  variant?: FabVariant,
  icon?: React.ReactNode,
};

export const Fab = createComponent<MdFab, FabProps>(
  function Fab({ size, icon, children, ...props }, ref) {
    let iconSize = 24;
    if (size === "large") {
      iconSize = 36;
    }

    return (
      <MdFabComponent ref={ref as any} size={size} {...props} >
        {icon ? <IconContext.Provider value={{ style: { fontSize: iconSize } }}><div slot="icon">{icon}</div></IconContext.Provider> : <></>}
        {children}
      </MdFabComponent>);
  }
);
