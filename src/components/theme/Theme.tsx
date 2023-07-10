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

    const [mediaDarkMode, setMediaDarkMode] = React.useState(media.matches);

    const isDark = enableDarkTheme ?? mediaDarkMode;
    if (isDark) {
      primary = darkTheme.primary ?? primary;
      secondary = darkTheme.secondary ?? secondary;
      background = darkTheme.background ?? background;
      surface = darkTheme.surface ?? surface;
      onPrimary = darkTheme.onPrimary ?? onPrimary;
      onSecondary = darkTheme.onSecondary ?? onSecondary;
      onSurface = darkTheme.onSurface ?? onSurface;
      textPrimaryOnBackground = darkTheme.textPrimaryOnBackground ?? textPrimaryOnBackground;
      textSecondaryOnBackground = darkTheme.textSecondaryOnBackground ?? textSecondaryOnBackground;
      textHintOnBackground = darkTheme.textHintOnBackground ?? textHintOnBackground;
      textDisabledOnBackground = darkTheme.textDisabledOnBackground ?? textDisabledOnBackground;
      textIconOnBackground = darkTheme.textIconOnBackground ?? textIconOnBackground;
    }

    React.useEffect(() => {
      const listener = () => {
        setMediaDarkMode(media.matches);
      };
      media.addEventListener('change', listener);
      return () => {
        media.removeEventListener('change', listener);
      };
    }, []);

    return (<div ref={ref}
      style={{
        '--mdc-theme-primary': primary,
        '--mdc-theme-secondary': secondary,
        '--mdc-theme-background': background,
        '--mdc-theme-surface': surface,
        '--mdc-theme-on-primary': onPrimary,
        '--mdc-theme-on-secondary': onSecondary,
        '--mdc-theme-on-surface': onSurface,
        '--mdc-theme-text-primary-on-background': textPrimaryOnBackground,
        '--mdc-theme-text-secondary-on-background': textSecondaryOnBackground,
        '--mdc-theme-text-hint-on-background': textHintOnBackground,
        '--mdc-theme-text-disabled-on-background': textDisabledOnBackground,
        '--mdc-theme-text-icon-on-background': textIconOnBackground,
        backgroundColor: background,
        color: onSurface,
        ...style,
      } as React.CSSProperties}
      {...props} />);
  }
);
