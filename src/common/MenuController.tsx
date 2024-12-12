import React from "react";

export enum MenuCloseReason {
    MenuFocusout,
    OutsideClick,
    ClosableKey,
};

export class MenuController {
    protected _setOpen: (open: boolean) => unknown;
    constructor(setOpen: (open: boolean) => unknown) {
        this._setOpen = setOpen;
    }

    open() { this._setOpen(true); }
    close(reason?: MenuCloseReason, event?: Event) {
        if (this.shouldCloseMenu(reason, event)) {
            this._setOpen(false);
        }
    }

    // whether or not close menu
    // replace this value to custom your controller close menu behavior
    shouldCloseMenu = (reason?: MenuCloseReason, event?: Event) => {
        return true;
    };
};

export function useMenuController() {
    const ref = React.useRef<HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const controller = React.useMemo(() => new MenuController(setOpen), []);

    React.useEffect(() => {
        if (open) {
            const onFocusIn = (event: FocusEvent) => {
                if (ref.current?.contains(document.activeElement) !== true) {
                    controller.close(MenuCloseReason.MenuFocusout, event);
                }
            };
            const onClick = (event: MouseEvent) => {
                const { current } = ref;
                const { target } = event;
                if (current !== null && target instanceof Node && !current.contains(target)) {
                    if (current.contains(document.activeElement)) {
                        const { activeElement } = document;
                        if (activeElement instanceof HTMLElement) {
                            activeElement.blur();
                        }
                    }
                    controller.close(MenuCloseReason.OutsideClick, event);
                }
            };
            window.addEventListener('focusin', onFocusIn, { passive: true });
            window.addEventListener('click', onClick, { passive: true });
            return () => {
                window.removeEventListener('focusin', onFocusIn);
                window.removeEventListener('click', onClick);
            };
        }
    }, [controller, open]);

    React.useEffect(() => {
        const { current } = ref;
        if (current) {
            const onKeydown = (e: KeyboardEvent) => {
                if (e.key === 'Escape' || e.keyCode === 27) {
                    controller.close(MenuCloseReason.ClosableKey, e);
                }
            };
            current.addEventListener("keydown", onKeydown, { passive: true });
            return () => {
                current.removeEventListener("keydown", onKeydown);
            };
        }
    }, [controller]);

    return { controller, props: { ref: ref as any, open } };
}
