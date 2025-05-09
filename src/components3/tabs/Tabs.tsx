import { createComponent } from "../../common/Component";
import { RmcwTabs, RmcwTabsComponent } from "./Component";
import React from "react";

// Material Design 3 `Tabs` is no longer block value change by user input like before.
// It just perform like native React input element.
// And value change behavior can`t be blocked useless disable it.
// Just like `TextField`.

// eslint-disable-next-line react-refresh/only-export-components
export const TabsContext = React.createContext(false);

export type TabsProps = {
  secondary?: boolean,
  selected?: number,
  onSelected?: (index: number) => unknown,
  onChange?: (event: Event) => void,
};

export const Tabs = createComponent<RmcwTabs, TabsProps>(
  function Tabs({ secondary = false, selected, onSelected, ...props }, ref) {
    return (
      <TabsContext.Provider value={secondary}>
        <RmcwTabsComponent
          key={secondary ? 1 : 0}
          activeTabIndex={selected}
          onSelected={e => onSelected?.((e as CustomEvent<number>).detail)}
          ref={ref} {...props} />
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
