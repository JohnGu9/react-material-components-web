import { Meta, StoryFn } from '@storybook/react';
import { TextArea } from '../components/text-area/TextArea';
import React from 'react';

export default {
  component: TextArea,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => {
  const [text, setText] = React.useState("");
  return <TextArea {...args} value={text} onChange={(e) => setText(e.target.value)} />;
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'Hint Text',
  helper: 'Helper',
};

export const Resize = Template.bind({});
Resize.args = {
  resize: true,
  cols: 50,
  rows: 3,
  label: 'Hint Text',
  helper: 'Helper',
};
