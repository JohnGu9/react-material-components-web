import { MDCDialog, strings } from "@material/dialog";
import { ClassInjector } from "../../common/Common";

export type State = {
  onScrimClick?: (evt: MouseEvent) => unknown;
  onEscapeKey?: (evt: KeyboardEvent) => unknown;
};

export class DialogComponent extends MDCDialog {
  state: State;
  injector: ClassInjector;

  set escapeKeyAction(action: string) {
    throw Error();
  }

  set scrimClickAction(action: string) {
    throw Error();
  }

  set autoStackButtons(autoStack: boolean) {
    throw Error();
  }

  constructor(root: Element, state: State, injector: ClassInjector) {
    super(root);
    this.state = state;
    this.injector = injector;
    this.foundation.setAutoStackButtons(false);
  }

  override getDefaultFoundation() {
    const foundation = super.getDefaultFoundation();
    const adapter = foundation['adapter'];
    adapter.reverseButtons = nullCallback;
    adapter.trapFocus = nullCallback;
    adapter.releaseFocus = nullCallback;
    adapter.addClass = (className) => this.injector.add(className);
    adapter.removeClass = (className) => this.injector.remove(className)
    foundation.handleClick = (evt) => {
      const isScrim = adapter.eventTargetMatches(evt.target, strings.SCRIM_SELECTOR);
      // Check for scrim click first since it doesn't require querying ancestors.
      if (isScrim) this.state.onScrimClick?.(evt);
    };
    foundation.handleDocumentKeydown = (evt) => {
      const isEscape = evt.key === 'Escape' || evt.keyCode === 27;
      if (isEscape) this.state.onEscapeKey?.(evt);
    };
    return foundation;
  }

};

function nullCallback() { }
