import { Meta, StoryFn } from '@storybook/react';
import { getActiveTabIndex, Tabs } from '../components3/tabs/Tabs';
import { MdTabs } from '@material/web/tabs/tabs';
import { Icon } from '../components3/icon/Icon';
import { Tab } from '../components3/tabs/Tab';
import React from 'react';

export default {
  component: Tabs,
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => {
  const [currentTab, setCurrentTab] = React.useState(1);
  console.log(currentTab);
  return (
    <Tabs {...args} activeTabIndex={currentTab}
      onChange={e => setCurrentTab(getActiveTabIndex(e.target as MdTabs))}>
      <Tab icon={<Icon>favorite</Icon>}>Favorite</Tab>
      <Tab icon={<Icon>search</Icon>}>Search</Tab>
      <Tab icon={<Icon>more_vert</Icon>}>Options</Tab>
    </Tabs>);
};

export const Primary = Template.bind({});
Primary.args = {
};


const InlineIconTemplate: StoryFn<typeof Tabs> = (args) => {
  const [currentTab, setCurrentTab] = React.useState(1);
  console.log(currentTab);
  return (
    <Tabs {...args} activeTabIndex={currentTab}
      onChange={e => setCurrentTab(getActiveTabIndex(e.target as MdTabs))}>
      <Tab icon={<Icon>favorite</Icon>} inlineIcon>Favorite</Tab>
      <Tab icon={<Icon>search</Icon>} inlineIcon>Search</Tab>
      <Tab icon={<Icon>more_vert</Icon>} inlineIcon>Options</Tab>
    </Tabs>)
};

export const InlineIcon = InlineIconTemplate.bind({});
InlineIcon.args = {
};



export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true
};
