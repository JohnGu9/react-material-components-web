import { createComponent } from "../../components/common/Component";
import "./styles.scss";

export type ThemeProps = {
  darkMode?: boolean,
};

export const Theme = createComponent<HTMLDivElement, ThemeProps>(
  function Theme({ darkMode, ...props }, ref) {

    return <div data-dark-mode={`rmcw-dark-mode-${getModeString(darkMode)}`} ref={ref} {...props} />
  }
);

function getModeString(darkMode?: boolean) {
  switch (darkMode) {
    case true:
      return 'on';
    case false:
      return 'off';
  }
  return 'auto'
}
