import React from "react";
import { classMap, createComponent } from "../common/Common";

export type FloatingLabelProps = {
  shake?: boolean,
  float?: boolean,
  required?: boolean,
  onAnimationEnd?: React.AnimationEventHandler<HTMLSpanElement>,
};

export const FloatingLabel = createComponent<HTMLSpanElement, FloatingLabelProps>(
  function FloatingLabel({
    shake = false,
    float = false,
    required = false,
    className,
    ...props
  }, ref) {
    const classes = {
      'mdc-floating-label': true,
      'mdc-floating-label--shake': shake && float,
      'mdc-floating-label--required': required,
      'mdc-floating-label--float-above': float,
    }
    return <span ref={ref} className={classMap(classes, className)} {...props} />;
  }
);
