import { IconButton as MdIconButton } from "@material/web/iconbutton/internal/icon-button";
import { createComponent } from "../../common/Component";
import { MdFilledIconButtonComponent, MdFilledTonalIconButtonComponent, MdIconButtonComponent, MdOutlinedIconButtonComponent } from "./Component";
import { FormSubmitterType } from "@material/web/internal/controller/form-submitter";
import { MdFilledIconButton } from "@material/web/iconbutton/filled-icon-button";
import { MdFilledTonalIconButton } from "@material/web/iconbutton/filled-tonal-icon-button";
import { MdOutlinedIconButton } from "@material/web/iconbutton/outlined-icon-button";
import { MdIconButton as MdIconButtonType } from "@material/web/iconbutton/icon-button";

// Material Design IconButton provide icon toggle when Button was clicked.
// But in React, you can just replace icon element by yourself. (This function is useless for React)
// So in rmcw the icon toggle function is disabled implicitly.

export type IconButtonBaseProps = {
  //
  form?: never;
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
        return <MdFilledIconButtonComponent key={buttonStyle} ref={ref as React.Ref<MdFilledIconButton>} {...props} />;
      case "filled-tonal":
        return <MdFilledTonalIconButtonComponent key={buttonStyle} ref={ref as React.Ref<MdFilledTonalIconButton>} {...props} />;
      case "outlined":
        return <MdOutlinedIconButtonComponent key={buttonStyle} ref={ref as React.Ref<MdOutlinedIconButton>} {...props} />;
    }
    return <MdIconButtonComponent key={buttonStyle} ref={ref as React.Ref<MdIconButtonType>} {...props} />;
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
