import { MDCRipple, MDCRippleFoundation } from "@material/ripple";
import { supportsCssVariables } from "@material/ripple/util";
import { ClassInjector } from "../common/Common";

const browserCssVarsSupports = supportsCssVariables(window);
export class RippleComponent extends MDCRipple {
  static getBrowserCssVarsSupports() { return browserCssVarsSupports; }
  protected injector: ClassInjector;
  protected computeBoundingRect: undefined | (() => DOMRect);
  protected resizeObserver: ResizeObserver;
  protected resizeListeners: (() => unknown)[] = [];

  constructor(root: Element, injector: ClassInjector,
    computeBoundingRect?: () => DOMRect,
    foundation?: MDCRippleFoundation, ...args: unknown[]) {
    super(root, foundation, ...args);
    this.injector = injector;
    this.computeBoundingRect = computeBoundingRect;
    this.resizeObserver = new ResizeObserver(frame => {
      for (const listener of this.resizeListeners)
        listener();
    });
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

    adapter.registerResizeHandler = (listener) => {
      if (this.resizeListeners.length === 0) {
        this.resizeObserver.observe(this.root);
      }
      this.resizeListeners.push(listener as () => unknown);
    };
    adapter.deregisterResizeHandler = (listener) => {
      this.resizeListeners = this.resizeListeners.filter(v => v !== listener);
      if (this.resizeListeners.length === 0) {
        this.resizeObserver.unobserve(this.root);
      }
    };
    MDCRippleFoundation.prototype.init.call(this.foundation);
    super.initialSyncWithDOM();
  }

  getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    foundation.init = nullCallback;
    return foundation;
  }

  override destroy(): void {
    this.resizeObserver.disconnect();
    this.resizeListeners = [];
    super.destroy();
  }
};

function nullCallback() { }
