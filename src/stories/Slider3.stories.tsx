import { Meta, StoryFn } from '@storybook/react';
import { getSliderRange, getSliderValue, Slider } from '../components3/slider/Slider';
import React from 'react';
import { MdSlider } from '@material/web/slider/slider';

export default {
  component: Slider,
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => {
  const [value, setValue] = React.useState(50);
  return <Slider value={value}
    {...args}
    onChange={e => {
      setValue(getSliderValue(e.target as MdSlider));
    }}
    onInput={e => {
      setValue(getSliderValue(e.target as MdSlider));
    }} />
};

export const Primary = Template.bind({});
Primary.args = {
};

const RangeTemplate: StoryFn<typeof Slider> = (args) => {
  const [value, setValue] = React.useState({ start: 20, end: 80 });
  return <Slider value={value}
    {...args}
    onChange={e => {
      setValue(getSliderRange(e.target as MdSlider));
    }}
    onInput={e => {
      setValue(getSliderRange(e.target as MdSlider));
    }} />
};

export const Range = RangeTemplate.bind({});
Range.args = {
};

