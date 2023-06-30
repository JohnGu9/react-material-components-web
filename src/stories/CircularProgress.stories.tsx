import { Meta, StoryFn } from '@storybook/react';
import { CircularProgress } from '../components/circular-progress/CircularProgress';

export default {
  component: CircularProgress,
  argTypes: {
    sizing: {
      control: 'radio', options: ['Large', 'Medium', 'Small']
    }
  }
} as Meta<typeof CircularProgress>;

const Template: StoryFn<typeof CircularProgress> = (args) =>
  <CircularProgress aria-label="Example Progress Bar" {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Progress = Template.bind({});
Progress.args = {
  progress: 0.5,
};

export const Close = Template.bind({});
Close.args = {
  closed: true,
};

export const Sizing = Template.bind({});
Sizing.args = {
  sizing: 'Small',
};
