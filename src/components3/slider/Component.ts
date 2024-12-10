import { MdSlider } from "@material/web/slider/slider";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';

@customElement('rmcw-slider')
export class RmcwSlider extends MdSlider {
    constructor() {
        super();
        (this as any).handleInput = (event: InputEvent) => {
            const preValue = { value: this.value, valueStart: this.valueStart, valueEnd: this.valueEnd };
            (MdSlider.prototype as any).handleInput.call(this, event);
            this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            this.value = preValue.value;
            this.valueStart = preValue.valueStart;
            this.valueEnd = preValue.valueEnd;
            if (this.range) {
                (this as any).inputStart.valueAsNumber = this.valueStart;
                (this as any).inputEnd.valueAsNumber = this.valueEnd;
            } else {
                (this as any).inputEnd.valueAsNumber = this.value;
            }
        };
    }

    override formResetCallback(): void { }
    override formStateRestoreCallback(state: string | Array<[string, string]> | null): void { }
};

export const RmcwSliderComponent = createComponent({
    tagName: 'rmcw-slider',
    elementClass: RmcwSlider,
    react: React,
    events: {
        onChange: "change",
    }
});
