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
  protected _unbounded: boolean;
  protected eventTarget: EventTarget;

  constructor(root: Element,
    injector: ClassInjector,
    eventTarget: EventTarget,
    computeBoundingRect?: () => DOMRect,
    unbounded: boolean = false,
    foundation?: MDCRippleFoundation, ...args: unknown[]) {
    super(root, foundation, ...args);
    this.injector = injector;
    this.eventTarget = eventTarget;
    this.computeBoundingRect = computeBoundingRect;
    this._unbounded = unbounded;
    this.resizeObserver = new ResizeObserver(frame => {
      for (const listener of this.resizeListeners)
        listener();
    });
  }

  protected set unbounded(v) { }

  get unbounded() {
    return this._unbounded;
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
      this.eventTarget.addEventListener('resize', listener as () => unknown);
      // window.addEventListener('resize', listener);
    };
    adapter.deregisterResizeHandler = (listener) => {
      // window.removeEventListener('resize', listener);
      this.eventTarget.removeEventListener('resize', listener as () => unknown);
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
