import "@material/button/styles.scss";
import React from "react";
import { useRefComposer } from 'react-ref-composer';
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { IconContext } from "../icon/Icon";

export const ButtonContext = React.createContext<React.HTMLProps<HTMLButtonElement>>({});

export type ButtonStyle = "normal" | "outlined" | "raised" | "unelevated";

export type ButtonProps = {
  label?: React.ReactNode,
  leading?: React.ReactNode,
  trailing?: React.ReactNode,
  buttonStyle?: ButtonStyle,
  touch?: boolean,
  focusRing?: boolean,
  type?: "button" | "submit" | "reset",
};

export const Button = createComponent<HTMLButtonElement, ButtonProps>(
  function Button({
    label,
    leading,
    trailing,
    buttonStyle,
    focusRing = true,
    touch = true,
    className: c0,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const injector = useClassInjector(innerRef);
    const { className: c1, ref: r0, type, ...context } = React.useContext(ButtonContext);

    injector.with('mdc-button', true);
    injector.with('mdc-button--touch', touch);
    injector.with('mdc-button--icon-leading', isDefined(leading));
    injector.with('mdc-button--icon-trailing', isDefined(trailing));
    injector.with('mdc-button--raised', buttonStyle === "raised");
    injector.with('mdc-button--outlined', buttonStyle === "outlined");
    injector.with('mdc-button--unelevated', buttonStyle === "unelevated");
    injector.withClassName('0', c0);
    injector.withClassName('1', c1);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector);
      component.init();
      return () => component.destroy();
    }, [injector]);

    return (
      <button
        ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        {...context} {...props}>
        <span className="mdc-button__ripple" aria-hidden></span>
        {touch ? <span className="mdc-button__touch" aria-hidden></span> : undefined}
        {focusRing ? <span className="mdc-button__focus-ring" aria-hidden></span> : undefined}
        {isDefined(leading) ? <IconContext.Provider value={{ className: "mdc-button__icon", "aria-hidden": true }}>{leading}</IconContext.Provider> : undefined}
        {isDefined(label) ? <span className="mdc-button__label">{label}</span> : undefined}
        {children}
        {isDefined(trailing) ? <IconContext.Provider value={{ className: "mdc-button__icon", "aria-hidden": true }}>{trailing}</IconContext.Provider> : undefined}
      </button>
    );
  });
