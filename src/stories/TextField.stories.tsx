import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
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
  return <TextField {...args} value={text} onChange={(e) => setText(e.target.value)} />
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
}

export const Activated = Template.bind({});
Activated.args = {
  label: "Activated",
  activated: true,
}

export const EndAligned = Template.bind({});
EndAligned.args = {
  label: "EndAligned",
  endAligned: true,
}
