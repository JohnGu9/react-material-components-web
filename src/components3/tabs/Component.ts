import { MdTabs } from "@material/web/tabs/tabs";
import { MdPrimaryTab } from "@material/web/tabs/primary-tab";
import { MdSecondaryTab } from "@material/web/tabs/secondary-tab";
import React from 'react';
import { createComponent } from '@lit/react';

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
