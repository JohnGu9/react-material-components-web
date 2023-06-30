import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { IconButton } from '../components/icon-button/IconButton';
import { Icon } from '../components/icon/Icon';

export default {
  component: IconButton,
} as Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = (args) =>
  <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Icon>favorite</Icon>
};
