import { createComponent } from '@lit/react';
import { MdNavigationBar } from '@material/web/labs/navigationbar/navigation-bar';
import { NavigationTab } from '@material/web/labs/navigationtab/internal/navigation-tab';
import { MDCNavigationTabInteractionEventDetail } from '@material/web/labs/navigationbar/internal/constants';
import { isRtl } from '@material/web/internal/controller/is-rtl';
import { MdNavigationTab } from '@material/web/labs/navigationtab/navigation-tab';
import { customElement } from 'lit/decorators.js';
import React from 'react';

export type InteractionEventContent = { index: number, origin: CustomEvent<MDCNavigationTabInteractionEventDetail> | KeyboardEvent; };
export type InteractionEvent = CustomEvent<InteractionEventContent>;

@customElement('rmcw-navigation-bar')
export class RmcwNavigationBar extends MdNavigationBar {
    constructor() {
        super();
        (this as any).handleNavigationTabInteraction = (event: CustomEvent<MDCNavigationTabInteractionEventDetail>) => {
            this.dispatchEvent(new CustomEvent<InteractionEventContent>("interaction",
                { detail: { index: this.tabs.indexOf(event.detail.state as NavigationTab), origin: event } }));
        };

        (this as any).handleKeydown = (event: KeyboardEvent) => {
            const key = event.key;
            const focusedTabIndex = this.tabs.findIndex((tab) => {
                return tab.matches(':focus-within');
            });
            const isRTL = isRtl(this);
            const maxIndex = this.tabs.length - 1;

            if (key === 'Enter' || key === ' ') {
                this.dispatchEvent(new CustomEvent<InteractionEventContent>("interaction",
                    { detail: { index: focusedTabIndex, origin: event } }));
                return;
            }

            if (key === 'Home') {
                this.tabs[0].focus();
                return;
            }

            if (key === 'End') {
                this.tabs[maxIndex].focus();
                return;
            }

            const toNextTab =
                (key === 'ArrowRight' && !isRTL) || (key === 'ArrowLeft' && isRTL);
            if (toNextTab && focusedTabIndex === maxIndex) {
                this.tabs[0].focus();
                return;
            }
            if (toNextTab) {
                this.tabs[focusedTabIndex + 1].focus();
                return;
            }

            const toPreviousTab = (key === 'ArrowLeft' && !isRTL) || (key === 'ArrowRight' && isRTL);
            if (toPreviousTab && focusedTabIndex === 0) {
                this.tabs[maxIndex].focus();
                return;
            }
            if (toPreviousTab) {
                this.tabs[focusedTabIndex - 1].focus();
                return;
            }
        };
    }
};

export const RmcwNavigationBarComponent = createComponent({
    tagName: 'rmcw-navigation-bar',
    elementClass: RmcwNavigationBar,
    react: React,
    events: {
        onInteraction: "interaction",
    }
});

export const MdNavigationTabComponent = createComponent({
    tagName: 'md-navigation-tab',
    elementClass: MdNavigationTab,
    react: React,
});
