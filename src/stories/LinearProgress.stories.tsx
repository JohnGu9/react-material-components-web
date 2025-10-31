import { Meta, StoryFn } from '@storybook/react-vite';
import { LinearProgress } from '../components/linear-progress/LinearProgress';

export default {
  component: LinearProgress,
} as Meta<typeof LinearProgress>;

const Template: StoryFn<typeof LinearProgress> = (args) =>
  <LinearProgress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Close = Template.bind({});
Close.args = {
  closed: true,
};

export const Progress = Template.bind({});
Progress.args = {
  progress: 0.4,
};

export const Buffer = Template.bind({});
Buffer.args = {
  progress: 0.4,
  buffer: 0.6,
};

export const ProgressTransition = Template.bind({});
ProgressTransition.args = {
  progress: 0.4,
  progressTransition: {
    duration: '3s',
    easingFunction: 'ease',
  }
};
