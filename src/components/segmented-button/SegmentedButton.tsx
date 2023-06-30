import React from "react";
import { useRefComposer } from "react-ref-composer";
import { classMap, createComponent, isDefined, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { IconContext } from "../icon/Icon";
import { TouchTargetWrapper } from "../touch-target-wrapper/TouchTargetWrapper";
import "./style.scss";

const Context = React.createContext(undefined as unknown as { touch: boolean });

export type SegmentedButtonProps = {
  touch?: boolean,
}
export const SegmentedButton = createComponent<HTMLDivElement, SegmentedButtonProps>(
  function SegmentedButton({ touch = true, className, ...props }, ref) {
    const classes = { 'mdc-segmented-button': true };
    return (
      <Context.Provider value={{ touch }}>
        <div ref={ref}
          className={classMap(classes, className)}
          role="group"
          {...props} />
      </Context.Provider>
    );
  }
);

export type SegmentProps = {
  selected?: boolean,
  icon?: React.ReactNode,
  label?: React.ReactNode,
  touch?: boolean,
  type?: "button" | "submit" | "reset",
};
export const Segment = createComponent<HTMLButtonElement, SegmentProps>(
  function Segment({ touch, ...props }, ref) {
    const context = React.useContext(Context);
    const t = touch ?? context.touch;
    if (t) {
      return <TouchTargetWrapper><SegmentNoWrapper touch={t} {...props} ref={ref} ></SegmentNoWrapper></TouchTargetWrapper>
    } else {
      return <SegmentNoWrapper touch={t} {...props} ref={ref} ></SegmentNoWrapper>
    }
  }
);

const SegmentNoWrapper = createComponent<HTMLButtonElement, SegmentProps>(
  function SegmentNoWrapper({
    selected = false,
    touch = true,
    icon,
    label,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef(null);
    const injector = useClassInjector(innerRef);

    injector.with('mdc-segmented-button__segment', true);
    injector.with('mdc-segmented-button--touch', touch);
    injector.with('mdc-segmented-button__segment--selected', selected);

    React.useEffect(() => {
      const component = new RippleComponent(innerRef.current!, injector);
      component.init();
      return () => component.destroy();
    }, [injector]);

    return (
      <button ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        aria-pressed={selected}
        {...props}>
        <div className="mdc-segmented-button__ripple" aria-hidden></div>
        {touch ? <div className="mdc-segmented-button__touch" aria-hidden></div> : undefined}
        {isDefined(icon)
          ? <IconContext.Provider value={{ className: 'mdc-segmented-button__icon' }}>{icon}</IconContext.Provider>
          : undefined}
        {isDefined(label)
          ? <div className="mdc-segmented-button__label">{label}</div>
          : undefined}
      </button>
    );
  }
);
