import { Meta, StoryFn } from '@storybook/react-vite';
import { Switch } from '../components3/switch/Switch';
import { Icon } from '../components3/icon/Icon';

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

export const OnIcon = Template.bind({});
OnIcon.args = {
  selected: true,
  icons: true,
  onIcon: <Icon style={{ padding: '4px 0' }}>settings</Icon>
};

export const OnlySelectedIcon = Template.bind({});
OnlySelectedIcon.args = {
  selected: false,
  icons: "show-only-selected-icon",
};
