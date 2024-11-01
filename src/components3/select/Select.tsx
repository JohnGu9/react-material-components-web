import { createComponent } from "../../components/common/Component";
import { RmcwFilledSelectComponent, RmcwOutlinedSelectComponent, SelectBaseProps } from "./Components";
import { Select as MdSelect } from "@material/web/select/internal/select";

export type SelectProps = SelectBaseProps & {
  selectStyle?: "outlined" | "filled"
};

export const Select = createComponent<MdSelect, SelectProps>(
  function Select({ selectStyle, ...props }, ref) {
    switch (selectStyle) {
      case "outlined":
        return <RmcwOutlinedSelectComponent key={selectStyle} ref={ref as any} {...props} />;
    }
    return <RmcwFilledSelectComponent key={selectStyle} ref={ref as any} {...props} />;
  }
);
