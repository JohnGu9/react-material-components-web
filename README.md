## QuickStart

```jsx
import { Button } from "rmcw";

function MyComponent() {
  return <Button>MyComponent</Button>;
}
```

## What is the purpose of the project?

This library provide react wrapper for Material Design components. Both Material Design 2 and 3. And the original design is almost intact.

## What's different between other libraries?

Under this library, the mdc's status only follow react status. This mean the mdc's status would not change until react status change. This library always sync the react status and the mdc status. (By default, mdc usually modify the element's status automatically that make the mdc element out of control in react framework)

For example:

```jsx
const [open, setOpen] = React.useState(false);

<Dialog open={open}>{children}</Dialog>;
```

The dialog would be open when `open` is true and closed when `open` is false. And when user click the scrim, this library just only invoke `onScrimClick` callback and do nothing (dialog will keep open if open is true after click). No one can force you to close the dialog on fixed callback in the library (for example, in rmwc library if you don't close dialog in `onClose` callback, your react state will out of sync with mwc and component behavior will be unpredictable).

If programmer want to close dialog when user click the scrim, the only way is:

```jsx
const [open, setOpen] = React.useState(false);

<Dialog open={open} onScrimClick={() => setOpen(false)}>
  {children}
</Dialog>;
```

This library will block most of mdc default behavior that keep the dom state sync with react state. Including some input element, the state will keep sync without call `Event.preventDefault()` conditionally (Checkbox, Radio and etc).

But Material Design 2 `TextArea` and `TextField` still keep normal react input control style. Use `Event.preventDefault()` to prevent state change conditionally in React 16 or before. Material Design 3 `TextField` will keep `value` sync without call `Event.preventDefault()`. Just like React 18.

## Compatible with React 18

You can enable [StrictMode](https://react.dev/reference/react/StrictMode) without error or warning message whatever you want. No legacy api use.

## Demo

Clone the repo and run storybook

```console
git clone https://github.com/JohnGu9/react-material-components-web.git
npm i
npm run storybook
```

## Components (Material Design 3)

```jsx
import { Button } from "rmcw/dist/components3"; // quick start
```

- Button
- Card (preview version)
- Checkbox
- Chip
- Dialog
- Divider
- Elevation
- Fab
- Icon
- IconButton
- List
- Menu (with MenuController)
- NavigationBar (preview version)
- NavigationDrawer (preview version)
- Progress
- Radio
- Ripple
- SegmentedButton (preview version)
- Select
- Slider
- Switch
- Tabs
- TextField
- Typography

> `Material Design 3` - Early access stage. Material Design 3 is not completed yet.

https://github.com/material-components/material-web/blob/main/docs/roadmap.md

https://github.com/material-components/material-web/discussions/5642

> Font may not load properly. The way to work around is to import font file manually. Put `import "@fontsource/roboto";` in your own source file. This problem is caused by import side effect not working properly.

> Material Design 3 is not default components for import. Material Design 2 would still be default for long time. You need to import Material Design 3 components from sub directory. For example `import { Button } from "rmcw/dist/components3"`. Material Design 3 is built on `Lit` and there are great stability risks with `React`. Material Design 2 is directly built on `React` and it would be fully compatible with `React`!

> Known bug: `TextField` not working in React 19. `Button` inside `Menu` not working in Safari.

System Requirement:
| Browser | Version |
| -------- | ------- |
| Chrome | 120 + |
| Edge | 120 + |
| Firefox | 119 + |
| Safari\* | 16.4 + |

## Components (Material Design 2)

```jsx
import { Button } from "rmcw"; // quick start
```

or

```jsx
import { Button } from "rmcw/dist/components"; // quick start
```

- Banner
- Button
- Card
- Checkbox
- Chip
- CircularProgress
- DataTable
- Dialog
- Drawer
- Elevation
- Fab
- Icon
- IconButton
- LinearProgress
- ListDivider
- ListItem
- Menu (with MenuController)
- Radio
- Ripple
- SegmentedButton
- Select
- Slider
- Snackbar (with SnackbarController)
- Switch
- Tab
- TabBar
- TextArea
- TextField
- Tooltip
- TopAppBar
- Typography

## Additional Components

- `Theme` (Unified theme settings and better dark theme support)

```jsx
import { Theme } from "rmcw"; // for Material Design 2

// import { Theme } from "rmcw/dist/components3"; // for Material Design 3

function ThemeSwitch() {
  const [enableDarkTheme, setEnableDarkTheme] = React.useState(undefined as (boolean | undefined));

  /* false: force light theme */
  /* true: force dark theme */
  /* undefined: automatically (state from 'window.matchMedia('(prefers-color-scheme: dark)')') */
  return <Theme enableDarkTheme={enableDarkTheme}>{myComponent}</Theme>;
}
```

- Material Design use `CSS custom properties` to custom color or font. You can just set CSS stylesheet of your project to custom your theme (Remember remove `Theme` from your project).

- Or check out `type ThemeData` from this library. Set the properties of `<Theme />` and the `<Theme />` will help you to set the CSS properties.

```jsx
// Material Design 2
import { Theme, ThemeData } from "rmcw/dist/components";

const myCustomTheme: ThemeData = {
 ...
};
const myCustomDarkTheme: ThemeData = {
 ...
};

<Theme {...myCustomTheme} darkTheme={myCustomDarkTheme}></Theme>
```

```jsx
// Material Design 3
import { Theme, ThemeData } from "rmcw/dist/components3";

const myCustomTheme: ThemeData = {
 ...
};
const myCustomDarkTheme: ThemeData = {
 ...
};

<Theme lightTheme={myCustomTheme} darkTheme={myCustomDarkTheme}></Theme>
```

## Note

Material Design 2 Icon use [material-icons](https://www.npmjs.com/package/material-icons) and Material Design 3 Icon use [material-symbols](https://www.npmjs.com/package/material-symbols)

`material-icons` source files (over 100KB each font file) and `material-symbols` source files (over 3MB each font file) is too large . So rmcw no longer import `material-icons` and `material-symbols`. You should import the font source files manually in your own source file.

```jsx
import "material-icons/iconfont/material-icons.css"; // import material-icons

import "material-symbols/outlined.css"; // import material-symbols outlined style, for OutlinedIcon (default style for material icon)
import "material-symbols/rounded.css"; // import material-symbols round style, for RoundedIcon
import "material-symbols/sharp.css"; // import material-symbols sharp style, for SharpIcon
```

Check out https://fonts.google.com/icons for available icons.

## Sass bundle issue \*

Recently you may receive warning message from sass.
Just set your project sass version to `1.77.6` (in `dependencies` or `devDependencies`).
The Material Design 2 sass file will not be supported by sass 2.0. It has no effect on Material Design 3.

## Caution

Before version 0.4.0, the build target is `es5`.

Version 0.4.0, the build target is `esnext`. You should use some bundle tool to help your bundle this project code into your own project (like `esbuild`). Set your tsconfig file `"module": "ESNext"` and build system (like `vite` config file `build.target`) to convert your code to target platform compatible code.

Why `esnext`?
Using `esnext` to compile this project and preform minimal transpiling. This can product less redundant code and reduce the package size for download.

## Development requirement

If you use [webpack](https://webpack.js.org), it require [sass loader](https://www.npmjs.com/package/sass-loader) to bundle [.scss] file into project (the project that come from "create-react-app" script already have [sass loader](https://www.npmjs.com/package/sass-loader)).

If you use [vite](https://vite.dev), nothing is required to do.
