import React from "react";
import { classMap, createComponent, useSizeObserver } from "../common/Common";
import "./style.scss";

export type MenuProps = {
  open?: boolean,
  anchorCorner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  anchorQuadrant?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  quick?: boolean,
  fullWidth?: boolean,
  surface?: React.ReactNode,
};

export const Menu = createComponent<HTMLDivElement, MenuProps>(
  function Menu({
    open,
    anchorCorner,
    anchorQuadrant,
    quick,
    fullWidth,
    surface,
    children,
    className,
    ...props
  }, ref) {
    const classes = { 'mdc-menu-surface--anchor': true };
    return (
      <div ref={ref}
        className={classMap(classes, className)} {...props}>
        {children}
        <MenuSurface open={open}
          fullWidth={fullWidth}
          quick={quick}
          anchorCorner={anchorCorner}
          anchorQuadrant={anchorQuadrant}>
          {surface}
        </MenuSurface>
      </div>
    );
  }
);

type VerticalAlignment = 'top' | 'bottom';
type HorizontalAlignment = 'left' | 'right';

type BodyProps = {
  children?: React.ReactNode,
};

function MenuSurface({
  quick = false,
  open = false,
  fullWidth = false,
  anchorCorner = 'bottom-left',
  anchorQuadrant = 'bottom-right',
  children,
}: MenuProps & BodyProps) {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [closed, setClosed] = React.useState(!open);
  const size = useSizeObserver(element);

  const hasSize =
    size.height !== undefined && size.height !== 0 &&
    size.width !== undefined && size.width !== 0;

  const classes = {
    'mdc-menu-surface': true,
    'mdc-menu-surface--fixed': false,
    'mdc-menu-surface--no-fullwidth': !fullWidth,
    'mdc-menu-surface--fullwidth': fullWidth,
    'mdc-menu-surface--open': open,
    'open-animation': !quick && open && hasSize,
    'close-animation': !quick && !open && !closed,
  };

  React.useEffect(() => {
    if (!open) {
      if (quick) {
        setClosed(true);
      } else {
        const timer = setTimeout(() => setClosed(true), 75);
        return () => clearTimeout(timer);
      }
    } else if (open) {
      setClosed(false);
    }
  }, [open, quick]);

  const [verticalAlignment, horizontalAlignment] = ((): [VerticalAlignment, HorizontalAlignment] => {
    switch (anchorCorner) {
      case 'top-left':
        return ['top', 'left'];
      case 'top-right':
        return ['top', 'right'];
      case 'bottom-left':
        return ['bottom', 'left'];
      case 'bottom-right':
        return ['bottom', 'right'];
    }
  })();

  const transformOrigin = (() => {
    switch (anchorQuadrant) {
      case 'top-left':
        return 'bottom right';
      case 'top-right':
        return 'bottom left';
      case 'bottom-left':
        return 'top right';
      case 'bottom-right':
        return 'top left';
    }
  })();

  const vertical = (() => {
    switch (verticalAlignment) {
      case 'top': {
        switch (anchorQuadrant) {
          case 'top-left':
          case 'top-right':
            return -(size?.height ?? 0);
          case 'bottom-left':
          case 'bottom-right':
            return 0;
        }
        break;
      }
      case 'bottom': {
        switch (anchorQuadrant) {
          case 'top-left':
          case 'top-right':
            return 0;
          case 'bottom-left':
          case 'bottom-right':
            return -(size?.height ?? 0);
        }
      }
    }
  })();
  const horizontal = (() => {
    switch (horizontalAlignment) {
      case 'left': {
        switch (anchorQuadrant) {
          case 'top-left':
          case 'bottom-left':
            return -(size?.width ?? 0);
          case 'top-right':
          case 'bottom-right':
            return 0;
        }
        break;
      }
      case 'right': {
        switch (anchorQuadrant) {
          case 'top-left':
          case 'bottom-left':
            return 0;
          case 'top-right':
          case 'bottom-right':
            return -(size?.width ?? 0);
        }
      }
    }
  })();

  return (
    <div ref={setElement}
      className={classMap(classes)}
      style={{
        opacity: open ? (hasSize ? undefined : 0) : undefined,
        transformOrigin,
        [verticalAlignment]: vertical,
        [horizontalAlignment]: horizontal,
      }}
      data-quadrant={anchorQuadrant}>
      {children}
    </div>
  );
}
