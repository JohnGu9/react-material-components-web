import { MdSlider } from "@material/web/slider/slider";
import React from 'react';
import { createComponent } from '@lit/react';

export const MdSliderComponent = createComponent({
    tagName: 'md-slider',
    elementClass: MdSlider,
    react: React,
    events: {
        onChange: "change",
    }
});
