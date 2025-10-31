import { Meta, StoryFn } from '@storybook/react-vite';
import { Ripple } from '../components/ripple/Ripple';

export default {
  component: Ripple,
  argTypes: {
    color: {
      control: 'radio', options: [undefined, 'primary', 'accent']
    }
  },
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Ripple>;

const Template: StoryFn<typeof Ripple> = (args) =>
  <Ripple style={{ width: 300, height: 200, borderStyle: 'dotted' }} {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Color = Template.bind({});
Color.args = {
  color: 'primary',
};

export const Unbounded = Template.bind({});
Unbounded.args = {
  unbounded: true,
};

export const Activated = Template.bind({});
Activated.args = {
  activated: true,
};
