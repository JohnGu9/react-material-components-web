/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdRadio } from "@material/web/radio/radio";
import { SingleSelectionController } from "@material/web/radio/internal/single-selection-controller";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';

@customElement('rmcw-radio')
export class RmcwRadio extends MdRadio {
    constructor() {
        super();
        this.addEventListener('click', e => e.preventDefault(), { capture: true }); // block `handleClick` callback
        this.removeController((this as any).selectionController);
        (this as any).selectionController = new RmcwSingleSelectionController(this);
    }

    override formResetCallback(): void { }
    override formStateRestoreCallback(): void { }
};

class RmcwSingleSelectionController extends SingleSelectionController {
    override hostConnected(): void { }
    override hostDisconnected(): void { }
    override handleCheckedChange(): void { }
};

export const RmcwRadioComponent = createComponent({
    tagName: 'rmcw-radio',
    elementClass: RmcwRadio,
    react: React,
});
