import { createComponent } from "@lit/react";
import { MdDivider } from "@material/web/divider/divider";
import React from "react";

export const MdDividerComponent = createComponent({
    tagName: 'md-divider',
    elementClass: MdDivider,
    react: React,
});
