import "@material/card/mdc-card.scss";
import React from "react";
import { ButtonContext } from "../button/Button";
import { classMap, createComponent, isDefined, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { IconButtonContext } from "../icon-button/IconButton";

export type CardProps = {
  outlined?: boolean,
  primaryAction?: React.ReactNode,
  actionButtons?: React.ReactNode,
  actionIcons?: React.ReactNode,
};

export const Card = createComponent<HTMLDivElement, CardProps>(
  function Card({
    outlined,
    primaryAction,
    actionButtons,
    actionIcons,
    className,
    children,
    ...props }, ref) {
    const classes = {
      'mdc-card': true,
      'mdc-card--outlined': outlined,
    };
    return (
      <div ref={ref} className={classMap(classes, className)} {...props}>
        {isDefined(primaryAction)
          ? <PrimaryAction>
            {primaryAction}
          </PrimaryAction>
          : undefined}
        {children}
        {isDefined(actionButtons) || isDefined(actionIcons)
          ? <div className="mdc-card__actions">
            {isDefined(actionButtons)
              ? <div className="mdc-card__action-buttons">
                <ButtonContext.Provider value={{ className: 'mdc-card__action mdc-card__action--button' }}>
                  {actionButtons}
                </ButtonContext.Provider>
              </div>
              : undefined}
            {isDefined(actionIcons)
              ? <div className="mdc-card__action-icons">
                <IconButtonContext.Provider value={{ className: 'mdc-card__action mdc-card__action--icon' }}>
                  {actionIcons}
                </IconButtonContext.Provider>
              </div>
              : undefined}
          </div>
          : undefined}
      </div>
    );
  }
);

function PrimaryAction({ children }: { children?: React.ReactNode }) {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const injector = useClassInjector(innerRef);
  injector.with('mdc-card__primary-action', true);

  React.useEffect(() => {
    const component = new RippleComponent(innerRef.current!, injector);
    component.init();
    return () => component.destroy();
  }, [injector]);

  return (
    <div ref={innerRef} className={injector.toClassName()}>
      {children}
      <div className="mdc-card__ripple"></div>
    </div>
  );
}

export type CardMediaProps = {
  aspectRatio?: 'square' | '16-9'
};

export const CardMedia = createComponent<HTMLDivElement, CardMediaProps>(
  function CardMedia({
    aspectRatio,
    children,
    className,
    ...props }, ref) {
    const classes = {
      'mdc-card__media': true,
      'mdc-card__media--square': aspectRatio === 'square',
      'mdc-card__media--16-9': aspectRatio === '16-9',
    };
    return (
      <div ref={ref} className={classMap(classes, className)} {...props}>
        {isDefined(children)
          ? <div className="mdc-card__media-content">{children}</div>
          : undefined}
      </div>
    );
  }
);
