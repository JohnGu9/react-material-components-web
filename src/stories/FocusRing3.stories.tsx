import { Meta, StoryFn } from '@storybook/react-vite';
import { FocusRing } from '../components3/focus-ring/FocusRing';

export default {
  component: FocusRing,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof FocusRing>;

// `borderRadius` should match `shape`, or not to set `borderRadius` in the `style`
const Template: StoryFn<typeof FocusRing> = (args) =>
  <FocusRing style={{ height: 128, width: 128 }} shape='32px' {...args} >
    <div style={{ padding: 32 }}>FocusRing</div>
  </FocusRing>;

export const Primary = Template.bind({});
Primary.args = {
  inward: false
};
