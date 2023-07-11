import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '../components/icon/Icon';
import { Switch } from '../components/switch/Switch';

export default {
  component: Switch,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = (args) =>
  <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  selected: true,
};

export const Icons = Template.bind({});
Icons.args = {
  selected: true,
  on: <Icon>chevron_right</Icon>,
  off: <Icon>chevron_left</Icon>,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
