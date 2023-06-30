import "@material/tab-bar/mdc-tab-bar.scss";
import "@material/tab-indicator/mdc-tab-indicator.scss";
import "@material/tab-scroller/mdc-tab-scroller.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent } from "../common/Common";
import { TabContext } from "../tab/Tab";
import { State, TabBarComponent } from "./Component";

export type TabBarProps = {
  stacked?: boolean,
  minWidth?: boolean,
  selected?: number,
  onSelected?: (index: number) => any,
};

export const TabBar = createComponent<HTMLDivElement, TabBarProps>(
  function TabBar({
    stacked,
    minWidth,
    selected,
    onSelected,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [component, setComponent] = React.useState<TabBarComponent>();
    const state = React.useMemo<State>(() => { return {}; }, []);
    state.onSelected = onSelected;

    React.useEffect(() => {
      const component = new TabBarComponent(innerRef.current!, state);
      setComponent(component);
      return () => component.destroy();
    }, [state, children]);

    React.useEffect(() => {
      if (component && selected !== undefined) {
        component.activateTab(selected);
      }
    }, [component, selected]);

    return (
      <div ref={composeRefs(innerRef, ref)}
        className="mdc-tab-bar" role="tablist" {...props}>
        <div className="mdc-tab-scroller">
          <div className="mdc-tab-scroller__scroll-area">
            <div className="mdc-tab-scroller__scroll-content">
              <TabContext.Provider value={{ stacked, minWidth }}>
                {children}
              </TabContext.Provider>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
