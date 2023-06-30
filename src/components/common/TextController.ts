import React from "react";

export type TextBaseProps<T extends { value: string }> = {
  label?: React.ReactNode,
  helper?: React.ReactNode,
  helperPersistent?: boolean,
  disabled?: boolean,
  required?: boolean,
  invalid?: boolean,
  outlined?: boolean,
  charCounter?: 'inner' | 'helper-line',
  minLength?: number,
  maxLength?: number,
  multiple?: boolean,
  name?: string,
  endAligned?: boolean,
  placeholder?: string,
  activated?: boolean,
  value: string,
  readOnly?: boolean,
  onChange?: React.ChangeEventHandler<T>,
};
