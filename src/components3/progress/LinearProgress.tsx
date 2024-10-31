import { MdCircularProgress } from "@material/web/progress/circular-progress";
import { createComponent } from "../../components/common/Component";
import { MdLinearProgressComponent, ProgressProps } from "./Component";

export type LinearProgressProps = ProgressProps & {
  buffer?: number,
};

export const LinearProgress = createComponent<MdCircularProgress, LinearProgressProps>(
  function LinearProgress({ value, ...props }, ref) {
    const indeterminate = (value === undefined);
    return <MdLinearProgressComponent ref={ref as any} indeterminate={indeterminate} value={value} {...(props as any)} />;
  }
);
