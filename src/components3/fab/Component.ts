import { createComponent } from "@lit/react";
import { MdFab } from "@material/web/fab/fab";
import { MdBrandedFab } from "@material/web/fab/branded-fab";
import React from "react";

export const MdFabComponent = createComponent({
    tagName: 'md-fab',
    elementClass: MdFab,
    react: React,
});

export const MdBrandedFabComponent = createComponent({
    tagName: 'md-branded-fab',
    elementClass: MdBrandedFab,
    react: React,
});
