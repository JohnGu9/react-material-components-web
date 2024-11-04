import { Tab as MdTab } from "@material/web/tabs/internal/tab";
import { createComponent } from "../../common/Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { MdPrimaryTabComponent, MdSecondaryTabComponent } from "./Component";
import { TabsContext } from "./Tabs";
import React from "react";

export type TabProps = {
  icon?: SlotNode,
  inlineIcon?: boolean,
};

export const Tab = createComponent<MdTab, TabProps>(
  function PrimaryTab({ icon, inlineIcon, children, ...props }, ref) {
    const secondary = React.useContext(TabsContext);
    const mergeChildren = <>
      {icon ? createSlotNode(icon, "icon") : <></>}
      {children}
    </>;
    if (secondary) {
      return <MdSecondaryTabComponent ref={ref as any} children={mergeChildren} {...props} />;
    }
    return <MdPrimaryTabComponent ref={ref as any} inlineIcon={inlineIcon} children={mergeChildren} {...props} />;
  }
);
