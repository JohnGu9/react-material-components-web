import { MdCheckbox } from "@material/web/checkbox/checkbox";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';

@customElement('rmcw-checkbox')
export class RmcwCheckbox extends MdCheckbox {
    constructor() {
        super();
        (this as any).handleInput = function (event: Event) {
            const target = event.target as HTMLInputElement;
            target.checked = this.checked;
            target.indeterminate = this.indeterminate;
        };
    }

    override formResetCallback(): void { }
    override formStateRestoreCallback(state: string): void { }
};

export const RmcwCheckboxComponent = createComponent({
    tagName: 'rmcw-checkbox',
    elementClass: RmcwCheckbox,
    react: React,
});
