import "@material/textfield/mdc-text-field.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { TextBaseProps } from "../common/TextController";
import { useUuidV4 } from "../common/Uuid";
import { FloatingLabel } from "../floating-label/FloatingLabel";
import { LineRipple } from "../line-ripple/LineRipple";
import { NotchedOutline } from "../notched-outline/NotchedOutline";

export type TextAreaProps = TextBaseProps<HTMLTextAreaElement> & {
  resize?: boolean,
  cols?: number,
  rows?: number,
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>,
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>,
};

export const TextArea = createComponent<HTMLLabelElement, TextAreaProps>(
  function TextArea({
    label,
    helper,
    helperPersistent = false,
    disabled = false,
    required = false,
    invalid = false,
    outlined = false,
    activated,
    charCounter,
    minLength,
    maxLength,
    readOnly,
    name,
    cols,
    rows,
    placeholder,
    endAligned = false,
    resize = true,
    value,
    onChange,
    onFocus,
    onBlur,
    ...props
  }, ref) {
    const uuid = useUuidV4();
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLLabelElement>(null);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const injector = useClassInjector(innerRef);
    const [inFocus, setInFocus] = React.useState(false);
    const floating = (activated ?? inFocus) || value !== '';

    injector.with('mdc-text-field', true);
    injector.with('mdc-text-field--textarea', true);
    injector.with('mdc-text-field--filled', !outlined);
    injector.with('mdc-text-field--outlined', outlined);
    injector.with('mdc-text-field--disabled', disabled);
    injector.with('mdc-text-field--focused', activated ?? inFocus);
    injector.with('mdc-text-field--invalid', invalid);
    injector.with('mdc-text-field--label-floating', floating);
    injector.with('mdc-text-field--no-label', !isDefined(label) || label === '');
    injector.with('mdc-text-field--with-internal-counter', charCounter === 'inner');
    injector.with('mdc-text-field--end-aligned', endAligned);

    return (
      <>
        <label ref={composeRefs(innerRef, ref)}
          className={injector.toClassName()}
          {...props}>
          <span className="mdc-text-field__ripple" aria-hidden></span>
          {outlined
            ? <NotchedOutline
              labelId={uuid}
              required={required}
              notched={floating}>
              {label}
            </NotchedOutline>
            : <FloatingLabel
              id={uuid}
              required={required}
              float={floating}>
              {label}
            </FloatingLabel>}
          <span className={resize ? "mdc-text-field__resizer" : undefined}>
            <textarea className="mdc-text-field__input"
              ref={inputRef}
              aria-labelledby={uuid}
              cols={cols}
              rows={rows}
              disabled={disabled}
              required={required}
              minLength={minLength}
              maxLength={maxLength}
              readOnly={readOnly}
              name={name}
              placeholder={placeholder}
              onFocus={e => {
                onFocus?.(e);
                setInFocus(true)
              }}
              onBlur={e => {
                onBlur?.(e);
                setInFocus(false);
              }}
              onChange={onChange} />
            {charCounter === 'inner'
              ? <span className="mdc-text-field-character-counter">{value.length}{isDefined(maxLength) ? ` / ${maxLength}` : undefined}</span>
              : undefined}
          </span>
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
