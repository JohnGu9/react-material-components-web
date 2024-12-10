import { MdFilterChip } from "@material/web/chips/filter-chip";
import { redispatchEvent } from "@material/web/internal/events/redispatch-event";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';
import { MdInputChip } from "@material/web/chips/input-chip";
import { html, nothing } from "lit";
import { Chip } from "@material/web/chips/internal/chip";
import { MdAssistChip } from "@material/web/chips/assist-chip";
import { MdSuggestionChip } from "@material/web/chips/suggestion-chip";
import { MdChipSet } from "@material/web/chips/chip-set";

export const MdAssistChipComponent = createComponent({
    tagName: 'md-assist-chip',
    elementClass: MdAssistChip,
    react: React,
});

@customElement('rmcw-filter-chip')
export class RmcwFilterChip extends MdFilterChip {
    constructor() {
        super();
        (this as any).handleClickOnChild = function (event: Event) {
            redispatchEvent(this, event);
        };
    }

    protected override renderTrailingAction(focusListener: EventListener) {
        if (this.removable) {
            // overwrite [renderRemoveButton]
            return renderRemoveButton({
                focusListener,
                ariaLabel: this.ariaLabelRemove,
                disabled: this.disabled || this.softDisabled,
            });
        }

        return nothing;
    }
};

export const RmcwFilterChipComponent = createComponent({
    tagName: 'rmcw-filter-chip',
    elementClass: RmcwFilterChip,
    react: React,
    events: {
        onRemoveClick: "remove-click"
    }
});

@customElement('rmcw-input-chip')
export class RmcwInputChip extends MdInputChip {
    protected override renderTrailingAction(focusListener: EventListener) {
        // overwrite [renderRemoveButton]
        return renderRemoveButton({
            focusListener,
            ariaLabel: this.ariaLabelRemove,
            disabled: this.disabled || this.softDisabled,
        });
    }
};

export const RmcwInputChipComponent = createComponent({
    tagName: 'rmcw-input-chip',
    elementClass: RmcwInputChip,
    react: React,
    events: {
        onRemoveClick: "remove-click"
    }
});

export const MdSuggestionChipComponent = createComponent({
    tagName: 'md-suggestion-chip',
    elementClass: MdSuggestionChip,
    react: React,
});

interface RemoveButtonProperties {
    ariaLabel: string | null;
    disabled: boolean;
    focusListener: EventListener;
    tabbable?: boolean;
}
function renderRemoveButton({
    ariaLabel,
    disabled,
    focusListener,
    tabbable = false,
}: RemoveButtonProperties) {
    // When an aria-label is not provided, we use two spans with aria-labelledby
    // to create the "Remove <textContent>" label for the remove button. The first
    // is this #remove-label span, the second is the chip's #label slot span.
    return html`
      <span id="remove-label" hidden aria-hidden="true">Remove</span>
      <button
        class="trailing action"
        aria-label=${ariaLabel || nothing}
        aria-labelledby=${!ariaLabel ? 'remove-label label' : nothing}
        tabindex=${!tabbable ? -1 : nothing}
        @click=${handleRemoveClick}
        @focus=${focusListener}>
        <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
        <md-ripple ?disabled=${disabled}></md-ripple>
        <span class="trailing icon" aria-hidden="true">
          <slot name="remove-trailing-icon">
            <svg viewBox="0 96 960 960">
              <path
                d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
            </svg>
          </slot>
        </span>
        <span class="touch"></span>
      </button>
    `;
}

function handleRemoveClick(this: Chip, event: Event) {
    // only dispatch event
    // no longer remove chip actively
    this.dispatchEvent(new CustomEvent("remove-click", { detail: event }));
}

export const MdChipSetComponent = createComponent({
    tagName: 'md-chip-set',
    elementClass: MdChipSet,
    react: React,
});
