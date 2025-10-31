import { Meta, StoryFn } from '@storybook/react-vite';
import { Slider } from '../components3/slider/Slider';
import React from 'react';

export default {
  component: Slider,
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = ({ valueStart, ...args }) => {
  const [value, setValue] = React.useState(50);
  return <Slider value={value}
    {...args}
    onChange={e => {
      setValue(e.target.value!);
    }} />
};

export const Primary = Template.bind({});
Primary.args = {
};

const RangeTemplate: StoryFn<typeof Slider> = ({ value: _, ...args }) => {
  const [value, setValue] = React.useState({ start: 20, end: 80 });
  return <Slider
    valueStart={value.start}
    valueEnd={value.end}
    {...args}
    onChange={e => {
      setValue({ start: e.target.valueStart!, end: e.target.valueEnd! });
    }} />
};

export const Range = RangeTemplate.bind({});
Range.args = {
};


const NoOnChangeCallbackTemplate: StoryFn<typeof Slider> = ({ valueStart, ...args }) => {
  const [value,] = React.useState(50);
  return <Slider value={value}  {...args} />
};

export const NoOnChangeCallback = NoOnChangeCallbackTemplate.bind({});
NoOnChangeCallback.args = {
};
