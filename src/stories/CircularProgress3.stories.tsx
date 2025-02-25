import { Meta, StoryFn } from '@storybook/react';
import { CircularProgress } from '../components3/progress/CircularProgress';

export default {
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof CircularProgress>;

const Template: StoryFn<typeof CircularProgress> = (args) =>
  <CircularProgress aria-label="Example Progress Bar" {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Progress = Template.bind({});
Progress.args = {
  value: 0.5,
  max: 1,
};

export const CustomTransition = Template.bind({});
CustomTransition.args = {
  value: 0.5,
  max: 1,
  style: { "--rmcw-circular-progress-transition": "none" } as React.CSSProperties,
};
