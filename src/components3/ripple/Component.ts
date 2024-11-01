import { MdRipple } from "@material/web/ripple/ripple";
import React from 'react';
import { createComponent } from '@lit/react';

export const MdRippleComponent = createComponent({
    tagName: 'md-ripple',
    elementClass: MdRipple,
    react: React,
});
