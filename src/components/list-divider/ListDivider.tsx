import { classMap, createComponent } from "../common/Common";
import "../list-item/style.scss";

export type ListDividerProps = {
  leading?: boolean,
  trailing?: boolean,
  padding?: boolean,
};
export const ListDivider = createComponent<HTMLLIElement, ListDividerProps>(
  function ListDivider({
    leading,
    trailing,
    padding,
    className,
    ...props
  }, ref) {
    const classes = {
      'mdc-deprecated-list-divider': true,
      'mdc-deprecated-list-divider--inset-leading': leading,
      'mdc-deprecated-list-divider--inset-trailing': trailing,
      'mdc-deprecated-list-divider--inset-padding': padding,
    };
    return <li ref={ref} role="separator"
      className={classMap(classes, className)} {...props} />;
  }
);
