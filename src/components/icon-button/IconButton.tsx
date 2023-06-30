import "@material/icon-button/styles.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { IconContext } from "../icon/Icon";

export const IconButtonContext = React.createContext<React.HTMLProps<HTMLButtonElement>>({});

export type IconButtonProps = {
  touch?: boolean,
  focusRing?: boolean,
  type?: "button" | "submit" | "reset",
};

export const IconButton = createComponent<HTMLButtonElement, IconButtonProps>(
  function IconButton({
    children,
    focusRing = true,
    touch = true,
    className,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const injector = useClassInjector(innerRef);
    const { className: c1, ref: r0, type, ...context } = React.useContext(IconButtonContext);

    injector.with('mdc-icon-button', true);
    injector.with('mdc-icon-button--touch', touch);
    injector.withClassName('0', className);
    injector.withClassName('1', c1);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector);
      component.init();
      component.unbounded = true;
      return () => component.destroy();
    });

    return (
      <button ref={composeRefs(innerRef, ref)} className={injector.toClassName()} {...context} {...props}>
        <div className="mdc-icon-button__ripple" aria-hidden></div>
        {focusRing ? <span className="mdc-icon-button__focus-ring" aria-hidden></span> : undefined}
        <IconContext.Provider value={{ className: "mdc-icon-button__icon" }}>{children}</IconContext.Provider>
        {touch ? <div className="mdc-icon-button__touch" aria-hidden></div> : undefined}
      </button>
    );
  }
);
