import { Meta, StoryFn } from '@storybook/react';
import { Checkbox } from '../components/checkbox/Checkbox';
import { FormField } from '../components/form-field/FormField';
import { Radio } from '../components/radio/Radio';

export default {
  component: FormField,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof FormField>;

const Template: StoryFn<typeof FormField> = (args) =>
  <FormField {...args}>
    FormField Label
  </FormField>;

export const WithCheckbox = Template.bind({});
WithCheckbox.args = {
  input: <Checkbox inputId='MyInput'></Checkbox>,
};

export const WithRadio = Template.bind({});
WithRadio.args = {
  input: <Radio inputId='MyInput'></Radio>,
};
