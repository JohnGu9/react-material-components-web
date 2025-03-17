import { MdList } from "@material/web/list/list";
import { createComponent } from "../../common/Component";
import { MdListComponent } from "./Component";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ListProps = {};

export const List = createComponent<MdList, ListProps>(
  function List(props, ref) {
    return <MdListComponent ref={ref} {...props} />;
  }
);

export type ListSupportedCssProps = {
  "--md-list-container-color": string,
};
