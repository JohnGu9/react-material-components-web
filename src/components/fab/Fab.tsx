import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { IconContext } from "../icon/Icon";
import "./Fab.scss";

export type FabProps = {
  mini?: boolean,
  label?: string,
  exited?: boolean,
  touch?: boolean,
  focusRing?: boolean,
  type?: "button" | "submit" | "reset",
};

export const Fab = createComponent<HTMLButtonElement, FabProps>(
  function Fab({
    mini = false,
    label,
    exited = false,
    touch = true,
    focusRing = true,
    className,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const injector = useClassInjector(innerRef);

    injector.with('mdc-fab', true);
    injector.with('mdc-fab--touch', touch);
    injector.with('mdc-fab--mini', mini);
    injector.with('mdc-fab--extended', isDefined(label));
    injector.with('mdc-fab--exited', exited);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector);
      component.init();
      return () => component.destroy();
    }, [injector]);

    return (
      <button ref={composeRefs(innerRef, ref)} className={injector.toClassName()} {...props}>
        <div className="mdc-fab__ripple"></div>
        {focusRing ? <div className="mdc-fab__focus-ring"></div> : undefined}
        {<IconContext.Provider value={{ className: "mdc-fab__icon" }}>{children}</IconContext.Provider>}
        {isDefined(label) ? <span className="mdc-fab__label">{label}</span> : undefined}
        {touch ? <div className="mdc-fab__touch"></div> : undefined}
      </button>
    );
  }
);
