import { MdSelectOption } from "@material/web/select/select-option";
import { createComponent } from "../../components/common/Component";
import { MdSelectOptionComponent } from "./Components";
import { createSlotNode, SlotNode } from "../common/SlotNode";

export type SelectOptionProps = {
  selected?: boolean,
  start?: SlotNode,
  end?: SlotNode,
  overline?: SlotNode,
  headline?: SlotNode,
  supportingText?: SlotNode,
  trailingSupportingText?: SlotNode,

  //
  type?: "option",
  value?: string,
};

export const SelectOption = createComponent<MdSelectOption, SelectOptionProps>(
  function SelectOption({ start, end, overline, headline, supportingText, trailingSupportingText, children, ...props }, ref) {
    return (
      <MdSelectOptionComponent ref={ref as any} {...props} >
        {children}
        {start ? createSlotNode(start, "start") : <></>}
        {end ? createSlotNode(end, "end") : <></>}
        {overline ? createSlotNode(overline, "overline") : <></>}
        {headline ? createSlotNode(headline, "headline") : <></>}
        {supportingText ? createSlotNode(supportingText, "supporting-text") : <></>}
        {trailingSupportingText ? createSlotNode(trailingSupportingText, "trailing-supporting-text") : <></>}
      </MdSelectOptionComponent>);
  }
);
