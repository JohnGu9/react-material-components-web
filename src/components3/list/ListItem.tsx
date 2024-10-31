import { ListItemType, MdListItem } from "@material/web/list/list-item";
import { createComponent } from "../../components/common/Component";
import { MdListItemComponent } from "./Component";

export type ListItemProps = {
  start?: React.ReactNode,
  end?: React.ReactNode,
  headline?: React.ReactNode,
  supportingText?: React.ReactNode,
  //
  target?: '_blank' | '_parent' | '_self' | '_top' | '',
  type?: ListItemType,
};

export const ListItem = createComponent<MdListItem, ListItemProps>(
  function List({ start, end, headline, supportingText, children, ...props }, ref) {
    return <MdListItemComponent ref={ref as any} {...props} >
      {children}
      <div slot="start">{start}</div>
      <div slot="end">{end}</div>
      <div slot="headline">{headline}</div>
      <div slot="supporting-text">{supportingText}</div>
    </MdListItemComponent>;
  }
);
