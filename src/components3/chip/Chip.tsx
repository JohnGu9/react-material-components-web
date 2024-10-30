import "@material/web/chips/assist-chip";
import { MdAssistChip } from "@material/web/chips/assist-chip";
import { MdAssistChipComponent, MdSuggestionChipComponent, RmcwFilterChip, RmcwFilterChipComponent, RmcwInputChip, RmcwInputChipComponent } from "./Component"
import "@material/web/chips/input-chip";
import "@material/web/chips/suggestion-chip";
import { MdSuggestionChip } from "@material/web/chips/suggestion-chip";
import { createComponent } from "../../components/common/Component";
import { IconContext } from "../icon/Icon";


function composeProps({ disabled, elevated, selected, removable, icon, children, ...props }: { [key: string]: any }) {
  return {
    disabled, elevated, selected, removable,
    children: icon ? <>
      {children}
      <IconContext.Provider value={{ style: { fontSize: 18 } }}><div slot="icon">{icon}</div></IconContext.Provider>
    </>
      : children,
    ...props
  };
}

// AssistChip is simple chip type
export type AssistChipProps = {
  elevated?: boolean,
  icon?: React.ReactNode,
  //
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
};
export const AssistChip = createComponent<MdAssistChip, AssistChipProps>(
  function AssistChip(props, ref) {
    return <MdAssistChipComponent ref={ref as any} {...props} />;
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
    let removable = undefined;
    if (onRemoveClick) {
      removable = true;
    }
    return <RmcwFilterChipComponent ref={ref as any} {...composeProps(props)} removable={removable} onRemoveClick={onRemoveClick} />;
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
    return <RmcwInputChipComponent ref={ref as any} {...composeProps(props)} />;
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
