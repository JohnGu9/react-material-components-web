import { Corner } from "@material/web/menu/menu";
import { createComponent } from "../../common/Component";
import { RmcwMenuComponent } from "./Component";
import "./styles.scss"
import React from "react";

export * from "../../common/MenuController";

// auto detect sub-menu children
export const MenuContext = React.createContext({ registerSubMenu: () => { }, deregisterSubMenu: () => { } });

export type MenuProps = {
  anchor: string, // recommend to set, unique and fixed id
  open?: boolean,
  quick?: boolean,
  positioning?: 'absolute' | 'fixed' | 'document' | 'popover',
  hasOverflow?: boolean,
  xOffset?: number,
  yOffset?: number,
  anchorCorner?: Corner,
  menuCorner?: Corner,
  surface?: React.ReactNode,
  onOutsideClick?: ((e: Event) => void),
  onMenuFocusout?: ((e: Event) => void),
  onClosableKey?: ((e: Event) => void),
};

export const Menu = createComponent<HTMLSpanElement, MenuProps>(
  function Menu({ anchor, open, quick, positioning, hasOverflow, xOffset, yOffset, surface, onOutsideClick, onMenuFocusout, onClosableKey, children, ...props }, ref) {
    const subCounter = React.useMemo(() => { return { counter: 0 } }, []);
    const [, setSubCounter] = React.useState(0);
    const ctx = React.useMemo(() => {
      const registerSubMenu = () => {
        subCounter.counter += 1;
        setSubCounter(subCounter.counter);
      };
      const deregisterSubMenu = () => {
        subCounter.counter -= 1;
        setSubCounter(subCounter.counter);
      };
      return { registerSubMenu, deregisterSubMenu };
    }, [subCounter]);

    return (
      <span ref={ref} {...props}>
        <div id={anchor}>{children}</div>
        <RmcwMenuComponent
          anchor={anchor}
          open={open}
          quick={quick}
          positioning={positioning}
          hasOverflow={hasOverflow ?? (subCounter.counter !== 0)}
          xOffset={xOffset}
          yOffset={yOffset}
          stayOpenOnOutsideClick
          stayOpenOnFocusout
          onOutsideClick={onOutsideClick}
          onMenuFocusout={onMenuFocusout}
          onClosableKey={onClosableKey}>
          <MenuContext.Provider value={ctx}>
            {surface}
          </MenuContext.Provider>
        </RmcwMenuComponent>
      </span>);
  }
);

export type MenuSupportedCssProps = {
  "--md-menu-container-color": string,
  "--md-menu-container-shape": string,
};
