import { Meta, StoryFn } from '@storybook/react';
import { Checkbox } from '../components/checkbox/Checkbox';

export default {
  component: Checkbox,
  argTypes: {
    checked: {
      options: [true, false, "mixed"],
      control: { type: 'radio' },
    }
  },
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) =>
  <Checkbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  checked: "mixed",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
