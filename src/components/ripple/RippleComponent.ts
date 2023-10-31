import { MDCRipple, MDCRippleFoundation } from "@material/ripple";
import { supportsCssVariables } from "@material/ripple/util";
import { ClassInjector } from "../common/Common";

const browserCssVarsSupports = supportsCssVariables(window);
export class RippleComponent extends MDCRipple {
  static getBrowserCssVarsSupports() { return browserCssVarsSupports; }

  protected injector: ClassInjector;
  protected computeBoundingRect: undefined | (() => DOMRect);
  protected resizeObserver: ResizeObserver;
  protected _unbounded: { eventTarget: EventTarget } | undefined; // resize event, only unbounded need to listener resize event
  protected _activePort: ActivePort;
  protected _nextFrame: number | null;

  constructor(root: Element,
    injector: ClassInjector,
    computeBoundingRect?: () => DOMRect,
    unbounded: { eventTarget: EventTarget } | undefined = undefined,
    foundation?: MDCRippleFoundation, ...args: unknown[]) {
    super(root, foundation, ...args);
    this.injector = injector;
    this.computeBoundingRect = computeBoundingRect;


    this._activePort = { key: false, mouse: false, pointer: false, touch: false, program: false };
    this._nextFrame = null;

    this.handleActivate = this.handleActivate.bind(this);
    this.handleDeactivate = this.handleDeactivate.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.layout = this.layout.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onPinterUp = this._onPinterUp.bind(this);

    if (unbounded !== undefined) {
      this.resizeObserver = new ResizeObserver(this.layout);
      this.resizeObserver.observe(this.root);
      unbounded.eventTarget.addEventListener('resize', this.layout, { passive: true });
    } else {
      this.resizeObserver = undefined as unknown as ResizeObserver;
    }
    this._unbounded = unbounded;
  }

  // should not change unbounded on fly
  protected override set unbounded(v) {
    throw new Error();
  }

  override get unbounded() {
    return this._unbounded !== undefined;
  }

  override initialSyncWithDOM() { }

  // must be called after constructor
  init() {
    const injector = this.injector;
    const adapter = this.foundation['adapter'];
    adapter.browserSupportsCssVars = RippleComponent.getBrowserCssVarsSupports;
    adapter.addClass = (className) => injector.add(className);
    adapter.removeClass = (className) => injector.remove(className);

    if (this.computeBoundingRect !== undefined) {
      adapter.computeBoundingRect = this.computeBoundingRect;
    }

    adapter.registerInteractionHandler = nullCallback;
    adapter.deregisterInteractionHandler = nullCallback;
    adapter.registerDocumentInteractionHandler = nullCallback;
    adapter.deregisterDocumentInteractionHandler = nullCallback;
    adapter.registerResizeHandler = nullCallback;
    adapter.deregisterResizeHandler = nullCallback;

    MDCRippleFoundation.prototype.init.call(this.foundation);
    super.initialSyncWithDOM();

    if (browserCssVarsSupports) {
      const root = this.root as HTMLElement;
      root.addEventListener('mousedown', this.handleActivate, { passive: true });
      root.addEventListener('touchstart', this.handleActivate, { passive: true });
      root.addEventListener('pointerdown', this.handleActivate, { passive: true });
      root.addEventListener('keydown', this.handleActivate, { passive: true });
      root.addEventListener('keyup', this.handleKeyup, { passive: true });
      root.addEventListener('focus', this.handleFocus, { passive: true });
      root.addEventListener('blur', this.handleBlur, { passive: true });
    }
  }

  protected _onMouseUp() {
    this._activePort.mouse = false;
    document.documentElement.removeEventListener('mouseup', this._onMouseUp);
    this.handleDeactivate();
  }

  protected _onTouchEnd() {
    this._activePort.touch = false;
    document.documentElement.removeEventListener('touchend', this._onTouchEnd);
    this.handleDeactivate();
  }

  protected _onPinterUp() {
    this._activePort.pointer = false;
    document.documentElement.removeEventListener('pointerup', this._onPinterUp);
    this.handleDeactivate();
  }

  protected handleActivate(e: Event) {
    const doc = document.documentElement;
    const isActiveBefore = isActive(this._activePort);
    switch (e.type) {
      case 'mousedown': {
        this._activePort.mouse = true;
        doc.addEventListener('mouseup', this._onMouseUp, { passive: true, once: true });
        break;
      }
      case 'touchstart': {
        this._activePort.touch = true;
        doc.addEventListener('touchend', this._onTouchEnd, { passive: true, once: true });
        break;
      }
      case 'pointerdown': {
        this._activePort.pointer = true;
        doc.addEventListener('pointerup', this._onPinterUp, { passive: true, once: true });
        break;
      }
      case 'keydown': {
        this._activePort.key = true;
        break;
      }
    }
    if (!isActiveBefore) {
      if (this._nextFrame !== null) cancelAnimationFrame(this._nextFrame);
      this._nextFrame = requestAnimationFrame(() => {
        this.foundation.activate(e);
      });
    }
  }

  protected handleDeactivate() {
    const isActiveNow = isActive(this._activePort);
    if (!isActiveNow) {
      if (this._nextFrame !== null) cancelAnimationFrame(this._nextFrame);
      this._nextFrame = requestAnimationFrame(() => {
        this.foundation.deactivate();
      });
    }
  }

  protected handleKeyup() {
    this._activePort.key = false;
    this.handleDeactivate();
  }

  protected handleFocus() {
    this.foundation.handleFocus();
  }

  protected handleBlur() {
    this.foundation.handleBlur();
  }

  override getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    foundation.init = nullCallback;
    return foundation;
  }

  override activate() {
    const isActiveBefore = isActive(this._activePort);
    this._activePort.program = true;
    if (!isActiveBefore) {
      if (this._nextFrame !== null) cancelAnimationFrame(this._nextFrame);
      this._nextFrame = requestAnimationFrame(() => {
        this.foundation.activate();
      });
    }
  }

  override deactivate() {
    this._activePort.program = false;
    this.handleDeactivate();
  }

  override destroy() {
    if (browserCssVarsSupports) {
      const root = this.root as HTMLElement;
      root.removeEventListener('mousedown', this.handleActivate);
      root.removeEventListener('touchstart', this.handleActivate);
      root.removeEventListener('pointerdown', this.handleActivate);
      root.removeEventListener('keydown', this.handleActivate);
      root.removeEventListener('keyup', this.handleKeyup);
      root.removeEventListener('focus', this.handleFocus);
      root.removeEventListener('blur', this.handleBlur);
    }

    const doc = document.documentElement;
    doc.removeEventListener('mouseup', this._onMouseUp);
    doc.removeEventListener('touchend', this._onTouchEnd);
    doc.removeEventListener('pointerup', this._onPinterUp);

    if (this._unbounded) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined as unknown as ResizeObserver;
      this._unbounded.eventTarget.removeEventListener('resize', this.layout);
    }
    super.destroy();

    this.handleActivate = nullCallback;
    this.handleDeactivate = nullCallback;
    this.handleKeyup = nullCallback;
    this.handleFocus = nullCallback;
    this.handleBlur = nullCallback;
    this.layout = nullCallback;
    this._onMouseUp = nullCallback;
    this._onTouchEnd = nullCallback;
    this._onPinterUp = nullCallback;

  }
};

function nullCallback() { }

type ActivePort = {
  key: boolean,
  mouse: boolean,
  pointer: boolean,
  touch: boolean,
  program: boolean,
}

function isActive(p: ActivePort) {
  return p.mouse || p.pointer || p.touch || p.key || p.program;
}
