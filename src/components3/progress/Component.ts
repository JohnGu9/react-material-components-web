import { createComponent } from "@lit/react";
import { MdCircularProgress } from "@material/web/progress/circular-progress";
import { MdLinearProgress } from "@material/web/progress/linear-progress";
import { css } from "lit";
import { customElement } from 'lit/decorators.js';
import React from "react";

const circularProgressStyle = css`
:host {
    --_circular-progress-transition: var(--rmcw-circular-progress-transition, stroke-dashoffset 250ms cubic-bezier(0, 0, 0.2, 1));
    .active-track{
        transition: var(--_circular-progress-transition);
    }
}
`;

@customElement('rmcw-circular-progress')
export class RmcwCircularProgress extends MdCircularProgress {
    static override styles = [...MdCircularProgress.styles, circularProgressStyle];
}

export const MmcwCircularProgressComponent = createComponent({
    tagName: 'rmcw-circular-progress',
    elementClass: RmcwCircularProgress,
    react: React,
});


const linearProgressStyle = css`
:host {
    --_linear-progress-transition: var(--rmcw-linear-progress-transition, transform 250ms cubic-bezier(0.4, 0, 0.6, 1));
    .inactive-track,
    .bar {
        transition: var(--_linear-progress-transition);
    }
}
`;

@customElement('rmcw-linear-progress')
export class RmcwLinearProgress extends MdLinearProgress {
    static override styles = [...MdLinearProgress.styles, linearProgressStyle];
}

export const RmcwLinearProgressComponent = createComponent({
    tagName: 'rmcw-linear-progress',
    elementClass: RmcwLinearProgress,
    react: React,
});


export type ProgressProps = {
    max?: number,
    value?: number,
    fourColor?: boolean,
};
