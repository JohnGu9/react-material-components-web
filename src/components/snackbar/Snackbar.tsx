import "@material/snackbar/mdc-snackbar.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { ButtonContext } from "../button/Button";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { IconButtonContext } from "../icon-button/IconButton";
import { SnackbarComponent } from "./Component";

export type SnackbarProps = {
  opened?: boolean,
  leading?: boolean,
  stacked?: boolean,
  action?: React.ReactNode,
  onAction?: () => any,
  onDismiss?: () => any,
};

export const Snackbar = createComponent<HTMLElement, SnackbarProps>(
  function Snackbar({
    opened,
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

    injector.with('mdc-snackbar', true);
    injector.with('mdc-snackbar--leading', leading);
    injector.with('mdc-snackbar--stacked', stacked);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new SnackbarComponent(innerRef.current!, injector);
      setComponent(component);
      return () => component.destroy();
    }, [injector]);

    React.useEffect(() => {
      if (component)
        if (opened) component.open();
        else component.close();
    }, [component, opened]);

    return (
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
    );
  }
);
