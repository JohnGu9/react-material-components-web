import { MdTabs } from "@material/web/tabs/tabs";
import { MdPrimaryTab } from "@material/web/tabs/primary-tab";
import { MdSecondaryTab } from "@material/web/tabs/secondary-tab";
import React from 'react';
import { createComponent } from '@lit/react';
import { customElement } from 'lit/decorators.js';
import { Tab } from "@material/web/tabs/internal/tab";

@customElement('rmcw-tabs')
export class RmcwTabs extends MdTabs {
    superActivateTab: (activeTab: Tab) => unknown;

    constructor() {
        super();
        this.superActivateTab = (this as any).activateTab;
        (this as any).activateTab = function (activeTab: Tab) {
            const index = (this.tabs as Tab[]).indexOf(activeTab)
            this.dispatchEvent(new CustomEvent("selected", { detail: index }));
        };
    }

    override set activeTabIndex(index: number) {
        const activateTabAtIndex = () => {
            const tab = this.tabs[index];
            // Ignore out-of-bound indices.
            if (tab) {
                this.superActivateTab(tab);
            }
        };

        if (!(this as any).slotElement) {
            // This is needed to support setting the activeTabIndex via a lit property
            // binding.
            //
            // ```ts
            // html`
            //   <md-tabs .activeTabIndex=${1}>
            //     <md-tab>First</md-tab>
            //     <md-tab>Second</md-tab>
            //   </md-tabs>
            // `;
            // ```
            //
            // It's needed since lit's rendering lifecycle is asynchronous, and the
            // `<slot>` element hasn't rendered, so `tabs` is empty.
            this.updateComplete.then(activateTabAtIndex);
            return;
        }

        activateTabAtIndex();
    }
};

export const RmcwTabsComponent = createComponent({
    tagName: 'rmcw-tabs',
    elementClass: RmcwTabs,
    react: React,
    events: {
        onSelected: 'selected',
        onChange: 'change'
    }
});

export const MdTabsComponent = createComponent({
    tagName: 'md-tabs',
    elementClass: MdTabs,
    react: React,
    events: {
        onChange: 'change'
    }
});

export const MdPrimaryTabComponent = createComponent({
    tagName: 'md-primary-tab',
    elementClass: MdPrimaryTab,
    react: React,
});

export const MdSecondaryTabComponent = createComponent({
    tagName: 'md-secondary-tab',
    elementClass: MdSecondaryTab,
    react: React,
});
