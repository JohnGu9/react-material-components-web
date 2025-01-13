// If you want to use default roboto font, import this file
// If you want to use custom font, import the `TypographyWithoutFont.tsx`

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

import "@fontsource/roboto";

import { Typography } from "./TypographyWithoutFont";
export { Typography };
