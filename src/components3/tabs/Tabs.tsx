import { MdTabs } from "@material/web/tabs/tabs";
import { createComponent } from "../../common/Component";
import { RmcwTabsComponent } from "./Component";
import React from "react";

// Material Design 3 `Tabs` is no longer block value change by user input like before.
// It just perform like native React input element.
// And value change behavior can`t be blocked useless disable it.
// Just like `TextField`.

export const TabsContext = React.createContext(false);

export type TabsProps = {
  secondary?: boolean,
  selected?: number,
  onSelected?: (index: number) => any,
  onChange?: (event: Event) => void,
};

export const Tabs = createComponent<MdTabs, TabsProps>(
  function Tabs({ secondary = false, selected, onSelected, ...props }, ref) {
    return (
      <TabsContext.Provider value={secondary}>
        <RmcwTabsComponent
          key={secondary ? 1 : 0}
          activeTabIndex={selected}
          onSelected={e => onSelected?.((e as CustomEvent<number>).detail)}
          ref={ref as any} {...props} />
      </TabsContext.Provider>);
  }
);

export type TabsSupportedCssProps = {
  "--md-primary-tab-container-color": string,
  "--md-primary-tab-label-text-font": string,
  "--md-primary-tab-active-indicator-color": string,
  "--md-primary-tab-icon-color": string,
  "--md-primary-tab-container-shape": string,

  "--md-secondary-tab-container-color": string,
  "--md-secondary-tab-label-text-font": string,
  "--md-secondary-tab-active-indicator-color": string,
  "--md-secondary-tab-icon-color": string,
  "--md-secondary-tab-container-shape": string,
};
