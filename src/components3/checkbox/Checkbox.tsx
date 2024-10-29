import "@material/web/checkbox/checkbox"
import { Checkbox as MdCheckbox } from "@material/web/checkbox/internal/checkbox"
import { createComponent } from "../../components/common/Component";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-checkbox': React.HTMLProps<MdCheckbox> & Partial<Pick<MdCheckbox, "required" | "checked" | "indeterminate">>;
    }
  }
}

export type CheckboxProps = {
  checked?: boolean | "mixed";
};

export const Checkbox = createComponent<MdCheckbox, CheckboxProps>(
  function Checkbox({ checked, ...props }, ref) {
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
    return (<md-checkbox ref={ref}
      checked={current.checked ? true : undefined}
      indeterminate={current.indeterminate ? true : undefined}
      touch-target="wrapper"
      {...props} />);
  }
);
