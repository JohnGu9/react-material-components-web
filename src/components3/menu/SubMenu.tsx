import { MdSubMenu } from "@material/web/menu/sub-menu";
import { createComponent } from "../../common/Component";
import { MdMenuComponent, MdSubMenuComponent } from "./Component";
import { Corner } from "@material/web/menu/menu";
import React from "react";
import { MenuContext } from "./Menu";
import { createSlotNode, SlotNode } from "../common/SlotNode";

// programer can;t control the `SubMenu` show and close
// `SubMenu` will automatically show when user hover on the `children`
// and automatically close when user no longer hover on the `surface`

export type SubMenuProps = {
  anchorCorner?: Corner,
  menuCorner?: Corner,
  hoverOpenDelay?: number,
  hoverCloseDelay?: number,
  surface?: React.ReactNode,
  children?: SlotNode;
};

export const SubMenu = createComponent<MdSubMenu, SubMenuProps>(
  function SubMenu({ surface, children, ...props }, ref) {
    const ctx = React.useContext(MenuContext);
    React.useEffect(() => {
      ctx.registerSubMenu();
      return () => ctx.deregisterSubMenu();
    }, [ctx]);
    return (
      <MdSubMenuComponent ref={ref} {...props} >
        {children ? createSlotNode(children, "item") : <></>}
        <MdMenuComponent slot="menu">
          {surface}
        </MdMenuComponent>
      </MdSubMenuComponent>);
  }
);
