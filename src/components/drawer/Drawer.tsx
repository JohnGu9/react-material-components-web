import React from "react";
import { useRefComposer } from "react-ref-composer";
import { classMap, createComponent, isDefined } from "../../common/Common";
import "./style.scss";

export type DrawerProps = {
  open?: boolean,
  type?: 'dismissible' | 'modal',
  content?: React.ReactNode,
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
  onScrimClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => any,
  onEscapeKey?: (evt: KeyboardEvent) => any,
};

export const Drawer = createComponent<HTMLElement, DrawerProps>(
  function Drawer({
    open,
    type = 'dismissible',
    title,
    subtitle,
    content,
    onScrimClick,
    onEscapeKey,
    className,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLElement>(null);
    const [hidden, setHidden] = React.useState(!open);
    const classes = {
      'mdc-drawer': true,
      'mdc-drawer--dismissible': type === 'dismissible',
      'mdc-drawer--modal': type === 'modal',
      'mdc-drawer--open-override': open,
      'mdc-drawer--hidden': hidden && !open,
    };

    React.useEffect(() => {
      const listener = (evt: KeyboardEvent) => {
        const { keyCode, key } = evt;
        if (key === 'Escape' || keyCode === 27) onEscapeKey?.(evt);
      };
      window.addEventListener('keydown', listener, { passive: true });
      return () => window.removeEventListener('keydown', listener);
    }, [onEscapeKey]);

    React.useEffect(() => {
      const current = innerRef.current!;
      if (open) {
        setHidden(false);
      } else {
        const listener = (event: TransitionEvent) => {
          if (event.target === current && event.propertyName === 'transform') {
            setHidden(true);
            current.removeEventListener('transitionend', listener);
          }
        };
        current.addEventListener('transitionend', listener, { passive: true });
        return () => current.removeEventListener('transitionend', listener);
      }
    }, [open]);

    return (<>
      <aside ref={composeRefs(innerRef, ref)}
        className={classMap(classes, className)}
        hidden={hidden && !open}
        {...props}>
        {isDefined(title)
          ? <div className="mdc-drawer__header">
            <h3 className="mdc-drawer__title">{title}</h3>
            {isDefined(subtitle) ? <h6 className="mdc-drawer__subtitle">{subtitle}</h6> : undefined}
          </div> : undefined}
        <div className="mdc-drawer__content">
          {content}
        </div>
      </aside>
      {(() => {
        switch (type) {
          case 'dismissible':
            return (
              <div className="mdc-drawer-app-content">
                {children}
              </div>);
          case 'modal':
            return (<>
              <div className="mdc-drawer-scrim" onClick={onScrimClick}></div>
              {children}
            </>);
        }
      })()}
    </>);
  }
);
