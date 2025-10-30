/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdFilledTextField } from "@material/web/textfield/filled-text-field";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';

@customElement('rmcw-filled-text-field')
export class RmcwFilledTextField extends MdFilledTextField {
    constructor() {
        super();
        (this as any).handleInput = (event: InputEvent) => {
            const preValue = this.value;
            this.value = (event.target as HTMLInputElement).value;
            event.preventDefault();
            this.newDirty = true;
            this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            if (this.newDirty) {
                this.value = preValue; // @FIX: react19 onChange may be called before this line
            }
        };
    }

    protected newDirty = false;

    protected override updated(): void {
        this.newDirty = false;
        (this as any).getInputOrTextarea().value = this.value; // @FIX: react19 onChange may be called before this line
    }

    override reset(): void { }
    override formResetCallback(): void { }
    override formStateRestoreCallback(): void { }
    override stepDown(): void { }
    override stepUp(): void { }
};

@customElement('rmcw-outlined-text-field')
export class RmcwOutlinedTextField extends MdOutlinedTextField {
    constructor() {
        super();
        (this as any).handleInput = (event: InputEvent) => {
            const preValue = this.value;
            this.value = (event.target as HTMLInputElement).value;
            event.preventDefault();
            this.newDirty = true;
            this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            if (this.newDirty) {
                this.value = preValue; // @FIX: react19 onChange may be called before this line
            }
        };
    }

    protected newDirty = false;

    protected override updated(): void {
        this.newDirty = false;
        (this as any).getInputOrTextarea().value = this.value; // @FIX: react19 onChange may be called before this line
    }

    override formResetCallback(): void { }
    override formStateRestoreCallback(): void { }
    override stepDown(): void { }
    override stepUp(): void { }
};


export const RmcwFilledTextFieldComponent = createComponent({
    tagName: 'rmcw-filled-text-field',
    elementClass: RmcwFilledTextField,
    react: React,
    events: {
        onChange: "change",
        onSelect: "select",
    }
});

export const RmcwOutlinedTextFieldComponent = createComponent({
    tagName: 'rmcw-outlined-text-field',
    elementClass: RmcwOutlinedTextField,
    react: React,
    events: {
        onChange: "change",
        onSelect: "select",
    }
});
