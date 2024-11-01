import "@material/web/button/elevated-button"
import "@material/web/button/filled-button"
import "@material/web/button/filled-tonal-button"
import "@material/web/button/outlined-button"
import "@material/web/button/text-button"
import { createComponent } from "../../components/common/Component";
import { Button as MdButton } from "@material/web/button/internal/button";
import { MdElevatedButtonComponent, MdFilledButtonComponent, MdFilledTonalButtonComponent, MdOutlinedButtonComponent, MdTextButtonComponent } from "./Compoent"
import { FormSubmitterType } from "@material/web/internal/controller/form-submitter"
import { createSlotNode, SlotNode } from "../common/SlotNode"

export type ButtonBaseProps = {
  disabled?: boolean,
  softDisabled?: boolean,
  trailingIcon?: boolean,
  icon?: SlotNode,
  // 
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  form?: undefined,
  type?: FormSubmitterType,
  value?: string,
};

export type ButtonProps = ButtonBaseProps & {
  buttonStyle?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text",
};

function composeProps({ icon, children, style, ...props }: { [key: string]: any }) {
  const hasIcon = icon ? true : undefined;
  const mergeChildren = <>
    {children}
    {icon
      ? createSlotNode(icon, "icon")
      : <></>}
  </>;
  return { hasIcon, style: { "--md-icon-size": "18px", ...style }, children: mergeChildren, ...props };
}

export const ElevatedButton = MdElevatedButtonComponent;
export const FilledButton = MdFilledButtonComponent;
export const FilledTonalButton = MdFilledTonalButtonComponent;
export const OutlinedButton = MdOutlinedButtonComponent;
export const TextButton = MdTextButtonComponent;

export const Button = createComponent<MdButton, ButtonProps>(
  function Button({ buttonStyle, ...props }, ref) {
    switch (buttonStyle) {
      case "filled":
        return (<FilledButton key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

      case "filled-tonal":
        return (<FilledTonalButton key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

      case "outlined":
        return (<OutlinedButton key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

      case "text":
        return (<TextButton key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

    }
    return (<ElevatedButton key={buttonStyle} ref={ref as any} {...composeProps(props)} />);
  }
);

export type ButtonSupportedCssProps = {
  "--md-elevated-button-container-color": string,
  "--md-elevated-button-container-shape": string,
  "--md-elevated-button-label-text-color": string,
  "--md-elevated-button-label-text-font": string,

  "--md-filled-button-container-color": string,
  "--md-filled-button-container-shape": string,
  "--md-filled-button-label-text-color": string,
  "--md-filled-button-label-text-font": string,

  "--md-filled-tonal-button-container-color": string,
  "--md-filled-tonal-button-container-shape": string,
  "--md-filled-tonal-button-label-text-color": string,
  "--md-filled-tonal-button-label-text-font": string,

  "--md-outlined-button-outline-color": string,
  "--md-outlined-button-container-shape": string,
  "--md-outlined-button-label-text-color": string,
  "--md-outlined-button-label-text-font": string,

  "--md-text-button-label-text-color": string,
  "--md-text-button-label-text-font": string,
};
