import { MdTabs } from "@material/web/tabs/tabs";
import { createComponent } from "../../components/common/Component";
import { MdTabsComponent } from "./Component";
import React from "react";

// Material Design 3 `Tabs` is no longer block value change by user input like before.
// It just perform like native React input element.
// And value change behavior can`t be blocked useless disable it.
// Just like `TextField`.

export const TabsContext = React.createContext(false);

export type TabsProps = {
  secondary?: boolean,
  activeTabIndex?: number,
  onChange?: (event: Event) => void,
};

export const Tabs = createComponent<MdTabs, TabsProps>(
  function Tabs({ secondary = false, ...props }, ref) {
    return (
      <TabsContext.Provider value={secondary}>
        <MdTabsComponent key={secondary ? 1 : 0} ref={ref as any} {...props} />
      </TabsContext.Provider>);
  }
);

export function getActiveTabIndex(element: MdTabs) {
  return element.activeTabIndex;
}
