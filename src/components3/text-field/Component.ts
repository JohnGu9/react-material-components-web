import { MdFilledTextField } from "@material/web/textfield/filled-text-field";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import React from 'react';
import { createComponent } from '@lit/react';

export const MdFilledTextFieldComponent = createComponent({
    tagName: 'md-filled-text-field',
    elementClass: MdFilledTextField,
    react: React,
    events: {
        onChange: "change",
        onInput: "input",
        onSelect: "select",
    }
});

export const MdOutlinedTextFieldComponent = createComponent({
    tagName: 'md-outlined-text-field',
    elementClass: MdOutlinedTextField,
    react: React,
    events: {
        onChange: "change",
        onInput: "input",
        onSelect: "select",
    }
});
