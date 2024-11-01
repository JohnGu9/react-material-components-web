import { createComponent } from "../../components/common/Component";
import { RmcwFilledSelect, RmcwFilledSelectComponent, SelectBaseProps } from "./Components";

export type FilledSelectProps = SelectBaseProps;

export const FilledSelect = createComponent<RmcwFilledSelect, FilledSelectProps>(
  function FilledSelect(props, ref) {
    return <RmcwFilledSelectComponent ref={ref as any} {...props} />;
  }
);

export type FilledSelectSupportedCssProps = {
  "--md-filled-select-text-field-container-color": string,
  "--md-filled-select-text-field-container-shape": string,
  "--md-filled-select-text-field-input-text-color": string,
  "--md-filled-select-text-field-input-text-font": string,
};
