import { MdSecondaryTab } from "@material/web/tabs/secondary-tab";
import { createComponent } from "../../components/common/Component";
import { MdSecondaryTabComponent } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";

export type SecondaryTabProps = {
  icon?: SlotNode,
};

export const SecondaryTab = createComponent<MdSecondaryTab, SecondaryTabProps>(
  function SecondaryTab({ icon, children, ...props }, ref) {
    const mergeChildren = <>
      {icon ? createSlotNode(icon, "icon") : <></>}
      {children}
    </>;
    return <MdSecondaryTabComponent ref={ref as any} children={mergeChildren} {...props} />;
  }
);
