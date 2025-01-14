import { createComponent } from "../../common/Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { MdNavigationTabComponent } from "./Component";
import { MdNavigationTab } from "@material/web/labs/navigationtab/navigation-tab";

export type NavigationTabProps = {
  icon?: SlotNode;
  inactiveIcon?: SlotNode;
  label?: string,
};

export const NavigationTab = createComponent<MdNavigationTab, NavigationTabProps>(
  function NavigationBar({ icon, inactiveIcon, ...props }, ref) {
    inactiveIcon ??= icon;
    return <MdNavigationTabComponent ref={ref} {...props} >
      {inactiveIcon ? createSlotNode(inactiveIcon, "inactive-icon") : <></>}
      {icon ? createSlotNode(icon, "active-icon") : <></>}
    </MdNavigationTabComponent>;
  }
);
