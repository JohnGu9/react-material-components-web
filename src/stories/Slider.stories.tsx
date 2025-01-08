import { Meta, StoryFn } from '@storybook/react';
import { Slider } from '../components/slider/Slider';
import React from 'react';

export default {
  component: Slider,
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => {
  const [value, setValue] = React.useState(50);
  return <Slider value={value}
    {...args}
    onChange={setValue} />;
};

export const Primary = Template.bind({});
Primary.args = {
};

export const Step = Template.bind({});
Step.args = {
  step: 1,
};

export const TickMarks = Template.bind({});
TickMarks.args = {
  tickMarks: true,
  step: 5,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};


const NoOnChangeCallbackTemplate: StoryFn<typeof Slider> = (args) => {
  const [value,] = React.useState(50);
  return <Slider value={value} onChange={e => { }}  {...args} />;
};

export const NoOnChangeCallback = NoOnChangeCallbackTemplate.bind({});
NoOnChangeCallback.args = {
};
