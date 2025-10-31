import { Meta, StoryFn } from '@storybook/react-vite';
import { TextField } from '../components3/text-field/TextField';
import React from 'react';
import { Icon } from '../components3/icon/Icon';

export default {
  component: TextField,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => {
  const [text, setText] = React.useState("");
  return <TextField {...args} value={text} onChange={e => { console.log(e); setText(e.target.value); }} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Hint Text',
  supportingText: 'Helper',
  leadingIcon: <Icon>favorite</Icon>,
  prefixText: '$',
  suffixText: '.00',
  trailingIcon: <Icon>error</Icon>,
};

export const Number = Template.bind({});
Number.args = {
  type: "number",
  step: "2",
};

const NoOnChangeCallbackTemplate: StoryFn<typeof TextField> = (args) => {
  const [text,] = React.useState("NoOnChangeCallback");
  return <TextField {...args} value={text} />;
};

export const NoOnChangeCallback = NoOnChangeCallbackTemplate.bind({});
NoOnChangeCallback.args = {
};

const PreventDefaultTemplate: StoryFn<typeof TextField> = (args) => {
  const [text,] = React.useState("PreventDefault");
  return <TextField {...args} value={text} onChange={e => {
    console.log(e);
    e.preventDefault();
  }} />;
};

export const PreventDefault = PreventDefaultTemplate.bind({});
PreventDefault.args = {
};
