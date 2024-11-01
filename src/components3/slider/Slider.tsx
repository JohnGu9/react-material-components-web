import { MdSlider } from "@material/web/slider/slider";
import { createComponent } from "../../components/common/Component";
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
  valueLabel?: string,
  valueLabelStart?: string,
  valueLabelEnd?: string,
  ariaLabelStart?: string,
  ariaValueTextStart?: string,
  ariaLabelEnd?: string,
  ariaValueTextEnd?: string,
  onChange?: ((e: Event) => void),
  onInput?: ((e: Event) => void),
  //
  form?: undefined
};

export const Slider = createComponent<MdSlider, SliderProps>(
  function Slider({ value, ...props }, ref) {
    if (typeof value === 'object' && "start" in value && "end" in value) {
      return <MdSliderComponent ref={ref as any} range valueStart={value.start as number} valueEnd={value.end as number} {...props} />;
    }
    return <MdSliderComponent ref={ref as any} value={value as number} {...props} />;
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
