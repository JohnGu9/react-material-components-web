import { Meta, StoryFn } from '@storybook/react';
import { LinearProgress } from '../components3/progress/LinearProgress';

export default {
  component: LinearProgress,
} as Meta<typeof LinearProgress>;

const Template: StoryFn<typeof LinearProgress> = (args) =>
  <LinearProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Progress = Template.bind({});
Progress.args = {
  value: 0.4,
  max: 1,
};

export const Buffer = Template.bind({});
Buffer.args = {
  value: 0.4,
  buffer: 0.6,
  max: 1,
};

