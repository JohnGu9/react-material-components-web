import "./style.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { TextBaseProps } from "../common/TextController";
import { useUuidV4 } from "../common/Uuid";
import { FloatingLabel } from "../floating-label/FloatingLabel";
import { IconContext } from "../icon/Icon";
import { LineRipple } from "../line-ripple/LineRipple";
import { NotchedOutline } from "../notched-outline/NotchedOutline";

export type TextFieldProps = TextBaseProps<HTMLInputElement> & {
  leadingIcon?: React.ReactNode,
  trailingIcon?: React.ReactNode,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  max?: number,
  min?: number,
  step?: number,
  multiple?: boolean,
  type?: React.HTMLInputTypeAttribute,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  onBlur?: React.FocusEventHandler<HTMLInputElement>,
};

export const TextField = createComponent<HTMLLabelElement, TextFieldProps>(
  function TextField({
    label,
    leadingIcon,
    trailingIcon,
    prefix,
    suffix,
    helper,
    helperPersistent = false,
    disabled = false,
    required = false,
    invalid = false,
    outlined = false,
    activated,
    charCounter,
    max,
    min,
    step,
    minLength,
    maxLength,
    autoComplete,
    readOnly,
    autoFocus,
    multiple,
    name,
    id,
    placeholder,
    endAligned = false,
    type = "text",
    value,
    onFocus,
    onBlur,
    onChange,
    ...props
  }, ref) {
    const uuid = useUuidV4();
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLLabelElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const injector = useClassInjector(innerRef);
    const [inFocus, setInFocus] = React.useState(false);
    const floating = (activated ?? inFocus) || value !== '';

    injector.with('mdc-text-field', true);
    injector.with('mdc-text-field--filled', !outlined);
    injector.with('mdc-text-field--outlined', outlined);
    injector.with('mdc-text-field--disabled', disabled);
    injector.with('mdc-text-field--focused', activated ?? inFocus);
    injector.with('mdc-text-field--invalid', invalid);
    injector.with('mdc-text-field--label-floating', floating);
    injector.with('mdc-text-field--no-label', !isDefined(label) || label === '');
    injector.with('mdc-text-field--with-leading-icon', isDefined(leadingIcon));
    injector.with('mdc-text-field--with-trailing-icon', isDefined(trailingIcon));
    injector.with('mdc-text-field--with-internal-counter', charCounter === 'inner');
    injector.with('mdc-text-field--end-aligned', endAligned);

    return (
      <>
        <label ref={composeRefs(innerRef, ref)}
          className={injector.toClassName()}
          htmlFor={id}
          {...props}>
          {!outlined ? <span className="mdc-text-field--filled__background" aria-hidden></span> : <></>}
          <span className="mdc-text-field__ripple" aria-hidden></span>
          {outlined
            ? <NotchedOutline
              labelId={uuid}
              required={required}
              notched={floating}
              aria-hidden>
              {label}
            </NotchedOutline>
            : <FloatingLabel
              id={uuid}
              required={required}
              float={floating}
              aria-hidden>
              {label}
            </FloatingLabel>}
          {isDefined(leadingIcon)
            ? <IconContext.Provider value={disabled
              ? { className: 'mdc-text-field__icon mdc-text-field__icon--leading', tabIndex: -1 }
              : { className: 'mdc-text-field__icon mdc-text-field__icon--leading', role: 'button' }}>
              {leadingIcon}
            </IconContext.Provider>
            : undefined}
          {isDefined(prefix)
            ? <span className="mdc-text-field__affix mdc-text-field__affix--prefix">{prefix}</span>
            : undefined}
          <input className="mdc-text-field__input"
            ref={inputRef}
            aria-labelledby={uuid}
            type={type}
            disabled={disabled}
            required={required}
            max={max}
            min={min}
            step={step}
            minLength={minLength}
            maxLength={maxLength}
            readOnly={readOnly}
            multiple={multiple}
            name={name}
            autoComplete={autoComplete}
            id={id}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={value}
            onFocus={e => {
              setInFocus(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setInFocus(false);
              onBlur?.(e);
            }}
            onChange={onChange} />
          {isDefined(suffix)
            ? <span className="mdc-text-field__affix mdc-text-field__affix--suffix">{suffix}</span>
            : undefined}
          {isDefined(trailingIcon)
            ? <IconContext.Provider value={disabled
              ? { className: 'mdc-text-field__icon mdc-text-field__icon--trailing', tabIndex: -1 }
              : { className: 'mdc-text-field__icon mdc-text-field__icon--trailing', role: 'button' }}>
              {trailingIcon}
            </IconContext.Provider>
            : undefined}
          {charCounter === 'inner'
            ? <span className="mdc-text-field-character-counter">{value.length}{isDefined(maxLength) ? ` / ${maxLength}` : undefined}</span>
            : undefined}
          {outlined ? undefined
            : <LineRipple activated={activated ?? inFocus} />}
        </label>
        {isDefined(helper)
          ? <div className="mdc-text-field-helper-line">
            <div className={`mdc-text-field-helper-text${helperPersistent ? ' mdc-text-field-helper-text--persistent' : ''}${invalid ? ' mdc-text-field-helper-text--validation-msg' : ''}`} id="my-helper-id" aria-hidden="true">{helper}</div>
            {charCounter === 'helper-line'
              ? <span className="mdc-text-field-character-counter">{value.length}{isDefined(maxLength) ? ` / ${maxLength}` : undefined}</span>
              : undefined}
          </div>
          : undefined}
      </>
    );
  }
);
