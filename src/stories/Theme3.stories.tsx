import { Meta, StoryFn } from '@storybook/react-vite';
import { Theme } from '../components3/theme/Theme';
import { List } from '../components3/list/List';
import { Divider } from '../components3/divider/Divider';
import { ListItem } from '../components3/list/ListItem';

export default {
  component: Theme,
} as Meta<typeof Theme>;

const Template: StoryFn<typeof Theme> = (args) =>
  <Theme  {...args}>
    <List>
      <ListItem type="button">Fruits</ListItem>
      <Divider />
      <ListItem type="button">Apple</ListItem>
      <ListItem type="button">Banana</ListItem>
    </List>
  </Theme>
  ;

export const Primary = Template.bind({});
Primary.args = {
};
