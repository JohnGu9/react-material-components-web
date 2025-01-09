import { createComponent } from '@lit/react';
import { MdOutlinedSegmentedButton } from '@material/web/labs/segmentedbutton/outlined-segmented-button';
import { MdOutlinedSegmentedButtonSet } from '@material/web/labs/segmentedbuttonset/outlined-segmented-button-set';
import { customElement } from 'lit/decorators.js';
import React from 'react';
import "./styles.scss";

export type SegmentedButtonStyle = "outlined" | undefined;

export const SegmentedButtonSetContext = React.createContext<SegmentedButtonStyle>(undefined);

@customElement('rmcw-outlined-segmented-button')
export class RmcwOutlinedSegmentedButton extends MdOutlinedSegmentedButton {
};

export const RmcwOutlinedSegmentedButtonComponent = createComponent({
    tagName: 'rmcw-outlined-segmented-button',
    elementClass: RmcwOutlinedSegmentedButton,
    react: React,
});

@customElement('rmcw-outlined-segmented-button-set')
export class RmcwOutlinedSegmentedButtonSet extends MdOutlinedSegmentedButtonSet {

    override setButtonSelected(index: number, selected: boolean): void {

    }

    override setButtonDisabled(index: number, disabled: boolean): void {

    }
};

export const RmcwOutlinedSegmentedButtonSetComponent = createComponent({
    tagName: 'rmcw-outlined-segmented-button-set',
    elementClass: RmcwOutlinedSegmentedButtonSet,
    react: React,
});
