// If you want to use custom font, import this file

import React from "react";
import { createComponent } from "../../common/Component";
import { usePrefersColorSchemeDark } from "../../common/Media";
import "../typography/TypographyWithoutFont"
import "./styles.scss";

export type ThemeData = {
  // color
  "--md-sys-color-background": string;
  "--md-sys-color-error": string;
  "--md-sys-color-error-container": string;
  "--md-sys-color-inverse-on-surface": string;
  "--md-sys-color-inverse-primary": string;
  "--md-sys-color-inverse-surface": string;
  "--md-sys-color-on-background": string;
  "--md-sys-color-on-error": string;
  "--md-sys-color-on-error-container": string;
  "--md-sys-color-on-primary": string;
  "--md-sys-color-on-primary-container": string;
  "--md-sys-color-on-primary-fixed": string;
  "--md-sys-color-on-primary-fixed-variant": string;
  "--md-sys-color-on-secondary": string;
  "--md-sys-color-on-secondary-container": string;
  "--md-sys-color-on-secondary-fixed": string;
  "--md-sys-color-on-secondary-fixed-variant": string;
  "--md-sys-color-on-surface": string;
  "--md-sys-color-on-surface-variant": string;
  "--md-sys-color-on-tertiary": string;
  "--md-sys-color-on-tertiary-container": string;
  "--md-sys-color-on-tertiary-fixed": string;
  "--md-sys-color-on-tertiary-fixed-variant": string;
  "--md-sys-color-outline": string;
  "--md-sys-color-outline-variant": string;
  "--md-sys-color-primary": string;
  "--md-sys-color-primary-container": string;
  "--md-sys-color-primary-fixed": string;
  "--md-sys-color-primary-fixed-dim": string;
  "--md-sys-color-scrim": string;
  "--md-sys-color-secondary": string;
  "--md-sys-color-secondary-container": string;
  "--md-sys-color-secondary-fixed": string;
  "--md-sys-color-secondary-fixed-dim": string;
  "--md-sys-color-shadow": string;
  "--md-sys-color-surface": string;
  "--md-sys-color-surface-bright": string;
  "--md-sys-color-surface-container": string;
  "--md-sys-color-surface-container-high": string;
  "--md-sys-color-surface-container-highest": string;
  "--md-sys-color-surface-container-low": string;
  "--md-sys-color-surface-container-lowest": string;
  "--md-sys-color-surface-dim": string;
  "--md-sys-color-surface-tint": string;
  "--md-sys-color-surface-variant": string;
  "--md-sys-color-tertiary": string;
  "--md-sys-color-tertiary-container": string;
  "--md-sys-color-tertiary-fixed": string;
  "--md-sys-color-tertiary-fixed-dim": string;

  // sharp
  "--md-sys-shape-corner-none": string;
  "--md-sys-shape-corner-extra-small": string;
  "--md-sys-shape-corner-small": string;
  "--md-sys-shape-corner-medium": string;
  "--md-sys-shape-corner-large": string;
  "--md-sys-shape-corner-extra-large": string;
  "--md-sys-shape-corner-full": string;

  // typography
  "--md-ref-typeface-brand": string;
  "--md-ref-typeface-plain": string;
};

export type ThemeProps = {
  enableDarkTheme?: boolean,
  lightTheme?: ThemeData,
  darkTheme?: ThemeData,
  withBackgroundColor?: boolean,
};

export const Theme = createComponent<HTMLDivElement, ThemeProps>(
  function Theme({ enableDarkTheme, lightTheme, darkTheme, withBackgroundColor, style, ...props }, ref) {
    const prefersDark = usePrefersColorSchemeDark(enableDarkTheme === undefined);

    const isDark = enableDarkTheme ?? prefersDark;
    const targetTheme = isDark ? darkTheme : lightTheme;

    const mergeStyle = React.useMemo<React.CSSProperties>(() => {
      if (withBackgroundColor)
        return {
          ...targetTheme,
          backgroundColor: 'var(--md-sys-color-background)',
          ...style,
        };
      return {
        ...targetTheme,
        ...style,
      };
    }, [style, targetTheme, withBackgroundColor]);

    return <div data-dark-mode={`rmcw3-dark-mode-${getModeString(enableDarkTheme)}`} style={mergeStyle} ref={ref} {...props} />
  }
);

function getModeString(enableDarkTheme?: boolean) {
  switch (enableDarkTheme) {
    case true:
      return 'on';
    case false:
      return 'off';
  }
  return 'auto'
}
