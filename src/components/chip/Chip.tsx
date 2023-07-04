import { AnimatedSize } from "animated-size";
import React from "react";
import { classMap, createComponent, isDefined, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { IconContext } from "../icon/Icon";
import styles from "./style.module.scss";
import "./style.scss";
import { RippleEventTarget } from "../ripple/Ripple";

export const ChipSet = createComponent<HTMLSpanElement, { overflow?: boolean }>(
  function ChipSet({ overflow = false, children, className, ...props }, ref) {
    const classes = {
      'mdc-evolution-chip-set': true,
      'mdc-evolution-chip-set--overflow': overflow,
    };

    return (
      <span ref={ref}
        className={classMap(classes, className)} role="grid" {...props}>
        <span className="mdc-evolution-chip-set__chips" role="presentation">
          {children}
        </span>
      </span>
    );
  }
);

export type ChipProps = {
  graphic?: React.ReactNode,
  trailing?: React.ReactNode,
  selected?: boolean,
  disabled?: boolean,
  exited?: boolean,
  focusRing?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  onTrailingClick?: React.MouseEventHandler<HTMLButtonElement>,
};

export const Chip = createComponent<HTMLSpanElement, ChipProps>(
  function Chip({
    graphic,
    trailing,
    selected = false,
    disabled = false,
    exited = false,
    focusRing = true,
    onClick,
    onTrailingClick,
    className,
    children,
    ...props
  }, ref) {
    const classes = {
      'mdc-evolution-chip': true,
      'mdc-evolution-chip--selectable': true,
      'mdc-evolution-chip--selected': selected,
      'mdc-evolution-chip--selecting': selected,
      'mdc-evolution-chip--deselecting': !selected,
      [styles['mdc-evolution-chip--enter-override']]: !exited,
      [styles['mdc-evolution-chip--exit-override']]: exited,
      'mdc-evolution-chip--disabled': disabled,
      'mdc-evolution-chip--with-primary-graphic': selected || isDefined(graphic),
      'mdc-evolution-chip--with-primary-icon': isDefined(graphic),
      'mdc-evolution-chip--selecting-with-primary-icon': isDefined(graphic) && selected,
      'mdc-evolution-chip--deselecting-with-primary-icon': isDefined(graphic) && !selected,
      'mdc-evolution-chip--with-trailing-action': isDefined(trailing),
    };
    return (
      <AnimatedSize widthFactor={exited ? { size: 0, delay: 75 } : {}} duration={150}>
        <span ref={ref}
          className={classMap(classes, className)}
          role="row"
          {...props}>
          <PrimaryCell selected={selected} graphic={graphic} onClick={onClick} disabled={disabled}>{children}</PrimaryCell>
          {isDefined(trailing) ? <TrailingCell trailing={trailing} onClick={onTrailingClick} disabled={disabled} /> : undefined}
          {focusRing ? <span className="mdc-evolution-chip__focus-ring" aria-hidden></span> : undefined}
        </span>
      </AnimatedSize>
    );
  }
);

function PrimaryCell({ disabled, graphic, children, onClick }: {
  disabled?: boolean,
  selected?: boolean,
  graphic?: React.ReactNode,
  touch?: boolean,
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const injector = useClassInjector(ref);
  const eventTarget = React.useContext(RippleEventTarget);
  injector.with('mdc-evolution-chip__action', true);
  injector.with('mdc-evolution-chip__action--primary', true);

  React.useEffect(() => {
    const component = new RippleComponent(ref.current!, injector, eventTarget);
    component.init();
    return () => component.destroy();
  }, [eventTarget, injector]);

  return (
    <span className="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
      <button ref={ref}
        className={injector.toClassName()}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}>
        <span className="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
        <span className="mdc-evolution-chip__graphic">
          <IconContext.Provider value={{ className: 'mdc-evolution-chip__icon mdc-evolution-chip__icon--primary' }}>
            {graphic}
          </IconContext.Provider>
          <span className="mdc-evolution-chip__checkmark">
            <svg className="mdc-evolution-chip__checkmark-svg" viewBox="-2 -3 30 30">
              <path className="mdc-evolution-chip__checkmark-path"
                fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
            </svg>
          </span>
        </span>
        <span className="mdc-evolution-chip__text-label">{children}</span>
      </button>
    </span>
  );
}

function TrailingCell({ disabled, trailing, onClick }: {
  disabled?: boolean,
  trailing?: React.ReactNode,
  touch?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const injector = useClassInjector(ref);
  const eventTarget = React.useContext(RippleEventTarget);
  injector.with('mdc-evolution-chip__action', true);
  injector.with('mdc-evolution-chip__action--trailing', true);

  React.useEffect(() => {
    const component = new RippleComponent(ref.current!, injector, eventTarget);
    component.init();
    return () => component.destroy();
  }, [eventTarget, injector]);

  return (
    <span className="mdc-evolution-chip__cell mdc-evolution-chip__cell--trailing" role="gridcell">
      <button ref={ref}
        className={injector.toClassName()}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-disabled={disabled}>
        <span className="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--trailing"></span>
        <IconContext.Provider value={{ className: 'mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing' }}>
          {trailing}
        </IconContext.Provider>
      </button>
    </span>
  );
}
