import { Meta, StoryFn } from '@storybook/react-vite';
import { Icon } from '../components/icon/Icon';
import { TextField } from '../components/text-field/TextField';
import React from 'react';

export default {
  component: TextField,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => {
  const [text, setText] = React.useState("");
  return <TextField {...args} value={text} onChange={(e) => { console.log(e); setText(e.target.value); }} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Hint Text',
  helper: 'Helper',
  leadingIcon: <Icon>favorite</Icon>,
  prefix: '$',
  suffix: '.00',
  endAligned: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  label: "Invalid",
  invalid: true,
};

export const Activated = Template.bind({});
Activated.args = {
  label: "Activated",
  activated: true,
};

export const EndAligned = Template.bind({});
EndAligned.args = {
  label: "EndAligned",
  endAligned: true,
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
