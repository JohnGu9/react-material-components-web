import { createComponent } from "../../common/Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { RmcwSwitch, RmcwSwitchComponent } from "./Component";

export type SwitchProps = {
  selected?: boolean,
  required?: boolean,
  icons?: boolean | "show-only-selected-icon",
  onIcon?: SlotNode, // size of 'the place to show icon' is 24 * 28px
  offIcon?: SlotNode,
  //
  form?: never,
  value?: string,
};

export const Switch = createComponent<RmcwSwitch, SwitchProps>(
  function Switch({ icons, onIcon, offIcon, children, ...props }, ref) {
    const mergeChildren = <>
      {children}
      {onIcon ? createSlotNode(onIcon, "on-icon") : <></>}
      {offIcon ? createSlotNode(offIcon, "off-icon") : <></>}
    </>;
    switch (icons) {
      case "show-only-selected-icon":
        return <RmcwSwitchComponent ref={ref as any} icons showOnlySelectedIcon children={mergeChildren}  {...props} />;
    }
    return <RmcwSwitchComponent ref={ref as any} icons={icons} children={mergeChildren}  {...props} />;
  }
);

export type SwitchSupportedCssProps = {
  "--md-switch-handle-color": string,
  "--md-switch-handle-shape": string,
  "--md-switch-track-color": string,
  "--md-switch-track-shape": string,
  "--md-switch-selected-handle-color": string,
  "--md-switch-selected-track-color": string,
};
