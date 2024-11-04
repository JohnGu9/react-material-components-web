import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../../common/Common";
import { animationDimensionPercentages as percents } from '@material/linear-progress/constants';

// css transition
export type Transition = {
  duration: string,
  delay?: string,
  easingFunction?: string,
}
export type LinearProgressProps = {
  closed?: boolean,
  progress?: number,
  buffer?: number,
  progressTransition?: Transition,
  bufferTransition?: Transition,
};

export const LinearProgress = createComponent<HTMLDivElement, LinearProgressProps>(
  function LinearProgress({
    closed = false,
    progress,
    buffer = 1,
    progressTransition,
    bufferTransition,
    className,
    style,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);
    const [width, setWidth] = React.useState(0);
    const [animationOff, setAnimationOff] = React.useState(closed);
    const off = closed && animationOff;
    const s = off ? {} : calculateAndSetDimensions(width);

    injector.with('mdc-linear-progress', true);
    injector.with('mdc-linear-progress--indeterminate', progress === undefined);
    injector.with('mdc-linear-progress--closed', closed);
    injector.with('mdc-linear-progress--closed-animation-off', off);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const current = innerRef.current!;
      const update = () => setWidth(current.offsetWidth);
      const observer = new ResizeObserver(update);
      observer.observe(current);
      update();
      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      const current = innerRef.current!;
      if (closed) {
        const listener = (event: TransitionEvent) => {
          const { target, propertyName } = event;
          if (target === current && propertyName === 'opacity') {
            setAnimationOff(true);
            current.removeEventListener('transitionend', listener);
          }
        }
        current.addEventListener('transitionend', listener, { passive: true });
        return () => current.removeEventListener('transitionend', listener);
      } else {
        setAnimationOff(false);
      }
    }, [closed]);

    React.useEffect(() => {
      if (width !== 0) {
        innerRef.current?.getBoundingClientRect();
        injector.add('mdc-linear-progress--animation-ready');
        return () => injector.remove('mdc-linear-progress--animation-ready');
      }
    }, [injector, width]);

    return (
      <div ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        role="progressbar"
        aria-valuemin={progress === undefined ? undefined : 0}
        aria-valuemax={progress === undefined ? undefined : 1}
        aria-valuenow={progress}
        aria-hidden={closed}
        style={{ ...style, ...s }}
        {...props}>
        <div className="mdc-linear-progress__buffer" aria-hidden>
          <div className="mdc-linear-progress__buffer-bar"
            style={{
              flexBasis: `${buffer * 100}%`,
              transition: transitionToProperty('flex-basis', bufferTransition),
            }}></div>
          <div className="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          style={{
            transform: `scaleX(${progress ?? 1})`,
            transition: transitionToProperty('transform', progressTransition),
          }} aria-hidden>
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar" aria-hidden>
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    );
  }
);

function calculateAndSetDimensions(width: number) {
  const primaryHalf = width * percents.PRIMARY_HALF;
  const primaryFull = width * percents.PRIMARY_FULL;
  const secondaryQuarter = width * percents.SECONDARY_QUARTER;
  const secondaryHalf = width * percents.SECONDARY_HALF;
  const secondaryFull = width * percents.SECONDARY_FULL;

  return {
    '--mdc-linear-progress-primary-half': `${primaryHalf}px`,
    '--mdc-linear-progress-primary-half-neg': `${- primaryHalf}px`,
    '--mdc-linear-progress-primary-full': `${primaryFull}px`,
    '--mdc-linear-progress-primary-full-neg': `${- primaryFull}px`,
    '--mdc-linear-progress-secondary-quarter': `${secondaryQuarter}px`,
    '--mdc-linear-progress-secondary-quarter-neg': `${- secondaryQuarter}px`,
    '--mdc-linear-progress-secondary-half': `${secondaryHalf}px`,
    '--mdc-linear-progress-secondary-half-neg': `${- secondaryHalf}px`,
    '--mdc-linear-progress-secondary-full': `${secondaryFull}px`,
    '--mdc-linear-progress-secondary-full-neg': `${- secondaryFull}px`,
  } as React.CSSProperties;
}

function transitionToProperty(property: string, transition?: Transition) {
  if (transition === undefined) return;
  const { duration, delay, easingFunction } = transition;
  const delayString = delay === undefined ? '' : ` ${delay}`;
  const easingFunctionString = easingFunction === undefined ? '' : ` ${easingFunction}`;
  return `${property} ${duration}${delayString}${easingFunctionString}`;
}
