import { MdDialog } from "@material/web/dialog/dialog";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';

@customElement('rmcw-dialog')
export class RmcwDialog extends MdDialog {
    constructor() {
        super();
        this.removeEventListener('submit', (this as any).handleSubmit);
        (this as any).handleCancel = (e: Event) => { e.preventDefault(); };
        (this as any).handleClose = () => { this.close(); };
        (this as any).handleDialogClick = (event: Event) => {
            if (event.target === (this as any).dialog) {
                this.dispatchEvent(new CustomEvent("scrim-click", { detail: event }));
            }
        };
        (this as any).handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                this.dispatchEvent(new CustomEvent("escape-key", { detail: event }));
                return;
            }
        };
    }

    override close(returnValue?: string) {
        return super.close(returnValue)
    }
};

export const RmcwDialogComponent = createComponent({
    tagName: 'rmcw-dialog',
    elementClass: RmcwDialog,
    react: React,
    events: {
        onEscapeKey: 'escape-key',
        onScrimClick: 'scrim-click',
    }
});
