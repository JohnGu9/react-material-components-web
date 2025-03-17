/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdMenu } from "@material/web/menu/menu";
import { MdMenuItem } from "@material/web/menu/menu-item";
import { MdSubMenu } from "@material/web/menu/sub-menu";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';
import { isClosableKey, isElementInSubtree } from "@material/web/menu/internal/controllers/shared";

@customElement('rmcw-menu')
export class RmcwMenu extends MdMenu {
    constructor() {
        super();
        (this as any).onDocumentClick = (event: Event) => {
            if (!this.open) {
                return;
            }

            const path = event.composedPath();
            if (!path.includes(this) && !path.includes(this.anchorElement!)) {
                this.dispatchEvent(new CustomEvent("outside-click", { detail: event }))
            }
        };

        this.removeEventListener('focusout', (this as any).handleFocusout);
        (this as any).handleFocusout = (event: FocusEvent) => {
            const anchorEl = this.anchorElement!;
            const pointerPath: EventTarget[] = (this as any).pointerPath;
            // Do not close if we focused out by clicking on the anchor element. We
            // can't assume anchor buttons can be the related target because of iOS does
            // not focus buttons.
            if (!this.open || pointerPath.includes(anchorEl)) {
                return;
            }

            if (event.relatedTarget) {
                // Don't close the menu if we are switching focus between menu,
                // md-menu-item, and md-list or if the anchor was click focused, but check
                // if length of pointerPath is 0 because that means something was at least
                // clicked (shift+tab case).
                if (
                    isElementInSubtree(event.relatedTarget, this) ||
                    (pointerPath.length !== 0 &&
                        isElementInSubtree(event.relatedTarget, anchorEl))
                ) {
                    return;
                }
            } else if (pointerPath.includes(this)) {
                // If menu tabindex == -1 and the user clicks on the menu or a divider, we
                // want to keep the menu open.
                return;
            }

            this.dispatchEvent(new CustomEvent("menu-focusout", { detail: event }));
        };
        this.addEventListener('focusout', (this as any).handleFocusout);

        this.removeEventListener('keydown', (this as any).captureKeydown);
        (this as any).captureKeydown = (event: KeyboardEvent) => {
            if (
                event.target === this &&
                !event.defaultPrevented &&
                isClosableKey(event.code)
            ) {
                this.dispatchEvent(new CustomEvent("closable-key", { detail: event }));
            }
            this.typeaheadController.onKeydown(event);
        }
        this.addEventListener('keydown', (this as any).captureKeydown, { capture: true });

        (this as any).handleStayOpenOnFocusout = () => { };
        (this as any).handleCloseOnFocusout = () => { };
        (this as any).onCloseMenu = (event: Event) => {
            if (!event.defaultPrevented) {
                this.dispatchEvent(new CustomEvent("closable-key", { detail: event }));
            }
        };
    }

};

export const MdMenuComponent = createComponent({
    tagName: 'md-menu',
    elementClass: MdMenu,
    react: React,
});


export const RmcwMenuComponent = createComponent({
    tagName: 'rmcw-menu',
    elementClass: RmcwMenu,
    react: React,
    events: {
        onOutsideClick: "outside-click",
        onMenuFocusout: "menu-focusout",
        onClosableKey: "closable-key",
    }
});

export const MdMenuItemComponent = createComponent({
    tagName: 'md-menu-item',
    elementClass: MdMenuItem,
    react: React,
});

export const MdSubMenuComponent = createComponent({
    tagName: 'md-sub-menu',
    elementClass: MdSubMenu,
    react: React,
});
