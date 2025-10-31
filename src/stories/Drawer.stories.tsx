import { Meta, StoryFn } from '@storybook/react-vite';
import { Drawer } from '../components/drawer/Drawer';
import { ListItem } from '../components/list-item/ListItem';

export default {
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Drawer>;

const Template: StoryFn<typeof Drawer> = (args) =>
  <Drawer
    title="Mail"
    subtitle="email@material.io"
    content={<div>
      <ListItem primaryText="ListItem" />
      <ListItem primaryText="ListItem" />
      <ListItem primaryText="ListItem" />
    </div>}
    {...args}>
    Main Content
  </Drawer>;

export const Standard = Template.bind({});
Standard.args = {
  open: true,
};

export const Model = Template.bind({});
Model.args = {
  type: 'modal',
  open: true,
};
