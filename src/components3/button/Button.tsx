import "@material/web/button/elevated-button"
import "@material/web/button/filled-button"
import "@material/web/button/filled-tonal-button"
import "@material/web/button/outlined-button"
import "@material/web/button/text-button"
import { createComponent } from "../../components/common/Component";
import { Button as MdButton } from "@material/web/button/internal/button";
import { IconContext } from "../icon/Icon"
import { MdElevatedButtonComponent, MdFilledButtonComponent, MdFilledTonalButtonComponent, MdOutlinedButtonComponent, MdTextButtonComponent } from "./Compoent"
import { FormSubmitterType } from "@material/web/internal/controller/form-submitter"

export type ButtonProps = {
  disabled?: boolean,
  softDisabled?: boolean,
  icon?: React.ReactNode,
  trailingIcon?: boolean,
  buttonStyle?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text",
  // 
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  form?: undefined,
  type?: FormSubmitterType,
  value?: string,
};

export const Button = createComponent<MdButton, ButtonProps>(
  function Button({ disabled, softDisabled, icon, trailingIcon, buttonStyle, children, ...props }, ref) {
    const hasIcon = icon ? true : undefined;
    const mergeChildren = <>
      {children}
      {icon
        ? <IconContext.Provider value={{ style: { fontSize: 18 } }}><div slot="icon">{icon}</div></IconContext.Provider>
        : <></>}
    </>;
    const mergeProps = { disabled, "soft-disabled": softDisabled, "trailing-icon": trailingIcon, "has-icon": hasIcon, children: mergeChildren, ...props };
    switch (buttonStyle) {
      case "filled":
        return (<MdFilledButtonComponent key={buttonStyle} ref={ref as any} {...mergeProps} />);

      case "filled-tonal":
        return (<MdFilledTonalButtonComponent key={buttonStyle} ref={ref as any} {...mergeProps} />);

      case "outlined":
        return (<MdOutlinedButtonComponent key={buttonStyle} ref={ref as any} {...mergeProps} />);

      case "text":
        return (<MdTextButtonComponent key={buttonStyle} ref={ref as any} {...mergeProps} />);

    }
    return (<MdElevatedButtonComponent key={buttonStyle} ref={ref as any} {...mergeProps} />);
  }
);
