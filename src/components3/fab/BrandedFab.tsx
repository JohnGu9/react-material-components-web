import { FabSize, MdBrandedFab } from "@material/web/fab/branded-fab";
import { createComponent } from "../../components/common/Component";
import { MdBrandedFabComponent } from "./Component";
import { IconContext } from "../icon/Icon";

export type BrandedFabProps = {
  size?: FabSize,
  lowered?: boolean,
  icon?: React.ReactNode,
};

export const BrandedFab = createComponent<MdBrandedFab, BrandedFabProps>(
  function BrandedFab({ size, icon, children, ...props }, ref) {
    let iconSize = 36;
    if (size === "large") {
      iconSize = 48;
    }

    return (
      <MdBrandedFabComponent ref={ref as any} size={size} {...props} >
        {icon ? <IconContext.Provider value={{ style: { fontSize: iconSize } }}><div slot="icon">{icon}</div></IconContext.Provider> : <></>}
        {children}
      </MdBrandedFabComponent>);
  }
);
