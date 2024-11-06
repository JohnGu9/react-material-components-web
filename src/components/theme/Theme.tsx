import React from "react";
import { createComponent } from "../../common/Common";
import "./style.scss";
import { PrefersColorScheme } from "../../common/media";


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
  withBackgroundColor?: boolean,
  buildTopAppBarTheme?: (lightTheme: ThemeData, darkTheme: ThemeData, isDark: boolean) => ThemeData,
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
    textPrimaryOnBackground,
    textSecondaryOnBackground,
    textHintOnBackground,
    textDisabledOnBackground,
    textIconOnBackground,
    darkTheme = {},
    enableDarkTheme,
    withBackgroundColor,
    buildTopAppBarTheme = defaultBuildTopAppBarTheme,
    style,
    ...props
  }, ref) {
    const lightTheme: ThemeData = React.useMemo(() => {
      return {
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
      };
    },
      [background, onPrimary, onSecondary, onSurface, primary, secondary, surface, textDisabledOnBackground, textHintOnBackground, textIconOnBackground, textPrimaryOnBackground, textSecondaryOnBackground]);

    const [, setMediaDarkMode] = React.useState(PrefersColorScheme.matches);
    React.useEffect(() => {
      if (enableDarkTheme === undefined) {
        const listener = () => {
          setMediaDarkMode(PrefersColorScheme.matches);
        };
        PrefersColorScheme.addEventListener('change', listener);
        return () => {
          PrefersColorScheme.removeEventListener('change', listener);
        };
      }
    }, [enableDarkTheme]);
    const mediaDarkMode = PrefersColorScheme.matches;

    const isDark = enableDarkTheme ?? mediaDarkMode;
    let targetTheme: ThemeData, reverseTheme: ThemeData;
    if (isDark) {
      targetTheme = darkTheme;
      reverseTheme = lightTheme;
    } else {
      targetTheme = lightTheme;
      reverseTheme = darkTheme;
    }

    const context = React.useMemo(() => {
      return {
        isDark,
        theme: targetTheme,
        reverseTheme,
        topAppBarTheme: buildTopAppBarTheme(lightTheme, darkTheme, isDark)
      };
    }, [buildTopAppBarTheme, darkTheme, isDark, lightTheme, reverseTheme, targetTheme]);

    const mergeStyle = React.useMemo<React.CSSProperties>(() => {
      if (withBackgroundColor)
        return {
          ...themeDataToCSSProperties(targetTheme),
          backgroundColor: 'var(--mdc-theme-background)',
          ...style,
        };
      return {
        ...themeDataToCSSProperties(targetTheme),
        ...style,
      };
    }, [style, targetTheme, withBackgroundColor]);

    return (
      <ThemeContext.Provider value={context}>
        <div ref={ref}
          data-dark-mode={`rmcw2-dark-mode-${getModeString(enableDarkTheme)}`}
          style={mergeStyle}
          {...props} />
      </ThemeContext.Provider>
    );
  }
);

export const ThemeContext = React.createContext<{
  theme: ThemeData,
  reverseTheme: ThemeData,
  topAppBarTheme: ThemeData,
  isDark: boolean,
} | null>(null);

export function themeDataToCSSProperties(targetTheme: ThemeData) {
  return {
    color: targetTheme.onSurface,
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
  } as React.CSSProperties;
}

function defaultBuildTopAppBarTheme(lightTheme: ThemeData,
  darkTheme: ThemeData, isDark: boolean): ThemeData {
  if (isDark) {
    return darkTheme;
  } else {
    return {
      ...lightTheme,
      primary: lightTheme.secondary,
      onPrimary: lightTheme.onSecondary,
      surface: lightTheme.primary,
      onSurface: lightTheme.onPrimary,
      background: lightTheme.primary,
      textDisabledOnBackground: darkTheme.textDisabledOnBackground,
      textHintOnBackground: darkTheme.textHintOnBackground,
      textIconOnBackground: darkTheme.textIconOnBackground,
      textPrimaryOnBackground: darkTheme.textPrimaryOnBackground,
      textSecondaryOnBackground: darkTheme.textSecondaryOnBackground,
    };
  }
}

function getModeString(enableDarkTheme?: boolean) {
  switch (enableDarkTheme) {
    case true:
      return 'on';
    case false:
      return 'off';
  }
  return 'auto'
}

export const defaultLightTheme: ThemeData = {
  primary: '#6200ee',// var(--mdc-theme-primary, #6200ee)
  secondary: '#03dac4', // var(--mdc-theme-secondary, #03dac4)
  background: '#fff',// var(--mdc-theme-background, #fff)
  surface: '#fff',// var(--mdc-theme-surface, #fff)
  onPrimary: 'rgba(255, 255, 255, 1)',// var(--mdc-theme-on-primary, rgba(255, 255, 255, 1))
  onSecondary: 'rgba(0, 0, 0, 0.87)',// var(--mdc-theme-on-secondary, rgba(0, 0, 0, 0.87))
  onSurface: 'rgba(0, 0, 0, 0.87)',// var(--mdc-theme-on-surface, rgba(0, 0, 0, 0.87))
  textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',// var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))
  textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',// var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))
  textHintOnBackground: 'rgba(0, 0, 0, 0.38)',// var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))
  textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',// var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38))
  textIconOnBackground: 'rgba(0, 0, 0, 0.38)',// var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))
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
