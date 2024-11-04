import "@material/ripple/mdc-ripple.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../../common/Common";
import { RippleComponent } from "./Component";

export const RippleEventTarget = React.createContext(new EventTarget());

export type RippleProps = {
  color?: 'primary' | 'accent' | string,
  unbounded?: boolean,
  activated?: boolean,
};

export const Ripple = createComponent<HTMLDivElement, RippleProps>(
  function Ripple({ color, unbounded = false, activated, className, style, ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);
    const [component, setComponent] = React.useState<RippleComponent>();
    const eventTarget = React.useContext(RippleEventTarget);

    injector.with('mdc-ripple-surface', true);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new RippleComponent(
        innerRef.current!,
        injector,
        undefined,
        unbounded ? { eventTarget } : undefined);
      component.init();
      setComponent(component);
      return () => component.destroy();
    }, [eventTarget, injector, unbounded]);

    React.useEffect(() => {
      if (component) {
        if (activated) component.activate();
        else component.deactivate();
      }
    }, [activated, component]);

    const rippleColor = (function () {
      switch (color) {
        case 'primary': return 'var(--mdc-theme-primary, #6200ee)';
        case 'accent': return 'var(--mdc-theme-secondary, #018786)';
        case undefined: return undefined;
        default: return color;
      }
    })();

    return (
      <div ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        style={{ '--mdc-ripple-color': rippleColor, ...style } as React.CSSProperties}
        {...props} />
    );
  }
);
