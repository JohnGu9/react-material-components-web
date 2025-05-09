import "@material/icon-button/styles.scss";
import React from "react";
import { classMap, createComponent } from "../../common/Common";

// @TODO: split different icon style to different file

export type IconStyle = "outlined" | "round" | "sharp" | "two-tone";

export type IconProps = {
  iconStyle?: IconStyle;
};

// eslint-disable-next-line react-refresh/only-export-components
export const IconContext = React.createContext<React.HTMLProps<HTMLElement> & IconProps>({});

export const Icon = createComponent<HTMLElement, IconProps>(
  function Icon({ className: c0, iconStyle, ...props }, ref) {
    const { className: c1, iconStyle: iconStyleFromContext, ...context } = React.useContext(IconContext);

    const classes = {
      'material-icons': false,
      'material-icons-outlined': false,
      'material-icons-round': false,
      'material-icons-sharp': false,
      'material-icons-two-tone': false,
    };
    switch (iconStyle ?? iconStyleFromContext) {
      case "outlined":
        classes["material-icons-outlined"] = true;
        break;
      case "round":
        classes["material-icons-round"] = true;
        break;
      case "sharp":
        classes["material-icons-sharp"] = true;
        break;
      case "two-tone":
        classes["material-icons-two-tone"] = true;
        break;

      default:
        classes["material-icons"] = true;
        break;
    }
    return <i ref={ref} className={classMap(classes, c0, c1)} {...context} {...props} />;
  }
);
