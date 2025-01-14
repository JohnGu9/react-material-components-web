import { MdNavigationDrawer } from "@material/web/labs/navigationdrawer/navigation-drawer";
import { createComponent } from "../../common/Component";
import { RmcwNavigationDrawerModalComponent, RmcwNavigationDrawerModal, RmcwNavigationDrawerComponent } from "./Component";
import { ReactNode } from "react";
import { classMap } from "../../common/Common";
import "./styles.scss";

export type NavigationDrawerModalProps = {
  opened?: boolean,
  pivot?: 'start' | 'end',
  onEscapeKey?: (event: Event) => unknown,
  onScrimClick?: (event: Event) => unknown,
};

export const NavigationDrawerModal = createComponent<RmcwNavigationDrawerModal, NavigationDrawerModalProps>(
  function NavigationDrawer({ ...props }, ref) {
    return <RmcwNavigationDrawerModalComponent ref={ref} {...props} />;
  }
);

export type NavigationDrawerProps = {
  opened?: boolean,
  pivot?: 'start' | 'end',
};

export const NavigationDrawer = createComponent<MdNavigationDrawer, NavigationDrawerProps>(
  function NavigationDrawer({ ...props }, ref) {
    return <RmcwNavigationDrawerComponent ref={ref} {...props} />;
  }
);


export const NavigationDrawerPadding = createComponent<HTMLDivElement, { opened?: boolean; }>(
  function NavigationDrawerPadding({ opened, style, ...props }, ref) {
    if (opened) {
      style = {
        paddingLeft: "var(--md-navigation-drawer-container-width, 360px)",
        ...style,
      };
    }
    return <div ref={ref} style={style} {...props} />;
  }
);

export type DrawerProps = {
  type?: 'dismissible' | 'modal',
  opened?: boolean,
  pivot?: 'start' | 'end',
  content?: ReactNode;

  /* only work for modal drawer */
  onEscapeKey?: (event: Event) => unknown,
  onScrimClick?: (event: Event) => unknown,
};

export const Drawer = createComponent<HTMLDivElement, DrawerProps>(
  function Drawer({ type, opened, pivot, content, onEscapeKey, onScrimClick, className, children, ...props }, ref) {
    switch (type) {
      case "modal":
        return <div className={classMap({ "rmcw-drawer": true }, className)} {...props}>
          <NavigationDrawerModal opened={opened} onEscapeKey={onEscapeKey} onScrimClick={onScrimClick}>
            {content}
          </NavigationDrawerModal>
          {children}
        </div>;
    }
    return <div className={classMap({ "rmcw-drawer": true }, className)}  {...props}>
      <NavigationDrawer opened={opened}>
        {content}
      </NavigationDrawer>
      <NavigationDrawerPadding opened={opened}>
        {children}
      </NavigationDrawerPadding>
    </div>;
  }
);
