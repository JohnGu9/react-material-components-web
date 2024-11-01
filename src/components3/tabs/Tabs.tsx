import { MdTabs } from "@material/web/tabs/tabs";
import { createComponent } from "../../components/common/Component";
import { MdTabsComponent } from "./Component";

// Material Design 3 `Tabs` is no longer block value change by user input like before.
// It just perform like native React input element.
// And value change behavior can`t be blocked useless disable it.
// Just like `TextField`.

export type TabsProps = {
  activeTabIndex?: number,
  onChange?: (event: Event) => void,
};

export const Tabs = createComponent<MdTabs, TabsProps>(
  function Tabs(props, ref) {
    return <MdTabsComponent ref={ref as any} {...props} />;
  }
);

export function getActiveTabIndex(element: MdTabs) {
  return element.activeTabIndex;
}
