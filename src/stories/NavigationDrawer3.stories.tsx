import { Meta, StoryFn } from '@storybook/react';
import { NavigationDrawer, NavigationDrawerModal, NavigationDrawerPadding, Drawer as RmcwDrawer } from '../components3/navigation-drawer/NavigationDrawer';
import { List } from '../components3/list/List';
import { Divider } from '../components3/divider/Divider';
import { ListItem } from '../components3/list/ListItem';

export default {
  component: NavigationDrawer,
  parameters: {
    layout: 'fullscreen',
  }
} as Meta<typeof NavigationDrawer>;

const Template: StoryFn<typeof NavigationDrawer> = ({ opened, ...args }) =>
  <div style={{ position: "relative", height: 400 }}>
    <NavigationDrawer style={{ position: "absolute" }} opened={opened} {...args}>
      <List >
        <ListItem type='button'>Fruits</ListItem>
        <Divider />
        <ListItem type='button'>Apple</ListItem>
        <ListItem type='button'>Banana</ListItem>
      </List>
    </NavigationDrawer>
    <NavigationDrawerPadding opened={opened}>
      Main Content
    </NavigationDrawerPadding>
  </div>;

export const Primary = Template.bind({});
Primary.args = {
  opened: true
};

const Template0: StoryFn<typeof NavigationDrawerModal> = (args) =>
  <div style={{ position: "relative", height: 400 }}>
    <NavigationDrawerModal {...args}>
      <List >
        <ListItem type='button'>Fruits</ListItem>
        <Divider />
        <ListItem type='button'>Apple</ListItem>
        <ListItem type='button'>Banana</ListItem>
      </List>
    </NavigationDrawerModal>
    Main Content
  </div>;

export const Modal = Template0.bind({});
Modal.args = {
  opened: true
};


const Template1: StoryFn<typeof RmcwDrawer> = (args) =>
  <RmcwDrawer
    style={{ height: 600 }}
    content={<List >
      <ListItem type='button'>Fruits</ListItem>
      <Divider />
      <ListItem type='button'>Apple</ListItem>
      <ListItem type='button'>Banana</ListItem>
    </List>}
    {...args}>
    Main Content
  </RmcwDrawer>;

export const Drawer = Template1.bind({});
Drawer.args = {
  opened: true,
  type: "dismissible",
};
