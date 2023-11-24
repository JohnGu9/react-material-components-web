import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../common/Common";
import { useUuidV4 } from "../common/Uuid";
import { FormFieldContext } from "../form-field/FormField";
import "./style.scss";
import { RippleComponent } from "../ripple/Component";
import { RippleEventTarget } from "../ripple/Ripple";
import { ListItemContext } from "../list-item/ListItem";
import { CompactWrapper } from "../common/CompactWrapper";

export type RadioProps = {
  checked?: boolean,
  disabled?: boolean,
  touch?: boolean,
  focusRing?: boolean,
  inputId?: string,
  compact?: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
};

export const Radio = createComponent<HTMLDivElement, RadioProps>(
  function Radio({
    checked = false,
    disabled = false,
    touch = true,
    focusRing = true,
    compact,
    inputId,
    onChange,
    className,
    ...props }, ref) {
    const uuid = useUuidV4();
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);
    const input = React.useRef<HTMLInputElement>(null);
    const formField = React.useContext(FormFieldContext);
    const eventTarget = React.useContext(RippleEventTarget);
    const isInListItem = React.useContext(ListItemContext);
    const finalId = inputId ?? uuid;

    injector.with('mdc-radio', true);
    injector.with('mdc-radio--disabled', disabled);
    injector.with('mdc-radio--touch', touch);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector, undefined, { eventTarget });
      component.init();
      return () => component.destroy();
    }, [eventTarget, injector]);

    React.useEffect(() => {
      const current = formField?.current;
      if (current) {
        if (current.htmlFor !== "") throw Error();
        current.htmlFor = finalId;
        return () => { current.htmlFor = ""; }
      }
    }, [finalId, formField]);

    React.useEffect(() => {
      const { current } = input;
      if (current) {
        current.checked = checked;
      }
    }, [checked]);

    return (
      <CompactWrapper enable={compact ?? isInListItem}>
        <div ref={composeRefs(innerRef, ref)}
          className={injector.toClassName()}
          aria-checked={checked}
          aria-disabled={disabled}
          {...props}>
          <input className="mdc-radio__native-control"
            type="radio"
            ref={input}
            id={finalId}
            defaultChecked={checked}
            disabled={disabled}
            onChange={(e) => {
              e.target.checked = checked;
              onChange?.(e);
            }}
            readOnly={onChange === undefined} />
          <div className="mdc-radio__background" aria-hidden>
            <div className="mdc-radio__outer-circle"></div>
            <div className="mdc-radio__inner-circle"></div>
          </div>
          <div className="mdc-radio__ripple" aria-hidden></div>
          {focusRing ? <div className="mdc-radio__focus-ring" aria-hidden></div> : undefined}
        </div>
      </CompactWrapper>
    );
  }
);
