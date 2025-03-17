import { createComponent } from "../../common/Component";
import { RmcwFilledSelect, RmcwFilledSelectComponent, RmcwOutlinedSelect, RmcwOutlinedSelectComponent, SelectBaseProps } from "./Components";
import { Select as MdSelect } from "@material/web/select/internal/select";
import { OutlinedSelectSupportedCssProps } from "./OutlinedSelect";
import { FilledSelectSupportedCssProps } from "./FilledSelect";

export type SelectProps = SelectBaseProps & {
  selectStyle?: "outlined" | "filled";
};

export const Select = createComponent<MdSelect, SelectProps>(
  function Select({ selectStyle, ...props }, ref) {
    switch (selectStyle) {
      case "outlined":
        return <RmcwOutlinedSelectComponent key={selectStyle} ref={ref as React.Ref<RmcwOutlinedSelect>} {...props} />;
    }
    return <RmcwFilledSelectComponent key={selectStyle} ref={ref as React.Ref<RmcwFilledSelect>} {...props} />;
  }
);


export type SelectSupportedCssProps = OutlinedSelectSupportedCssProps & FilledSelectSupportedCssProps;
