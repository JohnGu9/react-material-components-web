import { MdElevatedCard } from '@material/web/labs/card/elevated-card.js';
import { MdFilledCard } from '@material/web/labs/card/filled-card.js';
import { MdOutlinedCard } from '@material/web/labs/card/outlined-card.js';
import { createComponent } from "@lit/react";
import React from 'react';

export const MdElevatedCardComponent = createComponent({
    tagName: 'md-elevated-card',
    elementClass: MdElevatedCard,
    react: React,
});

export const MdFilledCardComponent = createComponent({
    tagName: 'md-filled-card',
    elementClass: MdFilledCard,
    react: React,
});

export const MdOutlinedCardComponent = createComponent({
    tagName: 'md-outlined-card',
    elementClass: MdOutlinedCard,
    react: React,
});
