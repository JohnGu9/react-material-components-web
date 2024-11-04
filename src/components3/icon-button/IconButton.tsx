import { IconButton as MdIconButton } from "@material/web/iconbutton/internal/icon-button";
import { createComponent } from "../../common/Component";
import { MdFilledIconButtonComponent, MdFilledTonalIconButtonComponent, MdIconButtonComponent, MdOutlinedIconButtonComponent } from "./Component";
import { FormSubmitterType } from "@material/web/internal/controller/form-submitter";

export type IconButtonBaseProps = {
  //
  form?: undefined
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  type?: FormSubmitterType,
  value?: string,
};

export type IconButtonProps = IconButtonBaseProps & {
  buttonStyle?: "filled" | "filled-tonal" | "outlined",
};

export const IconButton = createComponent<MdIconButton, IconButtonProps>(
  function IconButton({ buttonStyle, ...props }, ref) {
    switch (buttonStyle) {
      case "filled":
        return <MdFilledIconButtonComponent key={buttonStyle} ref={ref as any} {...props} />
      case "filled-tonal":
        return <MdFilledTonalIconButtonComponent key={buttonStyle} ref={ref as any} {...props} />
      case "outlined":
        return <MdOutlinedIconButtonComponent key={buttonStyle} ref={ref as any} {...props} />
    }
    return <MdIconButtonComponent key={buttonStyle} ref={ref as any} {...props} />
  }
);

export const FilledIconButton = MdFilledIconButtonComponent;
export const TonalIconButton = MdFilledTonalIconButtonComponent;
export const OutlinedIconButton = MdOutlinedIconButtonComponent;

// @TODO: split
export type IconButtonSupportedCssProps = {
  "--md-icon-button-icon-color": string,
  "--md-icon-button-state-layer-shape": string,
  "--md-icon-button-icon-size": string,

  "--md-filled-icon-button-selected-container-color": string,
  "--md-filled-icon-button-container-shape": string,
  "--md-filled-icon-button-container-width": string,
  "--md-filled-icon-button-container-height": string,
  "--md-filled-icon-button-icon-size": string,

  "--md-filled-tonal-icon-button-selected-container-color": string,
  "--md-filled-tonal-icon-button-container-shape": string,
  "--md-filled-tonal-icon-button-container-width": string,
  "--md-filled-tonal-icon-button-container-height": string,
  "--md-filled-tonal-icon-button-icon-size": string,

  "--md-outlined-icon-button-outline-color": string,
  "--md-outlined-icon-button-outline-width": string,
  "--md-outlined-icon-button-container-shape": string,
  "--md-outlined-icon-button-container-width": string,
  "--md-outlined-icon-button-container-height": string,
  "--md-outlined-icon-button-icon-size": string,
};
