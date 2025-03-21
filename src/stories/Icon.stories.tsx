import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '../components/icon/Icon';
import "material-icons/iconfont/material-icons.css";

export default {
  component: Icon,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) =>
  <Icon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'bookmark'
};

export const IconStyle = Template.bind({});
IconStyle.args = {
  children: 'pie_chart',
  iconStyle: "outlined",
};
