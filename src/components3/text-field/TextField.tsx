import { createComponent } from "../../common/Component";
import { TextField as MdTextField, TextFieldType, UnsupportedTextFieldType } from "@material/web/textfield/internal/text-field";
import { RmcwFilledTextField, RmcwFilledTextFieldComponent, RmcwOutlinedTextField, RmcwOutlinedTextFieldComponent } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";
import React from "react";
import { createSyntheticEvent } from "../../common/CreateSyntheticEvent";

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
  defaultValue?: never, // not support defaultValue yet
  value?: string,
  onChange?: React.ChangeEventHandler<MdTextField>,
  //
  form?: never,
  onSelect?: (event: Event) => void,
};

export const TextField = createComponent<MdTextField, TextFieldProps>(
  function TextField({ textFieldStyle, leadingIcon, trailingIcon, children, value = "", onChange, readOnly, ...props }, ref) {
    const mergeChildren = <>
      {children}
      {leadingIcon ? createSlotNode(leadingIcon, "leading-icon") : undefined}
      {trailingIcon ? createSlotNode(trailingIcon, "trailing-icon") : undefined}
    </>;
    const state = React.useMemo(() => { return { value: "" }; }, []);
    state.value = value;
    const mergeOnChange = React.useMemo(() => {
      if (onChange)
        return (event: Event) => {
          if ("detail" in event) {
            const { currentTarget, target } = event;
            function createSyntheticEvent(event: Event) {
              let isDefaultPrevented = false;
              let isPropagationStopped = false;
              return {
                nativeEvent: event,
                currentTarget: currentTarget as EventTarget & MdTextField,
                target: target as EventTarget & MdTextField,
                bubbles: event.bubbles,
                cancelable: event.cancelable,
                defaultPrevented: event.defaultPrevented,
                eventPhase: event.eventPhase,
                isTrusted: event.isTrusted,
                preventDefault: function () {
                  isDefaultPrevented = true;
                  this.defaultPrevented = true;
                  event.preventDefault();
                  (target as MdTextField).value = state.value;
                  (event.target as HTMLInputElement).value = state.value;
                },
                isDefaultPrevented: () => isDefaultPrevented,
                stopPropagation: function () {
                  isPropagationStopped = true;
                  event.stopPropagation();
                  (target as MdTextField).value = state.value;
                  (event.target as HTMLInputElement).value = state.value;
                },
                isPropagationStopped: () => isPropagationStopped,
                persist: () => { },
                timeStamp: event.timeStamp,
                type: "change",
              };
            }
            event.stopPropagation();
            if (event.detail === null) {
              onChange(createSyntheticEvent(event));
            } else {
              onChange(createSyntheticEvent(event.detail as Event));
            }
          } else {
            onChange(createSyntheticEvent(event, "change"));
          }
        };
    }, [onChange, state]);

    switch (textFieldStyle) {
      case "outlined":
        return <RmcwOutlinedTextFieldComponent
          ref={ref as React.Ref<RmcwOutlinedTextField>}
          value={value}// @BUG: lit/react can not ensure that 'value' property is sync with the really dom element
          children={mergeChildren}
          onChange={mergeOnChange}
          readOnly={readOnly ?? !onChange}
          {...props} />;
    }
    return <RmcwFilledTextFieldComponent
      ref={ref as React.Ref<RmcwFilledTextField>}
      value={value}// @BUG: lit/react can not ensure that 'value' property is sync with the really dom element
      children={mergeChildren}
      onChange={mergeOnChange}
      readOnly={readOnly ?? !onChange}
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
