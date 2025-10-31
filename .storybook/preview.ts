import type { Preview } from '@storybook/react-vite';
import "material-symbols/outlined.css";
import "material-icons/iconfont/material-icons.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
