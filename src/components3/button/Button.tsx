import { createComponent } from "../../common/Component";
import { Button as MdButton } from "@material/web/button/internal/button";
import { FormSubmitterType } from "@material/web/internal/controller/form-submitter";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { FilledButton, FilledButtonSupportedCssProps } from "./FilledButton";
import { FilledTonalButton, FilledTonalButtonSupportedCssProps } from "./FilledTonalButton";
import { OutlinedButton, OutlinedButtonSupportedCssProps } from "./OutlinedButton";
import { TextButton, TextButtonSupportedCssProps } from "./TextButton";
import { ElevatedButton, ElevatedButtonSupportedCssProps } from "./ElevatedButton";
import { MdFilledButton } from "@material/web/button/filled-button";
import { MdFilledTonalButton } from "@material/web/button/filled-tonal-button";
import { MdOutlinedButton } from "@material/web/button/outlined-button";
import { MdTextButton } from "@material/web/button/text-button";
import { MdElevatedButton } from "@material/web/button/elevated-button";

export type ButtonBaseProps = {
  disabled?: boolean,
  softDisabled?: boolean,
  trailingIcon?: boolean,
  icon?: SlotNode,
  // 
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  form?: never,
  type?: FormSubmitterType,
  value?: string,
};

export type ButtonProps = ButtonBaseProps & {
  buttonStyle?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text",
};

function composeProps({ icon, children, style, ...props }: { [key: string]: unknown; }) {
  const hasIcon = icon ? true : undefined;
  const mergeChildren = <>
    {children}
    {icon ? createSlotNode(icon as SlotNode, "icon") : <></>}
  </>;
  return { hasIcon, style: { "--md-icon-size": "18px", ...(style as React.CSSProperties) }, children: mergeChildren, ...props };
}


export const Button = createComponent<MdButton, ButtonProps>(
  function Button({ buttonStyle, ...props }, ref) {
    switch (buttonStyle) {
      case "filled":
        return (<FilledButton key={buttonStyle} ref={ref as unknown as React.Ref<MdFilledButton>} {...composeProps(props)} />);

      case "filled-tonal":
        return (<FilledTonalButton key={buttonStyle} ref={ref as unknown as React.Ref<MdFilledTonalButton>} {...composeProps(props)} />);

      case "outlined":
        return (<OutlinedButton key={buttonStyle} ref={ref as unknown as React.Ref<MdOutlinedButton>} {...composeProps(props)} />);

      case "text":
        return (<TextButton key={buttonStyle} ref={ref as unknown as React.Ref<MdTextButton>} {...composeProps(props)} />);
    }
    return (<ElevatedButton key={buttonStyle} ref={ref as unknown as React.Ref<MdElevatedButton>} {...composeProps(props)} />);
  }
);

export type ButtonSupportedCssProps =
  ElevatedButtonSupportedCssProps &
  FilledButtonSupportedCssProps &
  FilledTonalButtonSupportedCssProps &
  OutlinedButtonSupportedCssProps &
  TextButtonSupportedCssProps;
