import { createComponent } from "@lit/react";
import { MdCircularProgress } from "@material/web/progress/circular-progress"
import { MdLinearProgress } from "@material/web/progress/linear-progress"
import React from "react";

export const MdCircularProgressComponent = createComponent({
    tagName: 'md-circular-progress',
    elementClass: MdCircularProgress,
    react: React,
});

export const MdLinearProgressComponent = createComponent({
    tagName: 'md-linear-progress',
    elementClass: MdLinearProgress,
    react: React,
});


export type ProgressProps = {
    max?: number,
    value?: number,
    fourColor?: boolean,
  };
