import React from "react";

export function createComponent<Element, Props>(render: React.ForwardRefRenderFunction<Element, Props & Omit<React.HTMLProps<Element>, keyof Props | "ref">>) {
  return React.forwardRef<Element, Props & Omit<React.HTMLProps<Element>, keyof Props | "ref">>(render);
}
