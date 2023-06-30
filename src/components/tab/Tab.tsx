import "@material/tab/mdc-tab.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../common/Common";
import { IconContext } from "../icon/Icon";
import { TabComponent } from "./Component";

export const TabContext = React.createContext<React.HTMLProps<HTMLButtonElement> & {
  stacked?: boolean,
  minWidth?: boolean,
}>({});

export type TabProps = {
  icon?: React.ReactNode,
  label?: React.ReactNode,
  stacked?: boolean,
  minWidth?: boolean,
  focusRing?: boolean,
  type?: "button" | "submit" | "reset",
};

export const Tab = createComponent<HTMLButtonElement, TabProps>(
  function Tab({
    icon,
    label,
    stacked,
    minWidth,
    focusRing = true,
    className,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const injector = useClassInjector(innerRef);
    const { className: c1, type, stacked: s1, minWidth: m1, ...context } = React.useContext(TabContext);

    stacked ??= s1 ?? false;
    minWidth ??= m1 ?? false;

    injector.with('mdc-tab', true);
    injector.with('mdc-tab--stacked', stacked);
    injector.with('mdc-tab--min-width', minWidth);
    injector.withClassName('0', className);
    injector.withClassName('1', c1);

    React.useEffect(() => {
      const component = new TabComponent(innerRef.current!, injector);
      return () => component.destroy();
    }, [injector]);

    return (
      <button ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        role="tab" aria-selected="false"
        tabIndex={0}
        {...context} {...props}>
        <span className="mdc-tab__content" aria-hidden>
          <IconContext.Provider value={{ className: 'mdc-tab__icon', 'aria-hidden': 'true' }}>
            {icon}
          </IconContext.Provider>
          <span className="mdc-tab__text-label">{label}</span>
        </span>
        <span className="mdc-tab-indicator" aria-hidden>
          <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
        </span>
        <span className="mdc-tab__ripple" aria-hidden></span>
        {focusRing ? <div className="mdc-tab__focus-ring" aria-hidden></div> : undefined}
      </button>
    );
  }
);
