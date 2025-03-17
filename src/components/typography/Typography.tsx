import "@material/typography/mdc-typography.scss";
import React from "react";
import { classMap, createComponent } from "../../common/Common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Typography {
  export type Scale =
    'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6' |
    'subtitle1' | 'subtitle2' |
    'body1' | 'body2' |
    'caption' | 'button' | 'overline';

  export type Properties =
    'font-family' |
    'font-size' |
    'line-height' |
    'font-weight' |
    'letter-spacing' |
    'text-decoration' |
    'text-transform';

  export type ScaleProperties<T extends Scale> = {
    [E in Properties as `--mdc-typography-${T}-${E}`]?: string | number;
  };

  export type FontFamilyProps = { family?: string; } & { [T in Scale]?: ScaleProperties<T> };

  export const FontFamily = createComponent<HTMLDivElement, FontFamilyProps>(
    function Render({
      family,
      headline1,
      headline2,
      headline3,
      headline4,
      headline5,
      headline6,
      subtitle1,
      subtitle2,
      body1,
      body2,
      caption,
      button,
      overline,
      children,
      className,
      style,
      ...props }, ref) {
      const classes = { 'mdc-typography': true };
      return <div className={classMap(classes, className)} style={{
        '--mdc-typography-font-family': family,
        ...headline1,
        ...headline2,
        ...headline3,
        ...headline4,
        ...headline5,
        ...headline6,
        ...subtitle1,
        ...subtitle2,
        ...body1,
        ...body2,
        ...caption,
        ...button,
        ...overline,
        ...style,
      } as React.CSSProperties} ref={ref} {...props}>{children}</div>;
    });

  type E<T> = T extends React.DetailedHTMLProps<React.HTMLAttributes<infer E>, infer E> ? E : never;
  type TagToElementType<T extends keyof JSX.IntrinsicElements> = E<JSX.IntrinsicElements[T]>;

  type TagToScaleBase = { [s in keyof JSX.IntrinsicElements]: Scale; };
  interface TagToScaleRecommend {
    h1: 'headline1';
    h2: 'headline2';
    h3: 'headline3';
    h4: 'headline4';
    h5: 'headline5';
    h6: 'headline6';
    p: 'subtitle1' | 'subtitle2';
    span: 'body1' | 'body2';
    div: 'caption' | 'button' | 'overline',
  };
  type TagToScale = TagToScaleRecommend & Omit<TagToScaleBase, keyof TagToScaleRecommend>;

  function isScale(s: string): s is Scale {
    switch (s) {
      case 'headline1':
      case 'headline2':
      case 'headline3':
      case 'headline4':
      case 'headline5':
      case 'headline6':
      case 'subtitle1':
      case 'subtitle2':
      case 'body1':
      case 'body2':
      case 'caption':
      case 'button':
      case 'overline':
        return true;
    }
    return false;
  }

  export function buildTypography<T extends keyof TagToScale, S extends Scale = TagToScale[T], Element = TagToElementType<T>>(tag: T, scale: S) {
    if (!isScale(scale)) throw Error("Parameter [scale]'s type is not [Scale]. ");
    return createComponent<Element, { style?: ScaleProperties<S> & React.CSSProperties; }>(
      function Render({ className, ...props }, ref) {
        return React.createElement(tag, {
          className: classMap({ [`mdc-typography--${scale}`]: true }, className),
          ref, ...props,
        });
      });
  }

  export const Headline1 = buildTypography('h1', 'headline1');
  export const Headline2 = buildTypography('h2', 'headline2');
  export const Headline3 = buildTypography('h3', 'headline3');
  export const Headline4 = buildTypography('h4', 'headline4');
  export const Headline5 = buildTypography('h5', 'headline5');
  export const Headline6 = buildTypography('h6', 'headline6');

  export const Subtitle1 = buildTypography('p', 'subtitle1');
  export const Subtitle2 = buildTypography('p', 'subtitle2');

  export const Body1 = buildTypography('span', 'body1');
  export const Body2 = buildTypography('span', 'body2');

  export const Caption = buildTypography('div', 'caption');
  export const Button = buildTypography('div', 'button');
  export const Overline = buildTypography('div', 'overline');
};

