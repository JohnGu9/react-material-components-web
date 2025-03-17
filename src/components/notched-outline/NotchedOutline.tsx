import { estimateScrollWidth } from "@material/dom/ponyfill";
import React from "react";
import { classMap, createComponent, isDefined } from "../../common/Common";
import { FloatingLabel } from "../floating-label/FloatingLabel";

export type NotchedOutlineProps = {
  labelId?: string,
  notched?: boolean,
  required?: boolean,
};

export const NotchedOutline = createComponent<HTMLSpanElement, NotchedOutlineProps>(
  function NotchedOutline(props, ref) {
    if (isDefined(props.children) && props.children !== "")
      return <WithLabel props={props} forwardRef={ref} />;
    else
      return <WithoutLabel props={props} forwardRef={ref} />;
  }
);

function WithLabel({ props: {
  labelId,
  required,
  notched = false,
  children,
  className,
  ...props
}, forwardRef }: { props: React.ComponentPropsWithoutRef<typeof NotchedOutline>, forwardRef: React.ForwardedRef<HTMLSpanElement>; }) {
  const [label, setLabel] = React.useState<HTMLSpanElement | null>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (label) {
      const update = () => setWidth(estimateScrollWidth(label));
      const observer = new ResizeObserver(update);
      observer.observe(label);
      update();
      return () => observer.disconnect();
    }
  }, [label]);

  const classes = {
    'mdc-notched-outline': true,
    'mdc-notched-outline--upgraded': true,
    'mdc-notched-outline--notched': notched,
  };

  return (
    <span ref={forwardRef}
      className={classMap(classes, className)} {...props}>
      <span className="mdc-notched-outline__leading" aria-hidden></span>
      <span className="mdc-notched-outline__notch"
        style={{ width: notched ? width * 0.75 + 8 : undefined }} aria-hidden>
        <FloatingLabel
          ref={setLabel}
          id={labelId}
          required={required}
          float={notched}
          aria-hidden>
          {children}
        </FloatingLabel>
      </span>
      <span className="mdc-notched-outline__trailing" aria-hidden></span>
    </span>
  );
}

function WithoutLabel({ props: {
  className,
  ...props
}, forwardRef }: { props: Omit<React.ComponentPropsWithoutRef<typeof NotchedOutline>, "labelId" | "required" | "notched">, forwardRef: React.ForwardedRef<HTMLSpanElement>; }) {

  const classes = {
    'mdc-notched-outline': true,
    'mdc-notched-outline--no-label': true,
  };

  return (
    <span ref={forwardRef}
      className={classMap(classes, className)} {...props}>
      <span className="mdc-notched-outline__leading" aria-hidden></span>
      <span className="mdc-notched-outline__trailing" aria-hidden></span>
    </span>
  );
}
