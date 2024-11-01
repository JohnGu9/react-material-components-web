import { Meta, StoryFn } from '@storybook/react';
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
  return <TextField {...args} value={text} onChange={(e) => setText((e.target as HTMLInputElement).value)} />
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

