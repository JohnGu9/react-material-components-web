## What's the library for?

This library provide react wrapper for material design components.

## What's different between other wrapper library?

Under this library, the mdc's stats only follow react stats. This mean the mdc's stats would not change until react stats change. This library always sync the react stats and the mdc stats. (By default, mdc usually modify the element's stats automatically that make the mdc element out of control in react framework)

For example:

```jsx
const [open, setOpen] = React.useState(false);

<Dialog opened={open}>{children}</Dialog>;
```

The dialog would be opened when [open] is true and closed when [open] is false. And when user click the scrim, this library just only invoke [onScrimClick] callback and do nothing (not to close the dialog). No one force you to close the dialog on fixed callback in the library (for example, in rmwc library if you don't close dialog in [onClose] callback, your react state will out of sync with mwc and component behave will be unpredictable).

If programmer want to close dialog when user click the scrim, the only way is:

```jsx
const [open, setOpen] = React.useState(false);

<Dialog opened={open} onScrimClick={() => setOpen(false)}>
  {children}
</Dialog>;
```

## Compatible with react 18

You can enable [StrictMode] without error or warning message whatever you want. No legacy api use.

## Demo

Clone the repo and run the command

```console
npm i
npm run storybook
```

## Components

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
- Theme
- Tooltip
- TopAppBar
- Typography

## Development requirement

If you use webpack, require sass loader to pack [.scss] file into project. 
