import { Meta, StoryFn } from '@storybook/react';
import { Slider } from '../components/slider/Slider';

export default {
  component: Slider,
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) =>
  <Slider {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 50,
};

export const Step = Template.bind({});
Step.args = {
  step: 1,
  value: 50,
};

export const TickMarks = Template.bind({});
TickMarks.args = {
  tickMarks: true,
  step: 5,
  value: 50,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 50,
};
