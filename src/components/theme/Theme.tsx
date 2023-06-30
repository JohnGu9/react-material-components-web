import React from "react";
import { classMap, createComponent } from "../common/Common";
import "./style.scss";

export type ThemeProps = {
  /* css property */
  primary?: string,
  secondary?: string,
  background?: string,
  surface?: string,
  onPrimary?: string,
  onSecondary?: string,
  onSurface?: string,

  textColor?: 'primary' | 'secondary' | 'on-primary' | 'on-secondary' | 'on-surface',
  backgroundColor?: 'background' | 'primary-bg' | 'secondary-bg',
  isSurface?: boolean,
};

export const Theme = createComponent<HTMLDivElement, ThemeProps>(
  function Theme({
    primary,
    secondary,
    background,
    surface,
    onPrimary,
    onSecondary,
    onSurface,

    textColor,
    backgroundColor,
    isSurface = false,
    className,
    style,
    ...props
  }, ref) {
    const classes = {
      [`mdc-theme--${textColor}`]: textColor !== undefined,
      [`mdc-theme--${backgroundColor}`]: backgroundColor !== undefined,
      'mdc-theme--surface': isSurface,
    };
    return (<div ref={ref}
      className={classMap(classes, className)}
      style={{
        '--mdc-theme-primary': primary,
        '--mdc-theme-secondary': secondary,
        '--mdc-theme-background': background,
        '--mdc-theme-surface': surface,
        '--mdc-theme-on-primary': onPrimary,
        '--mdc-theme-on-secondary': onSecondary,
        '--mdc-theme-on-surface': onSurface,
        ...style,
      } as React.CSSProperties}
      {...props} />);
  }
);
