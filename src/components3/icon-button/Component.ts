import { createComponent } from "@lit/react";
import { MdIconButton } from "@material/web/iconbutton/icon-button";
import { MdFilledIconButton } from "@material/web/iconbutton/filled-icon-button";
import { MdFilledTonalIconButton } from "@material/web/iconbutton/filled-tonal-icon-button";
import { MdOutlinedIconButton } from "@material/web/iconbutton/outlined-icon-button";
import React from "react";

export const MdIconButtonComponent = createComponent({
    tagName: 'md-icon-button',
    elementClass: MdIconButton,
    react: React,
});

export const MdFilledIconButtonComponent = createComponent({
    tagName: 'md-filled-icon-button',
    elementClass: MdFilledIconButton,
    react: React,
});

export const MdFilledTonalIconButtonComponent = createComponent({
    tagName: 'md-filled-tonal-icon-button',
    elementClass: MdFilledTonalIconButton,
    react: React,
});

export const MdOutlinedIconButtonComponent = createComponent({
    tagName: 'md-outlined-icon-button',
    elementClass: MdOutlinedIconButton,
    react: React,
});
