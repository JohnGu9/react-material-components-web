import { createComponent } from "@lit/react";
import { MdFocusRing } from "@material/web/focus/md-focus-ring";
import React from "react";

export const MdFocusRingComponent = createComponent({
    tagName: 'md-focus-ring',
    elementClass: MdFocusRing,
    react: React,
});
