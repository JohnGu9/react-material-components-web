import "@material/floating-label/mdc-floating-label.scss";
import { Meta, StoryFn } from '@storybook/react';
import { FloatingLabel } from '../components/floating-label/FloatingLabel';

export default {
  component: FloatingLabel,
} as Meta<typeof FloatingLabel>;

const Template: StoryFn<typeof FloatingLabel> = (args) =>
  <FloatingLabel {...args} >FloatingLabel</FloatingLabel>;

export const Shake = Template.bind({});
Shake.args = {
  shake: true,
  float: true,
};

export const Float = Template.bind({});
Float.args = {
  float: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};
