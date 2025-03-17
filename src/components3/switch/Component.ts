/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdSwitch } from "@material/web/switch/switch";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';

@customElement('rmcw-switch')
export class RmcwSwitch extends MdSwitch {
    constructor() {
        super();
        (this as any).handleInput = function (event: Event) {
            const target = event.target as HTMLInputElement;
            target.checked = this.selected;
        };
    }

    formResetCallback(): void { }
    formStateRestoreCallback(): void { }
};

export const RmcwSwitchComponent = createComponent({
    tagName: 'rmcw-switch',
    elementClass: RmcwSwitch,
    react: React,
});
