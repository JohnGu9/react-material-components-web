import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../../common/Common";
import { IconButtonContext } from "../icon-button/IconButton";
import { TopAppBarComponent } from "./Component";
import { ThemeContext, themeDataToCSSProperties } from "../theme/Theme";

type BaseProps = {
  title?: React.ReactNode,
  navigationIcon?: React.ReactNode,
  actionItem?: React.ReactNode,
};

export type TopAppBarProps = {
  fixed?: boolean,
  dense?: boolean,
  prominent?: boolean,
} & BaseProps;

export const TopAppBar = createComponent<HTMLElement, TopAppBarProps>(
  function TopAppBar({
    fixed = false,
    dense = false,
    prominent = false,
    title,
    navigationIcon,
    actionItem,
    className,
    style,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLElement>(null);
    const injector = useClassInjector(innerRef);
    const themeContext = React.useContext(ThemeContext);

    injector.with('mdc-top-app-bar', true);
    injector.with('mdc-top-app-bar--fixed', fixed);
    injector.with('mdc-top-app-bar--dense', dense);
    injector.with('mdc-top-app-bar--prominent', prominent);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new TopAppBarComponent(innerRef.current!, injector);
      return () => component.destroy();
    }, [fixed, injector]);

    const mergeStyle = React.useMemo(() => {
      if (themeContext === null) return style;
      return { ...themeDataToCSSProperties(themeContext.topAppBarTheme), ...style };
    }, [style, themeContext]);

    return (<>
      <header ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        style={mergeStyle}
        {...props}>
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <IconButtonContext.Provider value={{ className: 'mdc-top-app-bar__navigation-icon' }}>
              {navigationIcon}
            </IconButtonContext.Provider>
            <span className="mdc-top-app-bar__title">{title}</span>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <IconButtonContext.Provider value={{ className: 'mdc-top-app-bar__action-item' }}>
              {actionItem}
            </IconButtonContext.Provider>
          </section>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>);
  }
);

export type ShortTopAppBarProps = {
  collapsed?: boolean,
} & BaseProps;

export const ShortTopAppBar = createComponent<HTMLElement, ShortTopAppBarProps>(
  function ShortTopAppBar({
    collapsed,
    title,
    navigationIcon,
    actionItem,
    className,
    children,
    style,
    ...props
  }, ref) {
    const innerRef = React.useRef<HTMLElement>(null);
    const composeRefs = useRefComposer();
    const injector = useClassInjector(innerRef);
    const [maybeCollapse, setMaybeCollapse] = React.useState(false);
    const themeContext = React.useContext(ThemeContext);

    injector.with('mdc-top-app-bar', true);
    injector.with('mdc-top-app-bar--short', true);
    injector.with('mdc-top-app-bar--short-collapsed', collapsed ?? maybeCollapse);
    injector.with('mdc-top-app-bar--short-has-action-item', isDefined(actionItem));
    injector.withClassName('0', className);

    React.useEffect(() => {
      const scrollTarget = window;
      const listener = () => {
        const currentScroll = scrollTarget.scrollY ?? scrollTarget.pageYOffset;
        if (currentScroll <= 0) setMaybeCollapse(false);
        else setMaybeCollapse(true);
      }
      scrollTarget.addEventListener('scroll', listener, { passive: true });
      return () => scrollTarget.removeEventListener('scroll', listener);
    }, []);

    const mergeStyle = React.useMemo(() => {
      if (themeContext === null) return style;
      return { ...themeDataToCSSProperties(themeContext.topAppBarTheme), ...style };
    }, [style, themeContext]);

    return (<>
      <header ref={composeRefs(innerRef, ref)}
        className={injector.toClassName()}
        style={mergeStyle}
        {...props}>
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <IconButtonContext.Provider value={{ className: 'mdc-top-app-bar__navigation-icon' }}>
              {navigationIcon}
            </IconButtonContext.Provider>
            <span className="mdc-top-app-bar__title">{title}</span>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <IconButtonContext.Provider value={{ className: 'mdc-top-app-bar__action-item' }}>
              {actionItem}
            </IconButtonContext.Provider>
          </section>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>);
  }
);
