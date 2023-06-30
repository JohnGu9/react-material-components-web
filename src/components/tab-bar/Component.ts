import { MDCTabBar } from "@material/tab-bar";

export type State = {
  onSelected?: (index: number) => any,
};

export class TabBarComponent extends MDCTabBar {
  state: State;
  constructor(root: Element, state: State) {
    super(root);
    this.state = state;
  }
  getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    const adapter = foundation['adapter'];
    adapter.setActiveTab = (index) => { if (index !== -1) this.state.onSelected?.(index); };
    return foundation;
  }
};
