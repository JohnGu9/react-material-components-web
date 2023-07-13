import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { useUuidV4 } from "../common/Uuid";
import { DialogComponent, State } from "./Component";
import { RippleEventTarget } from "../ripple/Ripple";
import { MDCDialogFoundation } from "@material/dialog";

export type DialogProps = {
  open?: boolean,
  title?: React.ReactNode,
  header?: React.ReactNode,
  actions?: React.ReactNode,
  fullscreen?: boolean,
  noContentPadding?: boolean,
  stacked?: boolean,
  onScrimClick?: (evt: MouseEvent) => any,
  onEscapeKey?: (evt: KeyboardEvent) => any,
};

export const Dialog = createComponent<HTMLDivElement, DialogProps>(
  function Dialog({
    open,
    title,
    header,
    actions,
    fullscreen = false,
    noContentPadding = false,
    stacked = false,
    onScrimClick,
    onEscapeKey,
    className,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);
    const titleUuid = useUuidV4();
    const bodyUuid = useUuidV4();
    const [component, setComponent] = React.useState<DialogComponent>();
    const state = React.useMemo<State>(() => { return {}; }, []);
    const eventTarget = React.useMemo(() => new EventTarget(), []);
    state.onScrimClick = onScrimClick; state.onEscapeKey = onEscapeKey;

    injector.with('mdc-dialog', true);
    injector.with('mdc-dialog--fullscreen', fullscreen);
    injector.with('mdc-dialog--no-content-padding', noContentPadding);
    injector.with('mdc-dialog--stacked', stacked);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new DialogComponent(innerRef.current!, state, injector);
      const listener = () => {
        eventTarget.dispatchEvent(new Event('resize'));
      };
      component.listen(MDCDialogFoundation.strings.OPENED_EVENT, listener);
      setComponent(component);
      return () => {
        component.unlisten(MDCDialogFoundation.strings.OPENED_EVENT, listener);
        component.destroy();
      }
    }, [state, fullscreen, injector, eventTarget]);

    React.useEffect(() => {
      if (component)
        if (open) component.open();
        else component.close();
    }, [component, open]);

    return (
      <RippleEventTarget.Provider value={eventTarget}>
        <div ref={composeRefs(innerRef, ref)}
          className={injector.toClassName()}
          aria-hidden={!open}
          {...props}>
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleUuid}
              aria-describedby={bodyUuid}>
              {isDefined(title) || isDefined(header)
                ? <div className="mdc-dialog__header">
                  {isDefined(title)
                    ? <h2 className="mdc-dialog__title" id={titleUuid}>
                      {title}
                    </h2>
                    : undefined}
                  {header}
                </div>
                : undefined}
              {isDefined(children)
                ? <div className="mdc-dialog__content" id={bodyUuid}>
                  {children}
                </div>
                : undefined}
              {isDefined(actions)
                ? <div className="mdc-dialog__actions">
                  {actions}
                </div>
                : undefined}
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>
      </RippleEventTarget.Provider>
    );
  }
);
