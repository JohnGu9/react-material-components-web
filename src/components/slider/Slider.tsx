import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { clamp, createComponent, useClassInjector } from "../common/Common";

export type SliderProps = {
  min?: number,
  max?: number,
  value?: number,
  step?: number,
  indicator?: ((value: number) => React.ReactNode),
  tickMarks?: boolean,
  disabled?: boolean,
  onChange?: (value: number) => any,
  onChangeStart?: (value: number) => any,
  onChangeEnd?: (value: number) => any,
  onChangeCancel?: () => any,
};

export const Slider = createComponent<HTMLDivElement, SliderProps>(
  function Slider({
    min = 0,
    max = 100,
    value = min,
    step,
    indicator,
    tickMarks,
    disabled = false,
    onChange,
    onChangeStart,
    onChangeEnd,
    onChangeCancel,
    className,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const [onMouse, setOnMouse] = React.useState(false);
    const [onTouch, setOnTouch] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const injector = useClassInjector(innerRef);

    const discrete = step !== undefined;
    if (discrete) value = Math.round(value / step) * step;
    value = clamp(value, min, max);
    const percent = (value - min) / (max - min);
    injector.with('mdc-slider', true);
    injector.with('mdc-slider--discrete', discrete !== false);
    injector.with('mdc-slider--disabled', disabled);
    injector.withClassName('0', className);

    React.useEffect(() => {
      if (onMouse) {
        const element = innerRef.current!;
        const onMove = (event: MouseEvent) => {
          onChange?.(mouseEventToValue(event, element, min, max))
        };
        const onUp = (event: MouseEvent) => {
          setOnMouse(false);
          onChangeEnd?.(mouseEventToValue(event, element, min, max));
          inputRef.current?.blur();
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseup', onUp, { once: true, passive: true });
        return () => {
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
        };
      }
    }, [max, min, onChange, onChangeEnd, onMouse]);

    React.useEffect(() => {
      if (onTouch) {
        const element = innerRef.current!;
        const onMove = (event: TouchEvent) => {
          onChange?.(touchEventToValue(event, element, min, max));
        }
        const onUp = (event: TouchEvent) => {
          setOnTouch(false);
          onChangeEnd?.(touchEventToValue(event, element, min, max));
          inputRef.current?.blur();
        }
        const onCancel = (_: TouchEvent) => {
          setOnTouch(false);
          onChangeCancel?.();
          inputRef.current?.blur();
        }
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onUp, { once: true, passive: true });
        window.addEventListener('touchcancel', onCancel, { once: true, passive: true });
        return () => {
          window.removeEventListener('touchmove', onMove);
          window.removeEventListener('touchend', onUp);
          window.removeEventListener('touchcancel', onCancel);
        };
      }
    }, [max, min, onChange, onChangeCancel, onChangeEnd, onTouch]);

    return (
      <div ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        aria-disabled={disabled}
        onMouseDown={event => {
          if (onTouch) return;
          inputRef.current?.focus();
          setOnMouse(true);
          onChangeStart?.(mouseEventToValue(event, innerRef.current!, min, max));
        }}
        onTouchStart={event => {
          if (onMouse) return;
          inputRef.current?.focus();
          setOnTouch(true);
          onChangeStart?.(touchEventToValue(event, innerRef.current!, min, max));
        }}
        {...props}>
        <input ref={inputRef}
          className="mdc-slider__input"
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          disabled={disabled}
          readOnly />
        <div className="mdc-slider__track">
          <div className="mdc-slider__track--inactive" aria-hidden></div>
          <div className="mdc-slider__track--active" aria-hidden>
            <div className="mdc-slider__track--active_fill" aria-hidden
              style={{ transform: `scaleX(${percent * 100}%)` }}></div>
          </div>
          {discrete && tickMarks
            ? <div className="mdc-slider__tick-marks" aria-hidden>
              <div className="mdc-slider__tick-mark--active" aria-hidden></div>
              {Array(Math.floor((max - min) / step))
                .fill(0)
                .map((_, index) => {
                  const standardFor = index * step;
                  return <div key={index} className={standardFor < value
                    ? 'mdc-slider__tick-mark--active'
                    : 'mdc-slider__tick-mark--inactive'} />;
                })}
            </div>
            : undefined}
        </div>
        <div ref={thumbRef} className='mdc-slider__thumb'
          style={{ left: `${percent * 100}%` }}>
          {discrete
            ? <div className="mdc-slider__value-indicator-container" aria-hidden>
              <div className="mdc-slider__value-indicator" aria-hidden>
                <span className="mdc-slider__value-indicator-text">
                  {(() => {
                    if (indicator === undefined) {
                      return value;
                    } else {
                      return indicator(value);
                    }
                  })()}
                </span>
              </div>
            </div>
            : undefined}
          <div className="mdc-slider__thumb-knob" aria-hidden></div>
        </div>
      </div>
    );
  }
);

function mouseEventToValue(event: { clientX: number }, slide: HTMLElement, min: number, max: number) {
  const mousePosition = event.clientX;
  const rect = slide.getBoundingClientRect();
  const d = mousePosition - rect.x;
  const percentage = d / rect.width;
  return clamp(min + percentage * (max - min), min, max);
}

function touchEventToValue(event: { targetTouches: TouchList | React.TouchList }, slide: HTMLElement, min: number, max: number) {
  const mousePosition = event.targetTouches[0].clientX;
  const rect = slide.getBoundingClientRect();
  const d = mousePosition - rect.x;
  const percentage = d / rect.width;
  return clamp(min + percentage * (max - min), min, max);
}
