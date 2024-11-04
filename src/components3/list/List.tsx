import { MdList } from "@material/web/list/list";
import { createComponent } from "../../common/Component";
import { MdListComponent } from "./Component";

export type ListProps = {};

export const List = createComponent<MdList, ListProps>(
  function List(props, ref) {
    return <MdListComponent ref={ref as any} {...props} />;
  }
);

export type ListSupportedCssProps = {
  "--md-list-container-color": string,
};
