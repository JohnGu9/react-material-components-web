/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdFilledSelect } from "@material/web/select/filled-select";
import { MdOutlinedSelect } from "@material/web/select/outlined-select";
import { MdSelectOption } from "@material/web/select/select-option";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';
import { onReportValidity } from "@material/web/labs/behaviors/on-report-validity";

@customElement('rmcw-filled-select')
export class RmcwFilledSelect extends MdFilledSelect {
    constructor() {
        super();
        (this as any).updateValueAndDisplayText = () => { };
        (this as any).selectItem = () => { };
    }

    override select(): void { }
    override selectIndex(): void { }
    override reset(): void { }
    override[onReportValidity]() { }
    override formResetCallback(): void { }
    override formStateRestoreCallback(): void { }
};

export const RmcwFilledSelectComponent = createComponent({
    tagName: 'rmcw-filled-select',
    elementClass: RmcwFilledSelect,
    react: React,
});

@customElement('rmcw-outlined-select')
export class RmcwOutlinedSelect extends MdOutlinedSelect {
    constructor() {
        super();
        (this as any).updateValueAndDisplayText = () => { };
        (this as any).selectItem = () => { };
    }

    override select(): void { }
    override selectIndex(): void { }
    override reset(): void { }
    override[onReportValidity]() { }
    override formResetCallback(): void { }
    override formStateRestoreCallback(): void { }
};

export const RmcwOutlinedSelectComponent = createComponent({
    tagName: 'rmcw-outlined-select',
    elementClass: RmcwOutlinedSelect,
    react: React,
});


export const MdSelectOptionComponent = createComponent({
    tagName: 'md-select-option',
    elementClass: MdSelectOption,
    react: React,
});


export type SelectBaseProps = {
    quick?: boolean,
    required?: boolean,
    error?: boolean,
    errorText?: string,
    label?: string,
    noAsterisk?: boolean,
    supportingText?: string,
    menuPositioning?: 'absolute' | 'fixed' | 'popover',
    clampMenuWidth?: boolean,
    typeaheadDelay?: number,
    displayText?: string,
    menuAlign?: 'start' | 'end',
    //
    form?: never,
    value?: string,
};
