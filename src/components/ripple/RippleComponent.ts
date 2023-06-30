import { MDCRipple, MDCRippleFoundation } from "@material/ripple";
import { supportsCssVariables } from "@material/ripple/util";
import { ClassInjector } from "../common/Common";

const browserCssVarsSupports = supportsCssVariables(window);
export class RippleComponent extends MDCRipple {
  static getBrowserCssVarsSupports() { return browserCssVarsSupports; }
  protected injector: ClassInjector;
  protected computeBoundingRect: undefined | (() => DOMRect)

  constructor(root: Element, injector: ClassInjector,
    computeBoundingRect?: () => DOMRect,
    foundation?: MDCRippleFoundation, ...args: unknown[]) {
    super(root, foundation, ...args);
    this.injector = injector;
    this.computeBoundingRect = computeBoundingRect;
  }

  initialSyncWithDOM(): void { }

  init() {
    const injector = this.injector;
    const adapter = this.foundation['adapter'];
    adapter.browserSupportsCssVars = RippleComponent.getBrowserCssVarsSupports;
    adapter.addClass = (className) => injector.add(className);
    adapter.removeClass = (className) => injector.remove(className);
    if (this.computeBoundingRect !== undefined)
      adapter.computeBoundingRect = this.computeBoundingRect;
    MDCRippleFoundation.prototype.init.call(this.foundation);
    super.initialSyncWithDOM();
  }

  getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    foundation.init = nullCallback;
    return foundation;
  }
};

function nullCallback() { }
