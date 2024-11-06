import { createComponent } from "../../common/Component";
import { TextField as MdTextField, TextFieldType, UnsupportedTextFieldType } from "@material/web/textfield/internal/text-field";
import { MdFilledTextFieldComponent, MdOutlinedTextFieldComponent } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import { FormEvent } from "react";
import React from "react";

export type TextFieldProps = {
  textFieldStyle?: "filled" | "outlined",
  max?: string,
  min?: string,
  step?: string,
  type: TextFieldType | UnsupportedTextFieldType,
  error?: boolean,
  errorText?: string,
  label?: string,
  noAsterisk?: boolean,
  required?: boolean,
  prefixText?: string,
  suffixText?: string,
  supportingText?: string,
  textDirection?: string,
  rows?: number, // for type="textarea"
  cols?: number, // for type="textarea"
  inputMode?: "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal",
  maxLength?: number,
  minLength?: number,
  noSpinner?: boolean, // for type="number"
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
  multiple?: boolean, // for type="email"
  selectionDirection?: 'forward' | 'backward' | 'none' | null,
  selectionEnd?: number,
  selectionStart?: number,
  autocomplete?: string,
  leadingIcon?: SlotNode,
  trailingIcon?: SlotNode,
  defaultValue?: string,
  value?: string,
  onChange?: React.ReactEventHandler<MdTextField>,
  //
  form?: never,
  onSelect?: (event: Event) => void,
};

export const TextField = createComponent<MdTextField, TextFieldProps>(
  function TextField({ textFieldStyle, leadingIcon, trailingIcon, children, defaultValue, value, onChange, onBeforeInput, ...props }, ref) {
    const mergeChildren = <>
      {children}
      {leadingIcon ? createSlotNode(leadingIcon, "leading-icon") : <></>}
      {trailingIcon ? createSlotNode(trailingIcon, "trailing-icon") : <></>}
    </>;
    const onBeforeInputMerge = React.useMemo(() => {
      return (e: FormEvent<MdTextField>) => {
        onBeforeInput?.(e);
        if (onChange) {
          onChange(e);
        } else if (defaultValue === undefined) {
          e.preventDefault();
        }
      };
    }, [defaultValue, onBeforeInput, onChange]);

    switch (textFieldStyle) {
      case "outlined":
        return <MdOutlinedTextFieldComponent
          ref={ref as any}
          value={value ?? defaultValue}
          children={mergeChildren}
          onBeforeInput={onBeforeInputMerge}
          {...props} />;
    }
    return <MdFilledTextFieldComponent
      ref={ref as any}
      value={value ?? defaultValue}
      children={mergeChildren}
      onBeforeInput={onBeforeInputMerge}
      {...props} />;
  }
);

export type TextFieldSupportedCssProps = {
  "--md-filled-text-field-container-shape": string,
  "--md-filled-text-field-container-color": string,
  "--md-filled-text-field-focus-active-indicator-color": string,
  "--md-filled-text-field-input-text-font": string,
  "--md-filled-text-field-label-text-font": string,

  "--md-outlined-text-field-container-shape": string,
  "--md-outlined-text-field-focus-outline-color": string,
  "--md-outlined-text-field-input-text-font": string,
  "--md-outlined-text-field-label-text-font": string,
};
