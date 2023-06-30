import "@material/icon-button/styles.scss";
import React from "react";
import { classMap, createComponent } from "../common/Common";

export const IconContext = React.createContext<React.HTMLProps<HTMLElement>>({});

export const Icon = createComponent<HTMLElement, {}>(
  function Icon({ className: c0, ...props }, ref) {
    const { className: c1, ...context } = React.useContext(IconContext);
    const classes = { 'material-icons': true };
    return <i ref={ref} className={classMap(classes, c0, c1)} {...context} {...props} />;
  }
);
