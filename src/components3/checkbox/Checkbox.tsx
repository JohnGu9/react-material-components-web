import "@material/web/checkbox/checkbox"
import { RmcwCheckbox, RmcwCheckboxComponent } from "./Component"
import { createComponent } from "../../common/Component";

export type CheckboxProps = {
  disabled?: boolean,
  checked?: boolean | "mixed";
  value?: string;
};

export const Checkbox = createComponent<RmcwCheckbox, CheckboxProps>(
  function Checkbox({
    checked,
    disabled = false, // idk where is the bug, but `disabled` should be set to `false` by default. The `undefined` just mean `disabled`=`true`.
    form,
    ...props }, ref) {
    const current = { checked: false, indeterminate: false };
    switch (checked) {
      case true: {
        current.checked = true;
        current.indeterminate = false;
        break;
      }
      case false: {
        current.checked = false;
        current.indeterminate = false;
        break;
      }
      case "mixed": {
        current.checked = false;
        current.indeterminate = true;
        break;
      }
    }
    return (<RmcwCheckboxComponent touch-target="wrapper"
      ref={ref as any}
      disabled={disabled}
      checked={current.checked ? true : undefined}
      indeterminate={current.indeterminate ? true : undefined}
      {...props} />);
  }
);

export type CheckboxSupportedCssProps = {
  "--md-checkbox-outline-color": string,
  "--md-checkbox-selected-container-color": string,
  "--md-checkbox-selected-icon-color": string,
  "--md-checkbox-container-shape": string,
};
