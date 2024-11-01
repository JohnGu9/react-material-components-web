import { createComponent } from "@lit/react";
import { MdElevation } from "@material/web/elevation/elevation";
import React from "react";

export const MdElevationComponent = createComponent({
    tagName: 'md-elevation',
    elementClass: MdElevation,
    react: React,
});
