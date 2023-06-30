import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { Icon } from '../components/icon/Icon';

export default {
  component: Icon,
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) =>
  <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'bookmark'
};
