// If you want to use custom font, import this file

// Example:
// <Typography.Body.Medium tag="div"></Typography.Body.Medium>
//
// Follow the guide https://github.com/material-components/material-web/blob/main/docs/theming/typography.md
//
// You can totally ignore this file.
// This file just help you add className to the element and nothing else.
//
// Use the Typography.getClass. Example:
// <div className={`${Typography.getClass('headline', 'medium')} my-class`}>Hello</div>

import React from "react";
import { classMap, createComponent } from "../../common/Common";
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles';

document.adoptedStyleSheets.push(typescaleStyles.styleSheet!);

export namespace Typography {
  export type Scale =
    'display' |
    'headline' |
    'title' |
    'body' |
    'label';

  export type Size =
    'small' |
    'medium' |
    'large';

  export type Property =
    'font' |
    'size' |
    'line-height' |
    'weight';

  export type Typescale = { [key in `--md-sys-typescale-${Scale}-${Size}-${Property}`]?: string };

  export type Typeface = {
    '--md-ref-typeface-brand'?: string,
    '--md-ref-typeface-plain'?: string,
  };

  export function getClass(scale: Scale, size: Size) {
    return `md-typescale-${scale}-${size}`;
  }

  export type FontFamilyProps = {
    typeface?: Typeface,
    typescale?: Typescale,
  };

  export const FontFamily = createComponent<HTMLDivElement, FontFamilyProps>(
    function FontFamily({
      typeface,
      typescale,
      style,
      ...props }, ref) {
      return <div
        style={{
          ...typeface,
          ...typescale,
          ...style,
        } as React.CSSProperties}
        ref={ref}
        {...props} />;
    });

  function buildScaleCollection(scale: Scale) {
    function build(size: Size) {
      return createComponent<HTMLElement, { tag: string; }>(
        function Render({ tag, className, children, ...props }, ref) {
          return React.createElement(tag, {
            ref,
            className: classMap({ [getClass(scale, size)]: true }, className),
            ...props
          }, children);
        });
    }
    return {
      Small: build("small"),
      Medium: build("medium"),
      Large: build("large"),
    };
  }

  export const Display = buildScaleCollection('display');
  export const Headline = buildScaleCollection('headline');
  export const Title = buildScaleCollection('title');
  export const Body = buildScaleCollection('body');
  export const Label = buildScaleCollection('label');
};


