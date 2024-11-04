import "@material/touch-target/mdc-touch-target.scss";
import { classMap, createComponent } from "../../common/Common";

export type TouchTargetWrapperProps = {};

export const TouchTargetWrapper = createComponent<HTMLDivElement, TouchTargetWrapperProps>(
  function TouchTargetWrapper({ className, ...props }, ref) {
    const classes = { 'mdc-touch-target-wrapper': true };
    return <div ref={ref} className={classMap(classes, className)} {...props} />;
  }
); 
