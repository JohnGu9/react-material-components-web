import { createComponent } from "../../components/common/Component";
import { TextField as MdTextField, TextFieldType, UnsupportedTextFieldType } from "@material/web/textfield/internal/text-field";
import { MdFilledTextFieldComponent, MdOutlinedTextFieldComponent } from "./Component";
import { createSlotNode, SlotNode } from "../common/SlotNode";

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
  value?: string,
  onChange?: (event: Event) => void,
  onInput?: (event: Event) => void,
  onSelect?: (event: Event) => void,
  //
  form?: undefined,
};

export const TextField = createComponent<MdTextField, TextFieldProps>(
  function TextField({ textFieldStyle, leadingIcon, trailingIcon, children, ...props }, ref) {
    const mergeChildren = <>
      {children}
      {leadingIcon ? createSlotNode(leadingIcon, "leading-icon") : <></>}
      {trailingIcon ? createSlotNode(trailingIcon, "trailing-icon") : <></>}
    </>;
    switch (textFieldStyle) {
      case "outlined":
        return <MdOutlinedTextFieldComponent ref={ref as any} children={mergeChildren} {...props} />;
    }
    return <MdFilledTextFieldComponent ref={ref as any} children={mergeChildren} {...props} />;
  }
);
