import { RmcwOutlinedSegmentedButtonSetComponent, RmcwOutlinedSegmentedButtonSet, SegmentedButtonSetContext, SegmentedButtonStyle } from "./Component";
import { createComponent } from "../../common/Component";
import "./styles.scss";

export type SegmentedButtonSetProps = {
  segmentedButtonStyle?: SegmentedButtonStyle,
};

export const SegmentedButtonSet = createComponent<RmcwOutlinedSegmentedButtonSet, SegmentedButtonSetProps>(
  function SegmentedButtonSet({ segmentedButtonStyle, ...props }, ref) {
    return (
      <SegmentedButtonSetContext.Provider value={segmentedButtonStyle}>
        <RmcwOutlinedSegmentedButtonSetComponent ref={ref} {...props} />
      </SegmentedButtonSetContext.Provider>);
  }
);
