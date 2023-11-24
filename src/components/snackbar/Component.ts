import { MDCSnackbar, numbers, strings } from "@material/snackbar";
import { MDCComponent } from "@material/base/component";
import { ClassInjector } from "../common/Common";

export { strings };

export class SnackbarComponent extends MDCSnackbar {
  injector: ClassInjector;
  constructor(element: Element, injector: ClassInjector) {
    super(element);
    this.injector = injector;
  }

  override initialSyncWithDOM(): void {
    this.foundation.setTimeoutMs(numbers.INDETERMINATE);
    this['labelEl'] = this.root.querySelector(strings.LABEL_SELECTOR)!;
  }

  override destroy(): void {
    const adapter = this.foundation['adapter'];
    MDCComponent.prototype.destroy.call(this);
    adapter.addClass = function () { };
    adapter.removeClass = function () { };
  }

  override getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    const adapter = foundation['adapter'];
    adapter.addClass = (className) => this.injector.add(className);
    adapter.removeClass = (className) => this.injector.remove(className);
    return foundation;
  }
};
