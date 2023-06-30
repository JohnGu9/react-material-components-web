import "@material/tooltip/styles.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { ButtonContext } from "../button/Button";
import { classMap, createComponent, isDefined } from "../common/Common";
import { TooltipComponent } from "./Component";

export type TooltipProps = {
  label?: React.ReactNode,
};

export const Tooltip = createComponent<HTMLDivElement, TooltipProps>(
  function Tooltip({
    label,
    children,
    ...props
  }, ref) {
    const composeRefs = useRefComposer();
    const tooltip = React.useRef<HTMLDivElement>(null);
    const anchor = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const component = new TooltipComponent(tooltip.current!, anchor.current!);
      return () => component.destroy();
    }, []);

    return (
      <div ref={composeRefs(anchor, ref)} {...props}>
        {children}
        <div ref={tooltip} className="mdc-tooltip" role="tooltip" aria-hidden="true">
          <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
            <span className="mdc-tooltip__label">{label}</span>
          </div>
        </div>
      </div>
    );
  }
);

export type RichTooltipProps = {
  title?: React.ReactNode,
  content?: React.ReactNode,
  actions?: React.ReactNode,
};

export const RichTooltip = createComponent<HTMLDivElement, RichTooltipProps>(
  function Tooltip({
    title,
    content,
    actions,
    className,
    children,
    ...props
  }, ref) {
    const tooltip = React.useRef<HTMLDivElement>(null);
    const anchor = React.useRef<HTMLDivElement>(null);
    const composeRefs = useRefComposer();
    React.useEffect(() => {
      const component = new TooltipComponent(tooltip.current!, anchor.current!);
      return () => component.destroy();
    }, []);
    const classes = { 'mdc-tooltip-wrapper--rich': true };
    return (
      <div ref={composeRefs(anchor, ref)}
        className={classMap(classes, className)}
        {...props}>
        {children}
        <div ref={tooltip} className="mdc-tooltip mdc-tooltip--rich" aria-hidden="true" role="dialog">
          <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
            {isDefined(title) ? <h2 className="mdc-tooltip__title">{title}</h2> : undefined}
            {isDefined(content) ? <p className="mdc-tooltip__content">{content}</p> : undefined}
            {isDefined(actions)
              ? <div className="mdc-tooltip--rich-actions">
                <ButtonContext.Provider value={{ className: 'mdc-tooltip--rich-action' }}>
                  {actions}
                </ButtonContext.Provider>
              </div>
              : undefined}
          </div>
        </div>
      </div>
    );
  }
);

export const RichTooltipLink = createComponent<HTMLAnchorElement, {}>(
  function RichTooltipLink({ href, className, children, ...props }, ref) {
    const classes = { 'mdc-tooltip__content-link': true };
    return <a ref={ref} className={classMap(classes, className)} href={href} {...props}>{children}</a>;
  }
);
