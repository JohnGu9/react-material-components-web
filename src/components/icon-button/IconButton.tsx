import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../../common/Common";
import { RippleComponent } from "../ripple/Component";
import { IconContext } from "../icon/Icon";
import { RippleEventTarget } from "../ripple/Ripple";
import { ListItemContext } from "../list-item/ListItem";
import { CompactWrapper } from "../../common/CompactWrapper";

// eslint-disable-next-line react-refresh/only-export-components
export const IconButtonContext = React.createContext<React.HTMLProps<HTMLButtonElement>>({});

export type IconButtonProps = {
  touch?: boolean,
  focusRing?: boolean,
  type?: "button" | "submit" | "reset",
  compact?: boolean,
};

export const IconButton = createComponent<HTMLButtonElement, IconButtonProps>(
  function IconButton({
    children,
    focusRing = true,
    touch = true,
    compact,
    className,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const injector = useClassInjector(innerRef);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className: c1, ref: r0, type, ...context } = React.useContext(IconButtonContext);
    const eventTarget = React.useContext(RippleEventTarget);
    const isInListItem = React.useContext(ListItemContext);

    injector.with('mdc-icon-button', true);
    injector.with('mdc-icon-button--touch', touch);
    injector.withClassName('0', className);
    injector.withClassName('1', c1);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector, undefined, { eventTarget });
      component.init();
      return () => component.destroy();
    });

    return (
      <CompactWrapper enable={compact ?? isInListItem}>
        <button ref={composeRefs(innerRef, ref)} className={injector.toClassName()} {...context} {...props}>
          <div className="mdc-icon-button__ripple" aria-hidden></div>
          {focusRing ? <span className="mdc-icon-button__focus-ring" aria-hidden></span> : undefined}
          <IconContext.Provider value={{ className: "mdc-icon-button__icon" }}>{children}</IconContext.Provider>
          {touch ? <div className="mdc-icon-button__touch" aria-hidden></div> : undefined}
        </button>
      </CompactWrapper>
    );
  }
);
