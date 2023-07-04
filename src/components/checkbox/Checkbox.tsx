import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../common/Common";
import { useUuidV4 } from "../common/Uuid";
import { FormFieldContext } from "../form-field/FormField";
import "@material/checkbox/mdc-checkbox.scss";
import { MDCCheckboxFoundation } from "@material/checkbox";
import { RippleComponent } from "../ripple/RippleComponent";
import { RippleEventTarget } from "../ripple/Ripple";

export type CheckboxProps = {
  checked?: boolean | "mixed";
  focusRing?: boolean,
  touch?: boolean,
  inputId?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
};

export const Checkbox = createComponent<HTMLDivElement, CheckboxProps>(
  function Checkbox({
    checked = false,
    disabled = false,
    focusRing = true,
    touch = true,
    inputId,
    className,
    onChange,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const uuid = useUuidV4();
    const finalId = inputId ?? uuid;
    const innerRef = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);
    const input = React.useRef<HTMLInputElement>(null);
    const formField = React.useContext(FormFieldContext);
    const [state, setState] = React.useState(checked);
    const [animationClass, setAnimationClass] = React.useState(";");
    const eventTarget = React.useContext(RippleEventTarget);

    injector.with('mdc-checkbox', true);
    injector.with('mdc-checkbox--touch', touch);
    injector.with('mdc-checkbox--checked', checked === true);
    injector.with('mdc-checkbox--indeterminate', checked === "mixed");
    injector.with('mdc-checkbox--selected', checked !== false);
    injector.with('mdc-checkbox--disabled', disabled);
    injector.withClassName('0', className);
    injector.withClassName('1', animationClass);

    React.useEffect(() => {
      const current = formField?.current;
      if (current) {
        if (current.htmlFor !== "") throw Error();
        current.htmlFor = finalId;
        return () => { current.htmlFor = ""; }
      }
    }, [finalId, formField]);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector, eventTarget, undefined, true);
      component.init();
      return () => component.destroy();
    }, [eventTarget, injector]);

    React.useEffect(() => {
      if (state !== checked) {
        const getTransitionAnimationClass = (oldState: boolean | "mixed", newState: boolean | "mixed") => {
          const {
            ANIM_UNCHECKED_CHECKED,
            ANIM_UNCHECKED_INDETERMINATE,
            ANIM_CHECKED_UNCHECKED,
            ANIM_CHECKED_INDETERMINATE,
            ANIM_INDETERMINATE_CHECKED,
            ANIM_INDETERMINATE_UNCHECKED,
          } = MDCCheckboxFoundation.cssClasses;
          switch (oldState) {
            case false:
              return newState === true ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
            case true:
              return newState === false ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
            default: // TRANSITION_STATE_INDETERMINATE
              return newState === true ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
          }
        }
        setAnimationClass(getTransitionAnimationClass(state, checked));
        setState(checked);
      }
    }, [checked, state]);

    React.useEffect(() => {
      const { current } = input;
      if (current) {
        switch (checked) {
          case true: {
            current.checked = true;
            current.indeterminate = false;
            break;
          }
          case false: {
            current.checked = false;
            current.indeterminate = false;
            break;
          }
          case "mixed": {
            current.checked = false;
            current.indeterminate = true;
            break;
          }
        }
      }
    }, [checked]);

    return (
      <div ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        {...props}>
        <input ref={input}
          id={finalId}
          disabled={disabled}
          aria-checked={checked}
          aria-disabled={disabled}
          type="checkbox"
          className="mdc-checkbox__native-control"
          onChange={(e) => {
            e.target.checked = checked === true;
            e.target.indeterminate = checked === "mixed";
            onChange?.(e);
          }}
          readOnly={onChange === undefined} />
        <div className="mdc-checkbox__background" aria-hidden>
          <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path className="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
          </svg>
          <div className="mdc-checkbox__mixedmark"></div>
        </div>
        <div className="mdc-checkbox__ripple" aria-hidden></div>
        {touch ? <span className="mdc-checkbox__touch" aria-hidden></span> : undefined}
        {focusRing ? <div className="mdc-checkbox__focus-ring" aria-hidden></div> : undefined}
        {children}
      </div>
    );
  });

