import React from "react";
import { createComponent } from "../common/Common";
import "./style.scss";

export type ThemeData = {
  /* css property */
  primary?: string,
  secondary?: string,
  background?: string,
  surface?: string,
  onPrimary?: string,
  onSecondary?: string,
  onSurface?: string,
  textPrimaryOnBackground?: string,
  textSecondaryOnBackground?: string,
  textHintOnBackground?: string,
  textDisabledOnBackground?: string,
  textIconOnBackground?: string,
}

export type ThemeProps = ThemeData & {
  darkTheme?: ThemeData,
  enableDarkTheme?: boolean,
};

export const defaultLightTheme: ThemeData = {
  primary: '#6200ee',
  secondary: '#03dac4',
  background: '#fff',
  surface: '#fff',
  onPrimary: 'rgba(255, 255, 255, 1)',
  onSecondary: 'rgba(0, 0, 0, 0.87)',
  onSurface: 'rgba(0, 0, 0, 0.87)',
  textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
  textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
  textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
  textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
  textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
}

export const defaultDarkTheme: ThemeData = {
  primary: '#bb86fc',
  secondary: '#03dac5',
  background: '#303030',
  surface: '#424242',
  onPrimary: 'rgba(0,0,0,0.87)',
  onSecondary: 'rgba(0,0,0,0.87)',
  onSurface: 'rgba(255,255,255,.87)',
  textPrimaryOnBackground: 'rgba(255, 255, 255, 1)',
  textSecondaryOnBackground: 'rgba(255, 255, 255, 0.7)',
  textHintOnBackground: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnBackground: 'rgba(255, 255, 255, 0.5)',
  textIconOnBackground: 'rgba(255, 255, 255, 0.5)',
}

export const oledDarkTheme: ThemeData = {
  primary: '#bb86fc',
  secondary: '#03dac5',
  background: '#000000',
  surface: 'rgb(51,51,51)',
  onPrimary: 'rgba(0,0,0,0.87)',
  onSecondary: 'rgba(0,0,0,0.87)',
  onSurface: 'rgba(255,255,255,.87)',
  textPrimaryOnBackground: 'rgba(255, 255, 255, 1)',
  textSecondaryOnBackground: 'rgba(255, 255, 255, 0.7)',
  textHintOnBackground: 'rgba(255, 255, 255, 0.5)',
  textDisabledOnBackground: 'rgba(255, 255, 255, 0.5)',
  textIconOnBackground: 'rgba(255, 255, 255, 0.5)',
}

const media = window.matchMedia('(prefers-color-scheme: dark)');

export const Theme = createComponent<HTMLDivElement, ThemeProps>(
  function Theme({
    primary,
    secondary,
    background,
    surface,
    onPrimary,
    onSecondary,
    onSurface,
    textPrimaryOnBackground,
    textSecondaryOnBackground,
    textHintOnBackground,
    textDisabledOnBackground,
    textIconOnBackground,
    darkTheme = defaultDarkTheme,
    enableDarkTheme,
    style,
    ...props
  }, ref) {
    const lightTheme: ThemeData = React.useMemo(() => Object.assign({},
      defaultLightTheme,
      Object.fromEntries(Object.entries({
        primary,
        secondary,
        background,
        surface,
        onPrimary,
        onSecondary,
        onSurface,
        textPrimaryOnBackground,
        textSecondaryOnBackground,
        textHintOnBackground,
        textDisabledOnBackground,
        textIconOnBackground,
      }).filter(([k, v]) => v !== undefined))),
      [background, onPrimary, onSecondary, onSurface, primary, secondary, surface, textDisabledOnBackground, textHintOnBackground, textIconOnBackground, textPrimaryOnBackground, textSecondaryOnBackground]);

    const [, setMediaDarkMode] = React.useState(media.matches);
    React.useEffect(() => {
      if (enableDarkTheme === undefined) {
        const listener = () => {
          setMediaDarkMode(media.matches);
        };
        media.addEventListener('change', listener);
        return () => {
          media.removeEventListener('change', listener);
        };
      }
    }, [enableDarkTheme]);
    const mediaDarkMode = media.matches;

    const isDark = enableDarkTheme ?? mediaDarkMode;
    let targetTheme, reverseTheme;
    if (isDark) {
      targetTheme = darkTheme;
      reverseTheme = lightTheme;
    } else {
      targetTheme = lightTheme;
      reverseTheme = darkTheme;
    }

    return (<div ref={ref}
      style={{
        '--mdc-theme-primary': targetTheme.primary,
        '--mdc-theme-secondary': targetTheme.secondary,
        '--mdc-theme-background': targetTheme.background,
        '--mdc-theme-surface': targetTheme.surface,
        '--mdc-theme-on-primary': targetTheme.onPrimary,
        '--mdc-theme-on-secondary': targetTheme.onSecondary,
        '--mdc-theme-on-surface': targetTheme.onSurface,
        '--mdc-theme-text-primary-on-background': targetTheme.textPrimaryOnBackground,
        '--mdc-theme-text-secondary-on-background': targetTheme.textSecondaryOnBackground,
        '--mdc-theme-text-hint-on-background': targetTheme.textHintOnBackground,
        '--mdc-theme-text-disabled-on-background': targetTheme.textDisabledOnBackground,
        '--mdc-theme-text-icon-on-background': targetTheme.textIconOnBackground,
        '--mdc-ripple-color': targetTheme.onSurface,
        '--mdc-top-app-bar-surface': isDark ? targetTheme.surface : targetTheme.primary,
        '--mdc-top-app-bar-on-surface': isDark ? targetTheme.onSurface : targetTheme.onPrimary,
        '--mdc-snackbar-surface': reverseTheme.surface,
        '--mdc-snackbar-on-surface': reverseTheme.onSurface,
        '--mdc-snackbar-primary': reverseTheme.primary,
        '--mdc-snackbar-text-disabled-on-background': reverseTheme.textDisabledOnBackground,
        backgroundColor: targetTheme.background,
        color: targetTheme.onSurface,
        ...style,
      } as React.CSSProperties}
      {...props} />);
  }
);
