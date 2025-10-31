import { Meta, StoryFn } from '@storybook/react-vite';
import { Radio } from '../components3/radio/Radio';

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
  checked: true,
};
