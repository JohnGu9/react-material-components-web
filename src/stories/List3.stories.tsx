import { Meta, StoryFn } from '@storybook/react-vite';
import { List } from '../components3/list/List';
import { Divider } from '../components3/divider/Divider';
import { ListItem } from '../components3/list/ListItem';

export default {
  component: List,
} as Meta<typeof List>;

const Template: StoryFn<typeof List> = (args) =>
  <List {...args}>
    <ListItem >Fruits</ListItem>
    <Divider />
    <ListItem >Apple</ListItem>
    <ListItem >Banana</ListItem>
  </List>;

export const Primary = Template.bind({});
Primary.args = {
};
