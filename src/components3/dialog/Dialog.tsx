import { createComponent } from "../../components/common/Component";
import { RmcwDialog, RmcwDialogComponent } from "./Component";

export type DialogProps = {
  open?: boolean,
  icon?: React.ReactNode,
  headline?: React.ReactNode,
  actions?: React.ReactNode,
  onEscapeKey?: (e: Event) => unknown,
  onScrimClick?: (e: Event) => unknown,
  //
  type?: "alert",
};

export const Dialog = createComponent<RmcwDialog, DialogProps>(
  function Dialog({ icon, headline, actions, children, ...props }, ref) {
    const mergeChildren = <>
      {icon ? <div slot="icon">{icon}</div> : <></>}
      {headline ? <div slot="headline">{headline}</div> : <></>}
      {children ? <div slot="content">{children}</div> : <></>}
      {actions ? <div slot="actions">{actions}</div> : <></>}
    </>
    return <RmcwDialogComponent ref={ref as any} {...props} >{mergeChildren}</RmcwDialogComponent>;
  }
);
