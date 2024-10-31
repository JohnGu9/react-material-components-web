import { createComponent } from "../../components/common/Component";
import { RmcwFilledSelect, RmcwFilledSelectComponent, SelectBaseProps } from "./Components";

export type FilledSelectProps = SelectBaseProps;

export const FilledSelect = createComponent<RmcwFilledSelect, FilledSelectProps>(
  function FilledSelect(props, ref) {
    return <RmcwFilledSelectComponent ref={ref as any} {...props} />;
  }
);
