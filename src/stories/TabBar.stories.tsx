import { Meta, StoryFn } from '@storybook/react-vite';
import { Icon } from '../components/icon/Icon';
import { TabBar } from '../components/tab-bar/TabBar';
import { Tab } from '../components/tab/Tab';

export default {
  component: TabBar,
} as Meta<typeof TabBar>;

const Template: StoryFn<typeof TabBar> = (args) =>
  <TabBar {...args} >
    <Tab icon={<Icon>favorite</Icon>} label="Favorite"></Tab>
    <Tab icon={<Icon>search</Icon>} label="Search"></Tab>
    <Tab icon={<Icon>more_vert</Icon>} label="Options"></Tab>
  </TabBar>;

export const Selected = Template.bind({});
Selected.args = {
  selected: 1,
};

export const Stacked = Template.bind({});
Stacked.args = {
  stacked: true,
};

export const MinWidth = Template.bind({});
MinWidth.args = {
  minWidth: true,
};
