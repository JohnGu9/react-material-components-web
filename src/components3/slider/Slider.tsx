import { createComponent } from "../../common/Component";
import { RmcwSlider, RmcwSliderComponent } from "./Component";
import React from "react";
import { createSyntheticEvent } from "../../common/CreateSyntheticEvent";

// Material Design 3 `Slider` is no longer block value change by user input like before.
// It just perform like native React input element.
// And value change behavior can`t be blocked useless disable it.
// Just like `TextField`.

export type SliderProps = {
  min?: number,
  max?: number,
  step?: number,
  ticks?: boolean,
  labeled?: boolean,
  onChange?: React.ChangeEventHandler<RmcwSlider>,
  //
  form?: never;
} & ({ value?: number, valueStart?: never; } | { valueStart?: number, valueEnd?: number, value?: never; });

export const Slider = createComponent<RmcwSlider, SliderProps>(
  function Slider({ onChange, ...props }, ref) {
    const mergeOnChange = React.useMemo(() => {
      return (e: Event) => onChange?.(createSyntheticEvent(e) as React.ChangeEvent<RmcwSlider>);
    }, [onChange]);
    const range = typeof props.valueStart === "number";
    return <RmcwSliderComponent ref={ref} range={range} onChange={mergeOnChange} {...props} />;
  }
);

export type SliderSupportedCssProps = {
  "--md-slider-active-track-color": string,
  "--md-slider-active-track-shape": string,
  "--md-slider-inactive-track-color": string,
  "--md-slider-inactive-track-shape": string,
  "--md-slider-handle-color": string,
  "--md-slider-handle-shape": string,
};
