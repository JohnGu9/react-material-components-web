## QuickStart

```jsx
import { Button } from "rmcw";

function MyComponent() {
  return <Button>MyComponent</Button>;
}
```

## What's the library for?

This library provide react wrapper for Material Design components. Both Material Design 2 and 3. And the original design is almost intact.

## What's different between other wrapper libraries?

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
- Menu
- Progress
- Radio
- Ripple
- SegmentedButton (preview version)
- Select
- Slider
- Switch
- Tabs
- TextField

> `Material Design 3` - Early access stage. Material Design 3 is not completed yet. https://github.com/material-components/material-web/blob/main/docs/roadmap.md

> Font may not load properly. The way to work around is to import font file manually. Put `import "@fontsource/roboto";` in your own source file. This problem is caused by import side effect not working properly.

> Material Design 3 is not default components for import. Material Design 2 would still be default for long time. You need to import Material Design 3 components from sub directory. For example `import { Button } from "rmcw/dist/components3"`

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
- Menu
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

---

- `ListViewBuilder` (beta) and `DataTableBuilder` (beta).
  Lazy build component. They build their children lazily.

```jsx
import { ListViewBuilder } from "rmcw/dist/common/ListViewBuilder";

<ListViewBuilder
  itemExtent={48}
  itemCount={100}
  style={{ maxHeight: 400 }}
  childrenBuilder={(
    paddingStart: number,
    paddingEnd: number,
    childrenIndexes: number[]
  ) => {
    return (
      <>
        <div style={{ minHeight: paddingStart }} />
        {childrenIndexes.map((index) => (
          <ListItem key={index} primaryText={`ListItem-${index}`} />
        ))}
        <div style={{ minHeight: paddingEnd }} />
      </>
    );
  }}
/>;
```

- `itemCount` is the amount of children.
- `itemExtent` is the every child element height. Should be fixed. For calculate the `paddingStart` and `paddingEnd` and `childrenIndexes`.
- `paddingStart` / `paddingEnd` is the size padding inside the `ListViewBuilder`.
- `childrenIndexes` is the index of child that should be render right now. The range is `0 <= value < itemCount`. Update when scrolling or size changing.
- `ListViewBuilder` height should be set. It can change in real time.

## Note

`Icon` always comes with static icon font file (Material Design 2 use [material-icons](https://www.npmjs.com/package/material-icons) and Material Design 3 use [material-symbols](https://www.npmjs.com/package/material-symbols)). If you don't want to bundle the font file into your project build, do not import and use the `Icon` components.

Check out https://fonts.google.com/icons for available icons.

## Sass bundle issue \*

Recently you may receive warning message from sass.
Just set your project sass version to `1.77.6` (in `dependencies` or `devDependencies`).
The Material Design 2 sass file will not be supported by sass 2.0. It has no effect on Material Design 3.

## Development requirement

If you use [webpack](https://webpack.js.org), it require [sass loader](https://www.npmjs.com/package/sass-loader) to bundle [.scss] file into project (the project that come from "create-react-app" script already have [sass loader](https://www.npmjs.com/package/sass-loader)).

If you use [vite](https://vite.dev), nothing is required to do.
