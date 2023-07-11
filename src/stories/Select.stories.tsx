import { Meta, StoryFn } from '@storybook/react';
import { ListDivider } from '../components/list-divider/ListDivider';
import { ListItem } from '../components/list-item/ListItem';
import { Select } from '../components/select/Select';

export default {
  component: Select,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) =>
  <Select label="label"  {...args} >
    <ListItem primaryText="option0" />
    <ListItem primaryText="option1" />
    <ListItem primaryText="option2" />
    <ListDivider />
    <ListItem primaryText="option3" />
  </Select>;

export const Primary = Template.bind({});
Primary.args = {
};
