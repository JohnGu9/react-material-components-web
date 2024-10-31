# Web Component

Material design 3 bases on `Web Component`.

To use `Web Component` in `React`, the `Web Component` should be wrapped by `@lit/react`.

For example:

```jsx
import { createComponent } from "@lit/react";
import { MdElevatedButton } from "@material/web/button/elevated-button";
import React from "react";

// wrapped
export const MdElevatedButtonComponent = createComponent({
  tagName: "md-elevated-button",
  elementClass: MdElevatedButton,
  react: React,
});
```

```jsx
// use the wrapper
function MyReactComponent() {
  return <MdElevatedButtonComponent />;
}
```
