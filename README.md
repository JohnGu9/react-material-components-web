## Use

```jsx
import { Button } from "rmcw";

function MyComponent() {
  return <Button />;
}
```

## Sass bundle issue

Recently you may receive warning message from sass.
Just set your project sass version to `1.77.6` (in `dependencies` or `devDependencies`).
The Material Design 2 sass file will not be supported by sass 2.0. It has no effect on Material Design 3.

## What's the library for?

This library provide react wrapper for material design components.

## What's different between other wrapper library?

Under this library, the mdc's stats only follow react stats. This mean the mdc's stats would not change until react stats change. This library always sync the react stats and the mdc stats. (By default, mdc usually modify the element's stats automatically that make the mdc element out of control in react framework)

For example:

```jsx
const [open, setOpen] = React.useState(false);

<Dialog open={open}>{children}</Dialog>;
```

The dialog would be open when [open] is true and closed when [open] is false. And when user click the scrim, this library just only invoke [onScrimClick] callback and do nothing (dialog will keep open if open is true after click). No one can force you to close the dialog on fixed callback in the library (for example, in rmwc library if you don't close dialog in [onClose] callback, your react state will out of sync with mwc and component behave will be unpredictable).

If programmer want to close dialog when user click the scrim, the only way is:

```jsx
const [open, setOpen] = React.useState(false);

<Dialog open={open} onScrimClick={() => setOpen(false)}>
  {children}
</Dialog>;
```

This library will block most of mdc default behave that keep the dom state sync with react state. Including some input element, the state will keep sync without call Event.preventDefault() conditionally (Checkbox, Radio and etc).

But TextArea and TextField still keep normal react input control style. Use Event.preventDefault() to prevent state change conditionally.

## Compatible with React 18

You can enable [StrictMode] without error or warning message whatever you want. No legacy api use.

## Demo

Clone the repo and run the command

```console
npm i
npm run storybook
```

## Components (Material Design 3)

```
components3/
```

- Button
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
- Select
- Slider
- Switch
- Tabs
- TextField

> `Material Design 3` - Early access stage

> Some components are not no longer fully passive like before, you should keep trace the value change in the callback hook. (`Slider`)

> The components are not fully passive in `Material Design 2` still keep the same behavior like before. (`TextField`)

> Material Design 3 is not default import components. Material Design 2 would still be default for long time. You need to import Material Design 3 components from sub directory. For example `import { Button } from "rmcw/dist/components3"` 

> Font may not load properly. The way to work around is to import font file manually. Put `import "@fontsource/roboto";` in your own source file. This problem is caused by import side effect not working properly.

> Material Design 3 is not completed yet. https://github.com/material-components/material-web/blob/main/docs/roadmap.md

System Requirement:
| Browser | Version |
| -------- | ------- |
| Chrome | 120 + |
| Edge | 120 + |
| Firefox | 119 + |
| Safari\* | 16.4 + |

## Components (Material Design 2)

```
components/
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
- Snackbar
- Switch
- Tab
- TabBar
- TextArea
- TextField
- Tooltip
- TopAppBar
- Typography

## Additional Components

- Theme (Unified theme settings and better dark theme support)

```jsx
function ThemeSwitch() {
  /// false: force light theme
  /// true: force dark theme
  /// undefined: automatically (state from 'window.matchMedia('(prefers-color-scheme: dark)')')
  const [enableDarkTheme, setEnableDarkTheme] = React.useState(undefined);
  return <Theme enableDarkTheme={enableDarkTheme}>{myComponent}</Theme>;
}
```

- ListViewBuilder (beta) and DataTableBuilder (beta)
  Lazy build component. They build their children lazily.

```jsx
<ListViewBuilder
  itemExtent={48}
  itemCount={100}
  style={{ maxHeight: 400 }}
  childrenBuilder={(paddingStart, paddingEnd, childrenIndexes) => {
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
/>
```

- `childrenIndexes` is a number array. The range is `0 <= value < itemCount`
- `itemCount` is the amount of children.
- `itemExtent` is the every child element height. Should be fixed. For calculate the `paddingStart` and `paddingEnd` and `childrenIndexes`.

## Development requirement

If you use webpack, it require sass loader to pack [.scss] file into project (the project that come from "create-react-app" script already have sass loader).

If you use vite, nothing is required to do.
