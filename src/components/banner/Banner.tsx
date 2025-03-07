import React from "react";
import { useRefComposer } from "react-ref-composer";
import { ButtonContext } from "../button/Button";
import { classMap, createComponent, isDefined, useSizeObserver } from "../../common/Common";
import { IconContext } from "../icon/Icon";
import "./style.scss";

export type BannerProps = {
  open?: boolean,
  graphic?: React.ReactNode,
  primaryAction?: React.ReactNode,
  secondaryAction?: React.ReactNode,
  centered?: boolean,
  mobileStacked?: boolean,
};

export const Banner = createComponent<HTMLDivElement, BannerProps>(
  function Banner({
    open = false,
    graphic,
    primaryAction,
    secondaryAction,
    centered = false,
    mobileStacked = true,
    className,
    style,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [content, setContent] = React.useState<HTMLDivElement | null>(null);
    const [hidden, setHidden] = React.useState(open);
    const size = useSizeObserver(content);

    const height = hidden && !open
      ? undefined
      : open ? (size.height ?? 0) : 0;

    const classes = {
      'mdc-banner': true,
      'mdc-banner--open': open,
      'mdc-banner--closing': !hidden && !open,
      'mdc-banner--centered': centered,
      'mdc-banner--mobile-stacked': mobileStacked,
    }

    React.useEffect(() => {
      if (open) {
        setHidden(false);
      } else {
        const current = innerRef.current!;
        const listener = (event: TransitionEvent) => {
          if (event.target === innerRef.current && event.propertyName === 'height') {
            setHidden(true);
            current.removeEventListener('transitionend', listener);
          }
        }
        current.addEventListener('transitionend', listener, { passive: true });
        return () => current.removeEventListener('transitionend', listener);
      }
    }, [open]);


    return (
      <div
        ref={composeRefs(innerRef, ref)}
        className={classMap(classes, className)}
        style={{ height, ...style }}
        aria-hidden={!open}
        role="banner"
        {...props}>
        <div ref={setContent} className="mdc-banner__content" role="alertdialog" aria-live="assertive">
          <div className="mdc-banner__graphic-text-wrapper">
            {isDefined(graphic)
              ? <div className="mdc-banner__graphic" role="img">
                <IconContext.Provider value={{ className: 'mdc-banner__icon' }}>
                  {graphic}
                </IconContext.Provider>
              </div>
              : undefined}
            {isDefined(children)
              ? <div className="mdc-banner__text">
                {children}
              </div>
              : undefined}
          </div>
          <div className="mdc-banner__actions">
            {isDefined(secondaryAction)
              ? <ButtonContext.Provider value={{ className: 'mdc-banner__secondary-action' }}>
                {secondaryAction}
              </ButtonContext.Provider>
              : undefined}
            {isDefined(primaryAction)
              ? <ButtonContext.Provider value={{ className: 'mdc-banner__primary-action' }}>
                {primaryAction}
              </ButtonContext.Provider>
              : undefined}
          </div>
        </div>
      </div>
    );
  }
);
