import "@material/icon-button/styles.scss";
import 'material-icons/iconfont/material-icons.css';
import React from "react";
import { classMap, createComponent } from "../common/Common";

// @TODO: split different icon style to different file

export const IconContext = React.createContext<React.HTMLProps<HTMLElement>>({});

export type IconProps = {
  iconStyle?: "outlined" | "round" | "sharp" | "two-tone"
};

export const Icon = createComponent<HTMLElement, IconProps>(
  function Icon({ className: c0, iconStyle, ...props }, ref) {
    const { className: c1, ...context } = React.useContext(IconContext);

    const classes = {
      'material-icons': false,
      'material-icons-outlined': false,
      'material-icons-round': false,
      'material-icons-sharp': false,
      'material-icons-two-tone': false,
    };
    switch (iconStyle) {
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
