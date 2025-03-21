import { Meta, StoryFn } from '@storybook/react';
import { IconButton } from '../components/icon-button/IconButton';
import { Icon } from '../components/icon/Icon';
import "material-icons/iconfont/material-icons.css";

export default {
  component: IconButton,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = (args) =>
  <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Icon>favorite</Icon>
};
