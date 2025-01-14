import { createComponent } from "../../common/Component";
import { RmcwOutlinedSelect, RmcwOutlinedSelectComponent, SelectBaseProps } from "./Components";

export type OutlinedSelectProps = SelectBaseProps;

export const OutlinedSelect = createComponent<RmcwOutlinedSelect, OutlinedSelectProps>(
  function OutlinedSelect(props, ref) {
    return <RmcwOutlinedSelectComponent ref={ref} {...props} />;
  }
);

export type OutlinedSelectSupportedCssProps = {
  "--md-outlined-select-text-field-outline-color": string,
  "--md-outlined-select-text-field-container-shape": string,
  "--md-outlined-select-text-field-input-text-color": string,
  "--md-outlined-select-text-field-input-text-font": string,
};
