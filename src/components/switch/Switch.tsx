import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { IconContext } from "../icon/Icon";
import { RippleComponent } from "../ripple/RippleComponent";
import { RippleEventTarget } from "../ripple/Ripple";

export type SwitchProps = {
  selected?: boolean,
  touch?: boolean,
  focusRing?: boolean,
  on?: React.ReactNode,
  off?: React.ReactNode,
  type?: "button" | "submit" | "reset",
};

export const Switch = createComponent<HTMLButtonElement, SwitchProps>(
  function Switch({
    selected = false,
    touch = true,
    focusRing = true,
    on, off,
    className,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const rippleElement = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);
    const eventTarget = React.useContext(RippleEventTarget);

    injector.with('mdc-switch', true);
    injector.with('mdc-switch--selected', selected);
    injector.with('mdc-switch--unselected', !selected);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector, eventTarget,
        () => rippleElement.current!.getBoundingClientRect(), true);
      component.init();
      return () => component.destroy();
    }, [eventTarget, injector]);

    return (
      <button ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        type="button" role="switch"
        aria-checked={selected}
        {...props}>
        <div className="mdc-switch__track" aria-hidden></div>
        <div className="mdc-switch__handle-track" aria-hidden>
          <div className="mdc-switch__handle">
            <div className="mdc-switch__shadow">
              <div className="mdc-elevation-overlay"></div>
            </div>
            <div className="mdc-switch__ripple" ref={rippleElement}></div>
            <div className="mdc-switch__icons">
              {isDefined(on)
                ? <IconContext.Provider value={{
                  className: 'mdc-switch__icon mdc-switch__icon--on',
                  viewBox: '0 0 24 24',
                  style: {
                    margin: 1,
                    fontSize: 18,
                    color: 'var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))'
                  },
                } as React.HTMLProps<HTMLElement>}>
                  {on}
                </IconContext.Provider>
                : <svg className="mdc-switch__icon mdc-switch__icon--on" viewBox="0 0 24 24">
                  <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
                </svg>}
              {isDefined(off)
                ? <IconContext.Provider value={{
                  className: 'mdc-switch__icon mdc-switch__icon--off',
                  viewBox: '0 0 24 24',
                  style: {
                    margin: 1,
                    fontSize: 18,
                    color: 'var(--mdc-switch-selected-icon-color, var(--mdc-theme-on-primary, #fff))'
                  },
                } as React.HTMLProps<HTMLElement>}>
                  {off}
                </IconContext.Provider>
                : <svg className="mdc-switch__icon mdc-switch__icon--off" viewBox="0 0 24 24">
                  <path d="M20 13H4v-2h16v2z" />
                </svg>}
            </div>
          </div>
        </div>
        {focusRing ? <span className="mdc-switch__focus-ring-wrapper" aria-hidden>
          <div className="mdc-switch__focus-ring"></div>
        </span> : undefined}
      </button>
    );
  });
