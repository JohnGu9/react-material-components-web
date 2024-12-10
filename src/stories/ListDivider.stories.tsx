import { Meta, StoryFn } from '@storybook/react';
import { Checkbox } from '../components/checkbox/Checkbox';
import { Icon } from '../components/icon/Icon';
import { ListDivider } from '../components/list-divider/ListDivider';
import { ListItem } from '../components/list-item/ListItem';

export default {
  component: ListDivider,
} as Meta<typeof ListDivider>;

const Template: StoryFn<typeof ListDivider> = (args) =>
  <>
    <ListItem primaryText="primaryText" graphic={<Icon>favorite</Icon>} meta={<Checkbox />} />
    <ListDivider {...args} />
    <ListItem primaryText="primaryText" graphic={<Icon>favorite</Icon>} meta={<Checkbox />} />
  </>;

export const Primary = Template.bind({});
Primary.args = {
  padding: false,
  leading: true,
  trailing: true,
};
