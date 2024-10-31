import { createComponent } from "../../components/common/Component";
import { RmcwOutlinedSelect, RmcwOutlinedSelectComponent, SelectBaseProps } from "./Components";

export type OutlinedSelectProps = SelectBaseProps;

export const OutlinedSelect = createComponent<RmcwOutlinedSelect, OutlinedSelectProps>(
  function OutlinedSelect(props, ref) {
    return <RmcwOutlinedSelectComponent ref={ref as any} {...props} />;
  }
);
