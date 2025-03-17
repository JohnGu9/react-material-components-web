import "@material/web/chips/chip-set";
import { MdChipSet } from "@material/web/chips/chip-set";
import { createComponent } from "../../common/Component";
import { MdChipSetComponent } from "./Component";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ChipSetProps = {};
export const ChipSet = createComponent<MdChipSet, ChipSetProps>(
  function ChipSet(props, ref) {
    return <MdChipSetComponent ref={ref} {...props} />;
  }
); 
