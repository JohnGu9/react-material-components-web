import { customElement } from 'lit/decorators.js';
import { MdNavigationDrawerModal } from '@material/web/labs/navigationdrawer/navigation-drawer-modal';
import { MdNavigationDrawer } from '@material/web/labs/navigationdrawer/navigation-drawer';
import { createComponent } from '@lit/react';
import React from 'react';
import { css } from 'lit';

const modalStyle = css`
:host {
    --_scrim-color: var(--md-navigation-drawer-modal-scrim-color, #000000);
}
`;

@customElement('rmcw-navigation-drawer-modal')
export class RmcwNavigationDrawerModal extends MdNavigationDrawerModal {
    static override styles = [...MdNavigationDrawerModal.styles, modalStyle];
    constructor() {
        super();
        (this as any).handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                this.dispatchEvent(new CustomEvent("escape-key", { detail: event }));
            }
        };
        (this as any).handleScrimClick = () => {
            this.dispatchEvent(new CustomEvent("scrim-click"));
        };
    }
}

export const RmcwNavigationDrawerModalComponent = createComponent({
    tagName: 'rmcw-navigation-drawer-modal',
    elementClass: RmcwNavigationDrawerModal,
    react: React,
    events: {
        onEscapeKey: "escape-key",
        onScrimClick: "scrim-click",
    }
});

const style = css`
:host {
    bottom: 0;
    top: 0;
}
`;

@customElement('rmcw-navigation-drawer')
export class RmcwNavigationDrawer extends MdNavigationDrawer {
    static override styles = [...MdNavigationDrawer.styles, style];
};

export const RmcwNavigationDrawerComponent = createComponent({
    tagName: 'rmcw-navigation-drawer',
    elementClass: RmcwNavigationDrawer,
    react: React,
});
