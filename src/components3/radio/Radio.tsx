import { createComponent } from "../../common/Component";
import { RmcwRadio, RmcwRadioComponent } from "./Component";

export type RadioProps = {
  checked?: boolean,
  //
  form?: never,
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
