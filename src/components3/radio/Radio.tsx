import { createComponent } from "../../components/common/Component";
import { RmcwRadio, RmcwRadioComponent } from "./Component";

export type RadioProps = {
  checked?: boolean,
  //
  form?: undefined,
  value?: string,
};

export const Radio = createComponent<RmcwRadio, RadioProps>(
  function Radio(props, ref) {
    return <RmcwRadioComponent ref={ref as any} {...props} />;
  }
);

export type RadioSupportedCssProps = {
  "--md-radio-icon-color": string,
  "--md-radio-selected-icon-color": string,
  "--md-radio-icon-size": string,
};
