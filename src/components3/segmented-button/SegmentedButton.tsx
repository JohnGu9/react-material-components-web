import { createComponent } from "../../common/Component";
import { RmcwOutlinedSegmentedButtonComponent, RmcwOutlinedSegmentedButton, SegmentedButtonStyle } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import "./styles.scss";

export type SegmentedButtonProps = {
  selected?: boolean,
  disabled?: boolean,
  icon?: SlotNode,
  segmentedButtonStyle?: SegmentedButtonStyle,
};

export const SegmentedButton = createComponent<RmcwOutlinedSegmentedButton, SegmentedButtonProps>(
  function SegmentedButton({ segmentedButtonStyle, icon, children, ref: _, ...props }, ref) {
    // @TODO: merge button style
    // const buttonStyle = useContext(SegmentedButtonSetContext);
    return <RmcwOutlinedSegmentedButtonComponent ref={ref} {...props} >
      {createSlotNode(icon, "icon")}
      {children}
    </RmcwOutlinedSegmentedButtonComponent>;
  }
);
