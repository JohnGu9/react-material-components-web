import "@material/web/button/elevated-button"
import "@material/web/button/filled-button"
import "@material/web/button/filled-tonal-button"
import "@material/web/button/outlined-button"
import "@material/web/button/text-button"
import { createComponent } from "../../components/common/Component";
import { Button as MdButton } from "@material/web/button/internal/button";
import { MdElevatedButtonComponent, MdFilledButtonComponent, MdFilledTonalButtonComponent, MdOutlinedButtonComponent, MdTextButtonComponent } from "./Compoent"
import { FormSubmitterType } from "@material/web/internal/controller/form-submitter"

export type ButtonBaseProps = {
  disabled?: boolean,
  softDisabled?: boolean,
  trailingIcon?: boolean,
  icon?: React.ReactNode,
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
      ? <div slot="icon">{icon}</div>
      : <></>}
  </>;
  return { hasIcon, style: { "--md-icon-size": "18px", ...style }, children: mergeChildren, ...props };
}

export const ElevatedButton = createComponent<MdButton, ButtonBaseProps>(
  function ElevatedButton(props, ref) {
    return (<MdElevatedButtonComponent ref={ref as any} {...composeProps(props)} />);
  }
);
export const FilledButton = createComponent<MdButton, ButtonBaseProps>(
  function FilledButton(props, ref) {
    return (<MdFilledButtonComponent ref={ref as any} {...composeProps(props)} />);
  }
);
export const FilledTonalButton = createComponent<MdButton, ButtonBaseProps>(
  function FilledTonalButton(props, ref) {
    return (<MdFilledTonalButtonComponent ref={ref as any} {...composeProps(props)} />);
  }
);
export const OutlinedButton = createComponent<MdButton, ButtonBaseProps>(
  function OutlinedButton(props, ref) {
    return (<MdOutlinedButtonComponent ref={ref as any} {...composeProps(props)} />);
  }
);
export const TextButton = createComponent<MdButton, ButtonBaseProps>(
  function TextButton(props, ref) {
    return (<MdTextButtonComponent ref={ref as any} {...composeProps(props)} />);
  }
);

export const Button = createComponent<MdButton, ButtonProps>(
  function Button({ buttonStyle, ...props }, ref) {
    switch (buttonStyle) {
      case "filled":
        return (<MdFilledButtonComponent key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

      case "filled-tonal":
        return (<MdFilledTonalButtonComponent key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

      case "outlined":
        return (<MdOutlinedButtonComponent key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

      case "text":
        return (<MdTextButtonComponent key={buttonStyle} ref={ref as any} {...composeProps(props)} />);

    }
    return (<MdElevatedButtonComponent key={buttonStyle} ref={ref as any} {...composeProps(props)} />);
  }
);
