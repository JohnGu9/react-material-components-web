import "@material/line-ripple/mdc-line-ripple.scss";
import { createComponent } from "../common/Common";

export type LineRippleProps = {
  activated?: boolean,
};

export const LineRipple = createComponent<HTMLSpanElement, LineRippleProps>(
  function LineRipple({
    activated,
    className,
    ...props
  }, ref) {
    return <span ref={ref} className={`mdc-line-ripple ${activated ? 'mdc-line-ripple--active' : 'mdc-line-ripple--deactivating'}${className !== undefined ? ` ${className}` : ''}`}{...props} />
  }
);
