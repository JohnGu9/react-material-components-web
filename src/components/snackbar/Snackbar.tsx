import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { ButtonContext } from "../button/Button";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { IconButtonContext } from "../icon-button/IconButton";
import { SnackbarComponent, strings } from "./Component";
import { RippleEventTarget } from "../ripple/Ripple";

export type SnackbarProps = {
  open?: boolean,
  leading?: boolean,
  stacked?: boolean,
  action?: React.ReactNode,
  onAction?: () => any,
  onDismiss?: () => any,
};

export const Snackbar = createComponent<HTMLElement, SnackbarProps>(
  function Snackbar({
    open,
    leading = false,
    stacked = false,
    action,
    onAction,
    onDismiss,
    className,
    children,
    ...props
  }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLElement>(null);
    const injector = useClassInjector(innerRef);
    const [component, setComponent] = React.useState<SnackbarComponent>();
    const eventTarget = React.useMemo(() => new EventTarget(), []);

    injector.with('mdc-snackbar', true);
    injector.with('mdc-snackbar--leading', leading);
    injector.with('mdc-snackbar--stacked', stacked);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new SnackbarComponent(innerRef.current!, injector);
      const listener = () => {
        eventTarget.dispatchEvent(new Event('resize'));
      };
      component.listen(strings.OPENED_EVENT, listener);
      setComponent(component);
      return () => {
        component.unlisten(strings.OPENED_EVENT, listener);
        component.destroy();
      }
    }, [eventTarget, injector]);

    React.useEffect(() => {
      if (component)
        if (open) component.open();
        else component.close();
    }, [component, open]);

    return (
      <RippleEventTarget.Provider value={eventTarget}>
        <aside ref={composeRefs(innerRef, ref)} className={injector.toClassName()} {...props}>
          <div className="mdc-snackbar__surface" role="status" aria-relevant="additions"
            onKeyDown={evt => {
              const isEscapeKey = evt.key === 'Escape' || evt.keyCode === 27;
              if (isEscapeKey) onDismiss?.();
            }}>
            <div className="mdc-snackbar__label" aria-atomic="false">
              {children}
            </div>
            {isDefined(action)
              ? <div className="mdc-snackbar__actions" aria-atomic="true">
                <ButtonContext.Provider value={{
                  className: 'mdc-snackbar__action',
                  onClick: evt => onAction?.(),
                }}>
                  <IconButtonContext.Provider value={{
                    className: 'mdc-snackbar__action',
                    onClick: evt => onDismiss?.(),
                  }}>
                    {action}
                  </IconButtonContext.Provider>
                </ButtonContext.Provider>
              </div>
              : undefined}
          </div>
        </aside>
      </RippleEventTarget.Provider>
    );
  }
);
