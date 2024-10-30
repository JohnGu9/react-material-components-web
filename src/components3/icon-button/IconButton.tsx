import { IconButton as MdIconButton } from "@material/web/iconbutton/internal/icon-button";
import { createComponent } from "../../components/common/Component";
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

export const FilledIconButton = createComponent<MdIconButton, IconButtonBaseProps>(
  function FilledIconButton(props, ref) {
    return <MdFilledIconButtonComponent ref={ref as any} {...props} />
  }
);
export const TonalIconButton = createComponent<MdIconButton, IconButtonBaseProps>(
  function TonalIconButton(props, ref) {
    return <MdFilledTonalIconButtonComponent ref={ref as any} {...props} />
  }
);
export const OutlinedIconButton = createComponent<MdIconButton, IconButtonBaseProps>(
  function OutlinedIconButton(props, ref) {
    return <MdOutlinedIconButtonComponent ref={ref as any} {...props} />
  }
);
