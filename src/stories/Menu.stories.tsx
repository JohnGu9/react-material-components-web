import { Meta, StoryFn } from '@storybook/react';
import { Menu } from '../components/menu/Menu';

export default {
  component: Menu,
} as Meta<typeof Menu>;

const Template: StoryFn<typeof Menu> = (args) =>
  <Menu
    surface={<div style={{ padding: 16, paddingBottom: 64 }}>Surface</div>}
    style={{ width: 150, height: 100, borderStyle: 'dotted', margin: 32, marginBottom: 3000 }}
    {...args} >
    Anchor
  </Menu>;

export const Primary = Template.bind({});
Primary.args = {
  opened: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  opened: true,
};
