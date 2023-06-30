import { Meta, StoryFn } from '@storybook/react';
import { Radio } from '../components/radio/Radio';

export default {
  component: Radio,
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
