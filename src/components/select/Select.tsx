import React from "react";
import { createComponent } from "../common/Common";
import { Menu } from "../menu/Menu";
import { TextField } from "../text-field/TextField";
import { useRefComposer } from "react-ref-composer";

export type SelectProps = {
  open?: boolean,
  anchorCorner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  anchorQuadrant?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  quick?: boolean,
  activated?: boolean,
  onOpen?: () => any,
  onClose?: () => any,
  label?: React.ReactNode,
  helper?: React.ReactNode,
  helperPersistent?: boolean,
  disabled?: boolean,
  required?: boolean,
  invalid?: boolean,
  outlined?: boolean,
  name?: string,
  endAligned?: boolean,
  placeholder?: string,
  value?: string,
  leadingIcon?: React.ReactNode,
  trailingIcon?: React.ReactNode,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
};

export const Select = createComponent<HTMLDivElement, SelectProps>(
  function Select({
    open: opened,
    activated,
    onOpen,
    onClose,
    label,
    helper,
    helperPersistent,
    disabled,
    required,
    invalid,
    outlined,
    name,
    endAligned,
    placeholder,
    value = '',
    leadingIcon,
    trailingIcon,
    prefix,
    suffix,
    children,
    ...props }, ref) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isOpened, setIsOpened] = React.useState(false);
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const field = React.useRef<HTMLLabelElement>(null);
    const open = () => { setIsOpened(true); onOpen?.(); };
    const close = () => { setIsOpened(false); onClose?.(); };

    opened ??= isOpened;
    activated ??= isFocused;

    const onClick = (e: React.SyntheticEvent) => {
      if (e.target !== field.current) {
        if (opened) {
          close();
        } else {
          open();
        }
      }
    };

    React.useEffect(() => {
      if (opened) {
        const onFocusIn = (event: FocusEvent) => {
          if (innerRef.current?.contains(document.activeElement) !== true) {
            close();
          }
        };
        const onClick = (event: MouseEvent) => {
          const { current } = innerRef;
          const { target } = event;
          if (current !== null && target instanceof Node && !current.contains(target)) {
            if (current.contains(document.activeElement)) {
              const { activeElement } = document;
              if (activeElement instanceof HTMLElement) {
                activeElement.blur();
              }
            }
            close();
          }
        };
        window.addEventListener('focusin', onFocusIn);
        window.addEventListener('click', onClick);
        return () => {
          window.removeEventListener('focusin', onFocusIn);
          window.removeEventListener('click', onClick);

        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened]);

    React.useEffect(() => {
      const { current } = innerRef;
      if (current !== null) {
        current.addEventListener('focusin', _ => setIsFocused(true));
        current.addEventListener('focusout', _ => setIsFocused(false));
      }
    }, []);

    return (
      <Menu fullWidth
        {...props}
        value={value}
        onKeyDown={e => {
          const { keyCode, key } = e;
          if (key === "Enter" || keyCode === 13) {
            onClick(e);
          } else if (key === 'Escape' || keyCode === 27) {
            close();
          }
        }}
        onClick={onClick}
        surface={children}
        ref={composeRefs(innerRef, ref)}>
        <TextField
          aria-hidden
          readOnly
          label={label}
          helper={helper}
          helperPersistent={helperPersistent}
          disabled={disabled}
          required={required}
          invalid={invalid}
          outlined={outlined}
          name={name}
          endAligned={endAligned}
          placeholder={placeholder}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          prefix={prefix}
          suffix={suffix}
          style={{ zIndex: 10, width: '100%' }}
          activated={opened || activated}
          value={value}
          ref={field} />
      </Menu>
    );
  }
);
