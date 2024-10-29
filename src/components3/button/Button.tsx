import "@material/web/button/elevated-button"
import "@material/web/button/filled-button"
import "@material/web/button/filled-tonal-button"
import "@material/web/button/outlined-button"
import "@material/web/button/text-button"
import { createComponent } from "../../components/common/Component";
import { Button as MdButton } from "@material/web/button/internal/button";

type ButtonHTMLProps = React.HTMLProps<MdButton> & Partial<Pick<MdButton, "softDisabled" | "trailingIcon" | "hasIcon">>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-elevated-button': ButtonHTMLProps;
      'md-filled-button': ButtonHTMLProps;
      'md-filled-tonal-button': ButtonHTMLProps;
      'md-outlined-button': ButtonHTMLProps;
      'md-text-button': ButtonHTMLProps;
    }
  }
}

export type ButtonProps = {
  disabled?: boolean,
  softDisabled?: boolean,
  icon?: React.ReactNode,
  trailingIcon?: boolean,
  buttonStyle?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text",
};

export const Button = createComponent<MdButton, ButtonProps>(
  function Button({ disabled, softDisabled, icon, trailingIcon, buttonStyle, children, ...props }, ref) {
    if (!disabled) {
      disabled = undefined;
    }
    if (!softDisabled) {
      softDisabled = undefined;
    }
    if (!trailingIcon) {
      trailingIcon = undefined;
    }
    const hasIcon = icon ? true : undefined;
    const mergeChildren = <>
      {children}
      {icon
        ? <div slot="icon">{icon}</div>
        : <></>}
    </>;
    const mergeProps = { disabled, softDisabled, "trailing-icon": trailingIcon, hasIcon, children: mergeChildren, ...props };
    switch (buttonStyle) {
      case "filled":
        return (<md-filled-button ref={ref} {...mergeProps} />);

      case "filled-tonal":
        return (<md-filled-tonal-button ref={ref} {...mergeProps} />);

      case "outlined":
        return (<md-outlined-button ref={ref} {...mergeProps} />);

      case "text":
        return (<md-text-button ref={ref} {...mergeProps} />);

    }
    return (<md-elevated-button ref={ref} {...mergeProps} />);
  }
);
