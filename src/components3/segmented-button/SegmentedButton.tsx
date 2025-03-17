import { createComponent } from "../../common/Component";
import { RmcwOutlinedSegmentedButtonComponent, RmcwOutlinedSegmentedButton } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import "./styles.scss";

export type SegmentedButtonProps = {
  selected?: boolean,
  disabled?: boolean,
  icon?: SlotNode,
};

export const SegmentedButton = createComponent<RmcwOutlinedSegmentedButton, SegmentedButtonProps>(
  function SegmentedButton({ icon, children, ...props }, ref) {
    // @TODO: merge button style
    // const buttonStyle = useContext(SegmentedButtonSetContext);
    return <RmcwOutlinedSegmentedButtonComponent ref={ref} {...props} >
      {icon ? createSlotNode(icon, "icon") : <></>}
      {children}
    </RmcwOutlinedSegmentedButtonComponent>;
  }
);
