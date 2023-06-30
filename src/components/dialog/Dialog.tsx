import "@material/dialog/mdc-dialog.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { useUuidV4 } from "../common/Uuid";
import { DialogComponent, State } from "./Component";

export type DialogProps = {
  opened?: boolean,
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
    opened,
    title,
    header,
    actions,
    fullscreen = false,
    noContentPadding,
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
    state.onScrimClick = onScrimClick; state.onEscapeKey = onEscapeKey;

    injector.with('mdc-dialog', true);
    injector.with('mdc-dialog--fullscreen', fullscreen);
    injector.with('mdc-dialog--no-content-padding', fullscreen);
    injector.with('mdc-dialog--stacked', stacked);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new DialogComponent(innerRef.current!, state, injector);
      setComponent(component);
      return () => component.destroy();
    }, [state, fullscreen, injector]);

    React.useEffect(() => {
      if (component)
        if (opened) component.open();
        else component.close();
    }, [component, opened]);

    return (
      <div ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        {...props}>
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleUuid}
            aria-describedby={bodyUuid}
            aria-hidden={!opened}>
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
    );
  }
);
