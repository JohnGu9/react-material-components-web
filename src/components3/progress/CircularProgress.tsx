import { MdCircularProgress } from "@material/web/progress/circular-progress";
import { createComponent } from "../../common/Component";
import { MdCircularProgressComponent, ProgressProps } from "./Component";

export type CircularProgressProps = ProgressProps;

export const CircularProgress = createComponent<MdCircularProgress, CircularProgressProps>(
  function CircularProgress({ value, ...props }, ref) {
    const indeterminate = (value === undefined);
    return <MdCircularProgressComponent ref={ref as any} indeterminate={indeterminate} value={value} {...props} />;
  }
);

export type CircularProgressSupportedCssProps = {
  "--md-circular-progress-color": string,
  "--md-circular-progress-size": string,
  "--md-circular-progress-active-indicator-width": string,
};
