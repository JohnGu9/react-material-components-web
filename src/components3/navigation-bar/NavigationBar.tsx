import { createComponent } from "../../common/Component";
import { RmcwNavigationBarComponent, RmcwNavigationBar, InteractionEvent } from "./Component";

export type NavigationBarProps = {
  activeIndex?: number,
  onInteraction?: (event: InteractionEvent) => unknown,
};

export const NavigationBar = createComponent<RmcwNavigationBar, NavigationBarProps>(
  function NavigationBar({ activeIndex = 0, onInteraction, ...props }, ref) {
    return <RmcwNavigationBarComponent ref={ref} activeIndex={activeIndex} onInteraction={onInteraction as (e: Event) => void} {...props} />;
  }
);
