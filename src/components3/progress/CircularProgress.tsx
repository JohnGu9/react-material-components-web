import { createComponent } from "../../common/Component";
import { RmcwCircularProgress, MmcwCircularProgressComponent, ProgressProps } from "./Component";

export type CircularProgressProps = ProgressProps;

export const CircularProgress = createComponent<RmcwCircularProgress, CircularProgressProps>(
  function CircularProgress({ value, ...props }, ref) {
    const indeterminate = (value === undefined);
    return <MmcwCircularProgressComponent ref={ref} indeterminate={indeterminate} value={value} {...props} />;
  }
);

export type CircularProgressSupportedCssProps = {
  "--md-circular-progress-color": string,
  "--md-circular-progress-size": string,
  "--md-circular-progress-active-indicator-width": string,
};
