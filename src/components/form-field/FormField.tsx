import "@material/form-field/mdc-form-field.scss";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, useClassInjector } from "../common/Common";
import { FormFieldComponent } from "./Component";

export const FormFieldContext = React.createContext<React.RefObject<HTMLLabelElement> | undefined>(undefined);

export type FormFieldProps = {
  alignEnd?: boolean,
  nowrap?: boolean,
  input?: React.ReactNode,
};

export const FormField = createComponent<HTMLLabelElement, FormFieldProps>(
  function FormField({
    alignEnd = false,
    nowrap = false,
    input,
    className,
    children,
    ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLLabelElement>(null);
    const injector = useClassInjector(innerRef);

    injector.with('mdc-form-field', true);
    injector.with('mdc-form-field--align-end', alignEnd);
    injector.with('mdc-form-field--nowrap', nowrap);
    injector.withClassName('0', className);

    React.useEffect(() => {
      const component = new FormFieldComponent(innerRef.current!);
      return () => component.destroy();
    }, []);

    return (
      <label ref={composeRefs(innerRef, ref)} className={injector.toClassName()} {...props} >
        <FormFieldContext.Provider value={innerRef}>
          {input}
        </FormFieldContext.Provider>
        {children}
      </label>
    );
  }
);
