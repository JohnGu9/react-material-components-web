import { MdAssistChip } from "@material/web/chips/assist-chip";
import { MdAssistChipComponent, MdSuggestionChipComponent, RmcwFilterChip, RmcwFilterChipComponent, RmcwInputChip, RmcwInputChipComponent } from "./Component";
import { MdSuggestionChip } from "@material/web/chips/suggestion-chip";
import { createComponent } from "../../common/Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";


function composeProps({ icon, style, children, ...props }: { [key: string]: any; }) {
  return {
    style: { "--md-icon-size": "18px", ...style },
    children: icon ? <>
      {children}
      {icon ? createSlotNode(icon, "icon") : <></>}
    </>
      : children,
    ...props
  };
}

// AssistChip is simple chip type
export type AssistChipProps = {
  elevated?: boolean,
  icon?: SlotNode,
  //
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
};
export const AssistChip = createComponent<MdAssistChip, AssistChipProps>(
  function AssistChip(props, ref) {
    return <MdAssistChipComponent ref={ref} {...composeProps(props)} />;
  }
);

// FilterChip is full-ability chip type
// set `onRemoveClick` callback and the remove button will automatically show
export type FilterChipProps = AssistChipProps & {
  selected?: boolean,
  onRemoveClick?: ((e: Event) => void),
};
export const FilterChip = createComponent<RmcwFilterChip, FilterChipProps>(
  function FilterChip({ onRemoveClick, ...props }, ref) {
    return <RmcwFilterChipComponent ref={ref} {...composeProps(props)} removable={onRemoveClick !== undefined} onRemoveClick={onRemoveClick} />;
  }
);

// InputChip is always-removable chip type
// the remove button show all the time
export type InputChipProps = {
  selected?: boolean,
  icon?: React.ReactNode,
  onRemoveClick?: ((e: Event) => void),
  //
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
};
export const InputChip = createComponent<RmcwInputChip, InputChipProps>(
  function InputChip(props, ref) {
    return <RmcwInputChipComponent ref={ref} {...composeProps(props)} />;
  }
);

// SuggestionChip is AssistChip extend type
export type SuggestionChipProps = AssistChipProps;
export const SuggestionChip = createComponent<MdSuggestionChip, SuggestionChipProps>(
  function SuggestionChip(props, ref) {
    return <MdSuggestionChipComponent ref={ref} {...composeProps(props)} />;
  }
);


export type ClipProps = FilterChipProps;
export const Clip = FilterChip;

export type ChipSupportedCssProps = {
  "--md-assist-chip-outline-color": string,
  "--md-assist-chip-container-shape": string,
  "--md-assist-chip-icon-size": string,
  "--md-assist-chip-label-text-color": string,
  "--md-assist-chip-label-text-font": string,

  "--md-filter-chip-selected-container-color": string,
  "--md-filter-chip-outline-color": string,
  "--md-filter-chip-container-shape": string,
  "--md-filter-chip-icon-size": string,
  "--md-filter-chip-label-text-color": string,
  "--md-filter-chip-label-text-font": string,

  "--md-input-chip-outline-color": string,
  "--md-input-chip-container-shape": string,
  "--md-input-chip-icon-size": string,
  "--md-input-chip-label-text-color": string,
  "--md-input-chip-label-text-font": string,

  "--md-suggestion-chip-outline-color": string,
  "--md-suggestion-chip-container-shape": string,
  "--md-suggestion-chip-icon-size": string,
  "--md-suggestion-chip-label-text-color": string,
  "--md-suggestion-chip-label-text-font": string,
};
