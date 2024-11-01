import { MdPrimaryTab } from "@material/web/tabs/primary-tab";
import { createComponent } from "../../components/common/Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { MdPrimaryTabComponent } from "./Component";

export type PrimaryTabProps = {
  icon?: SlotNode,
  inlineIcon?: boolean,
};

export const PrimaryTab = createComponent<MdPrimaryTab, PrimaryTabProps>(
  function PrimaryTab({ icon, children, ...props }, ref) {
    const mergeChildren = <>
      {icon ? createSlotNode(icon, "icon") : <></>}
      {children}
    </>;
    return <MdPrimaryTabComponent ref={ref as any} children={mergeChildren} {...props} />;
  }
);
