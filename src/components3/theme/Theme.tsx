import { createComponent } from "../../components/common/Component";
import "./styles.scss";

export type ThemeProps = {
  enableDarkTheme?: boolean,
};

export const Theme = createComponent<HTMLDivElement, ThemeProps>(
  function Theme({ enableDarkTheme, ...props }, ref) {
    return <div data-dark-mode={`rmcw-dark-mode-${getModeString(enableDarkTheme)}`} ref={ref} {...props} />
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
