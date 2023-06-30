import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { IconButton } from '../components/icon-button/IconButton';
import { Icon } from '../components/icon/Icon';
import { Snackbar } from '../components/snackbar/Snackbar';

export default {
  component: Snackbar,
} as Meta<typeof Snackbar>;

const Template: StoryFn<typeof Snackbar> = (args) =>
  <Snackbar action={<IconButton><Icon>close</Icon></IconButton>} {...args} >Snackbar</Snackbar>;

export const Primary = Template.bind({});
Primary.args = {
  opened: true,
};

export const Leading = Template.bind({});
Leading.args = {
  leading: true,
  opened: true,
};

export const Stacked = Template.bind({});
Stacked.args = {
  stacked: true,
  opened: true,
};
