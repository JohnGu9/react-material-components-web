import { Meta, StoryFn } from '@storybook/react-vite';
import { Menu, useMenuController } from '../components/menu/Menu';
import { Button } from '../components';

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
  open: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  open: true,
};

const Template0: StoryFn<typeof Menu> = (args) => {
  const { controller, props } = useMenuController();
  return <Menu
    surface={<div style={{ padding: 16, paddingBottom: 64 }}>Surface</div>}
    style={{ width: 150, height: 100, borderStyle: 'dotted', margin: 32, marginBottom: 3000 }}
    {...args} {...props}>
    <Button onClick={e => {
      e.preventDefault();
      controller.open();
    }}>open</Button>
  </Menu>;
};

export const MenuController = Template0.bind({});
MenuController.args = {
};

