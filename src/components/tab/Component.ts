import { MDCTab } from "@material/tab";
import { ClassInjector } from "../common/Common";

export class TabComponent extends MDCTab {
  injector: ClassInjector;

  constructor(root: Element, injector: ClassInjector) {
    super(root);
    this.injector = injector;
  }

  override getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    const adapter = foundation['adapter'];
    adapter.addClass = (className) => this.injector.add(className);
    adapter.removeClass = (className) => this.injector.remove(className);
    return foundation;
  }

  override destroy(): void {
    const adapter = this.foundation['adapter'];
    super.destroy();
    adapter.addClass = function () { };
    adapter.removeClass = function () { };
  }
};
