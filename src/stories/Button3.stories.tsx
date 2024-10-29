import { Meta, StoryFn } from '@storybook/react';
import { Button } from '../components3/button/Button';
import 'material-icons/iconfont/material-icons.css';

export default {
  component: Button,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Button>;


const Template: StoryFn<typeof Button> = (args) =>
  <Button {...args} >Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  buttonStyle: "elevated",
};

export const Icon = Template.bind({});
Icon.args = {
  disabled: false,
  icon: <svg viewBox="0 0 48 48"><path d="M6 40V8l38 16Zm3-4.65L36.2 24 9 12.5v8.4L21.1 24 9 27Zm0 0V12.5 27Z" /></svg>
};
