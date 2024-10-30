import { Meta, StoryFn } from '@storybook/react';
import { Button } from '../components3/button/Button';
import { Icon } from '../components/icon/Icon';

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
  buttonStyle: "elevated",
};


export const IconButton = Template.bind({});
IconButton.args = {
  icon: <Icon>bookmark</Icon>
};
