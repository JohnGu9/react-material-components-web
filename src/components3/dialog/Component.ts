/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDialog } from "@material/web/dialog/dialog";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';
import { css, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";

const style = css`
::backdrop {
    pointer-events: none;
    visibility: hidden;
}
.scrim-click-layer {
    position: fixed;
    inset: 0;
    z-index: -1;
}
`;

@customElement('rmcw-dialog')
export class RmcwDialog extends MdDialog {
  static override styles = [...MdDialog.styles, style];

  constructor() {
    super();
    this.removeEventListener('submit', (this as any).handleSubmit);
    (this as any).handleCancel = (e: Event) => { e.preventDefault(); };
    (this as any).handleClose = () => { this.close(); };
    (this as any).handleDialogClick = (event: Event) => {
      this.dispatchEvent(new CustomEvent("scrim-click", { detail: event }));
    };
    (this as any).handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent("escape-key", { detail: event }));
        return;
      }
    };
  }

  protected override render() {
    const scrollable =
      this.open && !((this as any).isAtScrollTop && (this as any).isAtScrollBottom);
    const classes = {
      'has-headline': (this as any).hasHeadline,
      'has-actions': (this as any).hasActions,
      'has-icon': (this as any).hasIcon,
      'scrollable': scrollable,
      'show-top-divider': scrollable && !(this as any).isAtScrollTop,
      'show-bottom-divider': scrollable && !(this as any).isAtScrollBottom,
    };

    // The focus trap sentinels are only added after the dialog opens, since
    // dialog.showModal() will try to autofocus them, even with tabindex="-1".
    const showFocusTrap = this.open && !this.noFocusTrap;
    const focusTrap = html`
          <div
            class="focus-trap"
            tabindex="0"
            aria-hidden="true"
            @focus=${(this as any).handleFocusTrapFocus}></div>
        `;

    const { ariaLabel } = this;
    return html`
          <div class="scrim"></div>
          <dialog
            class=${classMap(classes)}
            aria-label=${ariaLabel || nothing}
            aria-labelledby=${(this as any).hasHeadline ? 'headline' : nothing}
            role=${this.type === 'alert' ? 'alertdialog' : nothing}
            @cancel=${(this as any).handleCancel}
            @close=${(this as any).handleClose}
            @keydown=${(this as any).handleKeydown}
            .returnValue=${this.returnValue || nothing}>
            <div class="scrim-click-layer" @click=${(this as any).handleDialogClick}></div>
            ${showFocusTrap ? focusTrap : nothing}
            <div class="container" @click=${(this as any).handleContentClick}>
              <div class="headline">
                <div class="icon" aria-hidden="true">
                  <slot name="icon" @slotchange=${(this as any).handleIconChange}></slot>
                </div>
                <h2 id="headline" aria-hidden=${!(this as any).hasHeadline || nothing}>
                  <slot
                    name="headline"
                    @slotchange=${(this as any).handleHeadlineChange}></slot>
                </h2>
                <md-divider></md-divider>
              </div>
              <div class="scroller">
                <div class="content">
                  <div class="top anchor"></div>
                  <slot name="content"></slot>
                  <div class="bottom anchor"></div>
                </div>
              </div>
              <div class="actions">
                <md-divider></md-divider>
                <slot name="actions" @slotchange=${(this as any).handleActionsChange}></slot>
              </div>
            </div>
            ${showFocusTrap ? focusTrap : nothing}
          </dialog>
        `;
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
