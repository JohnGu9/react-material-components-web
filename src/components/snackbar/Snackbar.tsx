import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { ButtonContext } from "../button/Button";
import { createComponent, isDefined, useClassInjector } from "../../common/Common";
import { IconButtonContext } from "../icon-button/IconButton";
import { SnackbarComponent, strings } from "./Component";
import { RippleEventTarget } from "../ripple/Ripple";
import { ThemeContext, themeDataToCSSProperties } from "../theme/Theme";

export type SnackbarProps = {
  open?: boolean,
  leading?: boolean,
  stacked?: boolean,
  action?: React.ReactNode,
  onAction?: () => unknown,
  onDismiss?: () => unknown,
};

export const Snackbar = createComponent<HTMLElement, SnackbarProps>(
  function Snackbar({
    open,
    leading = false,
    stacked = false,
    action,
    onAction,
    onDismiss,
    className,
    children,
    style,
    ...props
  }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLElement>(null);
    const injector = useClassInjector(innerRef);
    const [component, setComponent] = React.useState<SnackbarComponent>();
    const eventTarget = React.useMemo(() => new EventTarget(), []);
    const themeContext = React.useContext(ThemeContext);

    injector.with('mdc-snackbar', true);
    injector.with('mdc-snackbar--leading', leading);
    injector.with('mdc-snackbar--stacked', stacked);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new SnackbarComponent(innerRef.current!, injector);
      const listener = () => {
        eventTarget.dispatchEvent(new Event('resize'));
      };
      component.listen(strings.OPENED_EVENT, listener);
      setComponent(component);
      return () => {
        component.unlisten(strings.OPENED_EVENT, listener);
        component.destroy();
      };
    }, [eventTarget, injector]);

    React.useEffect(() => {
      if (component)
        if (open) component.open();
        else component.close();
    }, [component, open]);

    const mergeStyle = React.useMemo(() => {
      if (themeContext === null) return style;
      return { ...themeDataToCSSProperties(themeContext?.reverseTheme), ...style };
    }, [style, themeContext]);

    return (
      <RippleEventTarget.Provider value={eventTarget}>
        <aside ref={composeRefs(innerRef, ref)}
          className={injector.toClassName()}
          style={mergeStyle}
          {...props}>
          <div className="mdc-snackbar__surface" role="status" aria-relevant="additions"
            onKeyDown={evt => {
              const isEscapeKey = evt.key === 'Escape' || evt.keyCode === 27;
              if (isEscapeKey) onDismiss?.();
            }}>
            <div className="mdc-snackbar__label" aria-atomic="false">
              {children}
            </div>
            {isDefined(action)
              ? <div className="mdc-snackbar__actions" aria-atomic="true">
                <ButtonContext.Provider value={{
                  className: 'mdc-snackbar__action',
                  onClick: evt => onAction?.(),
                }}>
                  <IconButtonContext.Provider value={{
                    className: 'mdc-snackbar__action',
                    onClick: evt => onDismiss?.(),
                  }}>
                    {action}
                  </IconButtonContext.Provider>
                </ButtonContext.Provider>
              </div>
              : undefined}
          </div>
        </aside>
      </RippleEventTarget.Provider>
    );
  }
);

type Props = {
  children?: React.ReactNode,
  action?: React.ReactNode,
  onAction?: () => unknown,
  onDismiss?: () => unknown,
};

type SetProps = (props: { open: boolean; } & Props) => unknown;

type QueueElement = {
  props: Props,
  duration: number,
  immediatelyCancelCurrent: boolean,
};

export class SnackbarController {
  protected _setProps: SetProps;
  protected _open = false;
  protected _openTimer = -1;
  protected _isClosing = false;
  protected _closingTimer = -1;
  protected _queue: QueueElement[] = [];

  constructor(setProps: SetProps) {
    this._setProps = setProps;
  }

  get isOpened() { return this._open; }

  post(props: {
    children?: React.ReactNode,
    action?: React.ReactNode,
    onAction?: () => unknown,
    onDismiss?: () => unknown,
  },
    immediatelyCancelCurrent = false, // whether or not post new message as quick as possible
    duration = 1500, // for android standard, short duration = 1500 and long duration = 2750
  ) {
    this._queue.push({ props, duration, immediatelyCancelCurrent });
    this._startPost();
  }

  protected get _minOpenDuration() { return 350; }

  protected _startPost() {
    const immediatelyCancelCurrent = this._queue.slice(1).find(e => e.immediatelyCancelCurrent) !== undefined;
    if (immediatelyCancelCurrent && this._open) {
      window.clearTimeout(this._openTimer);
      this._closeCallback();
      return;
    }
    if (this._queue.length === 0 || this._open || this._isClosing) return;
    this._open = true;
    const queueElement = this._queue[0];
    const openDuration = immediatelyCancelCurrent ? this._minOpenDuration : Math.max(queueElement.duration, this._minOpenDuration);
    this._openTimer = window.setTimeout(() => this._closeCallback(), openDuration);
    this._setProps({
      open: this._open,
      ...queueElement.props,
    });
  }

  protected get _closeDuration() { return 350; }

  protected _closeCallback() {
    this._open = false;
    this._isClosing = true;
    this._closingTimer = window.setTimeout(() => this._closedCallback(), this._closeDuration);
    const queueElement = this._queue[0];
    this._setProps({
      open: this._open,
      ...queueElement.props,
    });
  }

  protected _closedCallback() {
    this._isClosing = false;
    this._queue.shift();
    this._startPost();
  }
};

export function useSnackbarController() {
  const [props, setProps] = React.useState<{ open: boolean; } & Props>({ open: false });
  const controller = React.useMemo(() => new SnackbarController(setProps), []);
  return { controller, props };
}
