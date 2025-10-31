/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdFilledTextField } from "@material/web/textfield/filled-text-field";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';
import { createValidator } from "@material/web/labs/behaviors/constraint-validation";
import { TextFieldState, TextFieldValidator } from "@material/web/labs/behaviors/validators/text-field-validator.js";

export class RmcwTextFieldValidator extends TextFieldValidator {
    protected override computeValidity(state: TextFieldState) {
        const value = super.computeValidity(state);

        // 'validationMessage' can't be empty if any validity value is true
        const entries = Object.entries(value.validity);
        if (value.validationMessage === "" && entries.some(v => v[1])) {
            for (const [key, v] of entries) {
                if (v) {
                    value.validationMessage = key;
                    break;
                }
            }
            if (value.validationMessage === "") {
                value.validationMessage = "UnknownInvalidState";
            }
        }
        return value;
    }
}

@customElement('rmcw-filled-text-field')
export class RmcwFilledTextField extends MdFilledTextField {
    constructor() {
        super();
        (this as any).handleInput = (event: InputEvent) => {
            this.value = (event.target as HTMLInputElement).value;
            this.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true, detail: event }));
        };
    }

    override[createValidator]() {
        return new RmcwTextFieldValidator(() => ({
            state: this,
            renderedControl: (this as any).inputOrTextarea,
        }));
    }

    override formStateRestoreCallback(state: string) {
        super.formStateRestoreCallback(state);
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true, detail: null }));
    }

    override reset() {
        super.reset();
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true, detail: null }));
    }
};

@customElement('rmcw-outlined-text-field')
export class RmcwOutlinedTextField extends MdOutlinedTextField {
    constructor() {
        super();
        (this as any).handleInput = (event: InputEvent) => {
            this.value = (event.target as HTMLInputElement).value;
            this.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true, detail: event }));
        };
    }

    override[createValidator]() {
        return new RmcwTextFieldValidator(() => ({
            state: this,
            renderedControl: (this as any).inputOrTextarea,
        }));
    }

    override formStateRestoreCallback(state: string) {
        super.formStateRestoreCallback(state);
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true, detail: null }));
    }

    override reset() {
        super.reset();
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true, detail: null }));
    }
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
