import { Meta, StoryFn } from '@storybook/react-vite';
import { Select } from '../components3/select/Select';
import { SelectOption } from '../components3/select/SelectOption';

export default {
  component: Select,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) =>
  <Select label="label" displayText='displayText' {...args} >
    <SelectOption headline="option0" selected />
    <SelectOption headline="option1" />
  </Select>;

export const Primary = Template.bind({});
Primary.args = {
};
