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
