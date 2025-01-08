import { createComponent } from "@lit/react";
import { MdElevatedButton } from "@material/web/button/elevated-button";
import { MdFilledButton } from "@material/web/button/filled-button";
import { MdFilledTonalButton } from "@material/web/button/filled-tonal-button";
import { MdOutlinedButton } from "@material/web/button/outlined-button";
import { MdTextButton } from "@material/web/button/text-button";
import React from 'react';

export const MdTextButtonComponent = createComponent({
    tagName: 'md-text-button',
    elementClass: MdTextButton,
    react: React,
});

export const MdFilledTonalButtonComponent = createComponent({
    tagName: 'md-filled-tonal-button',
    elementClass: MdFilledTonalButton,
    react: React,
});


export const MdFilledButtonComponent = createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButton,
    react: React,
});

export const MdElevatedButtonComponent = createComponent({
    tagName: 'md-elevated-button',
    elementClass: MdElevatedButton,
    react: React,
});

export const MdOutlinedButtonComponent = createComponent({
    tagName: 'md-outlined-button',
    elementClass: MdOutlinedButton,
    react: React,
});
