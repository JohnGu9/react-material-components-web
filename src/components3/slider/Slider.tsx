import { MdSlider } from "@material/web/slider/slider";
import { createComponent } from "../../common/Component";
import { MdSliderComponent } from "./Component";

// Material Design 3 `Slider` is no longer block value change by user input like before.
// It just perform like native React input element.
// And value change behavior can`t be blocked useless disable it.
// Just like `TextField`.

export type SliderProps = {
  value?: number | { start: number, end: number },
  min?: number,
  max?: number,
  step?: number,
  ticks?: boolean,
  labeled?: boolean,
  onChange?: ((e: Event) => void),
  //
  form?: never
};

export const Slider = createComponent<MdSlider, SliderProps>(
  function Slider({ value, ...props }, ref) {
    if (typeof value === 'object' && "start" in value && "end" in value) {
      return <MdSliderComponent ref={ref as any} range
        ariaValueTextStart={value.start.toString()}
        valueLabelStart={value.start.toString()}
        valueStart={value.start as number}
        ariaValueTextEnd={value.end.toString()}
        valueLabelEnd={value.end.toString()}
        valueEnd={value.end as number}
        {...props} />;
    } else if (typeof value === 'number') {
      return <MdSliderComponent ref={ref as any}
        ariaValueTextEnd={value.toString()}
        valueLabelEnd={value.toString()}
        valueLabel={value.toString()}
        value={value}
        {...props} />;
    }
    return <MdSliderComponent ref={ref as any} {...props} />;
  }
);

// Helper Function
//
// get value from element
// example:
// ```jsx
// const [value, setValue] = React.useState(50);
// return <Slider value={value}
//   onChange={e => {
//     setValue(getSliderValue(e.target as MdSlider));
//   }}
//   onInput={e => {
//     setValue(getSliderValue(e.target as MdSlider));
//   }} />
// ```
export function getSliderValue(element: MdSlider) {
  return element.value as number;
}

export function getSliderRange(element: MdSlider) {
  const start = element.valueStart as number;
  const end = element.valueEnd as number;
  return { start, end };
}

export type SliderSupportedCssProps = {
  "--md-slider-active-track-color": string,
  "--md-slider-active-track-shape": string,
  "--md-slider-inactive-track-color": string,
  "--md-slider-inactive-track-shape": string,
  "--md-slider-handle-color": string,
  "--md-slider-handle-shape": string,
};
