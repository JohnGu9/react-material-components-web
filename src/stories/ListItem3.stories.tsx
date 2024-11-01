import { Meta, StoryFn } from '@storybook/react';
import { ListItem } from '../components3/list/ListItem';
import { Icon } from '../components3/icon/Icon';

export default {
  component: ListItem,
} as Meta<typeof ListItem>;

const Template: StoryFn<typeof ListItem> = (args) =>
  <ListItem
    start={<Icon>polymer</Icon>}
    end={<Icon>open_in_new</Icon>}
    headline="Headline"
    supportingText="Supporting Text"
    {...args} >Children</ListItem>;

export const PrimaryText = Template.bind({});
PrimaryText.args = {
  type: "button"
};

