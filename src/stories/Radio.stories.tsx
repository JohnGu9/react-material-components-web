import { Meta, StoryFn } from '@storybook/react-vite';
import { Radio } from '../components/radio/Radio';

export default {
  component: Radio,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Radio>;

const Template: StoryFn<typeof Radio> = (args) =>
  <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
