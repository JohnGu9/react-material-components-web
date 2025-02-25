import { createComponent } from "../../common/Component";
import { RmcwLinearProgressComponent, RmcwLinearProgress, ProgressProps } from "./Component";

export type LinearProgressProps = ProgressProps & {
  buffer?: number,
};

export const LinearProgress = createComponent<RmcwLinearProgress, LinearProgressProps>(
  function LinearProgress({ value, ...props }, ref) {
    const indeterminate = (value === undefined);
    return <RmcwLinearProgressComponent ref={ref} indeterminate={indeterminate} value={value} {...(props as any)} />;
  }
);

export type LinearProgressSupportedCssProps = {
  "--md-linear-progress-track-color": string,
  "--md-linear-progress-track-height": string,
  "--md-linear-progress-track-shape": string,
  "--md-linear-progress-active-indicator-color": string,
  "--md-linear-progress-active-indicator-height": string,
};
