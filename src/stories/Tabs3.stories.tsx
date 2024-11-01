import { Meta, StoryFn } from '@storybook/react';
import { getActiveTabIndex, Tabs } from '../components3/tabs/Tabs';
import { PrimaryTab } from '../components3/tabs/PrimaryTab';
import { MdTabs } from '@material/web/tabs/tabs';
import React from 'react';
import { Icon } from '../components3/icon/Icon';
import { SecondaryTab } from '../components3/tabs/SecondaryTab';

export default {
  component: Tabs,
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => {
  const [currentTab, setCurrentTab] = React.useState(1);
  console.log(currentTab);
  return (
    <Tabs {...args} activeTabIndex={currentTab}
      onChange={e => setCurrentTab(getActiveTabIndex(e.target as MdTabs))}>
      <PrimaryTab icon={<Icon>favorite</Icon>}>Favorite</PrimaryTab>
      <PrimaryTab icon={<Icon>search</Icon>}>Search</PrimaryTab>
      <PrimaryTab icon={<Icon>more_vert</Icon>}>Options</PrimaryTab>
    </Tabs>)
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
      <PrimaryTab icon={<Icon>favorite</Icon>} inlineIcon>Favorite</PrimaryTab>
      <PrimaryTab icon={<Icon>search</Icon>} inlineIcon>Search</PrimaryTab>
      <PrimaryTab icon={<Icon>more_vert</Icon>} inlineIcon>Options</PrimaryTab>
    </Tabs>)
};

export const InlineIcon = InlineIconTemplate.bind({});
InlineIcon.args = {
};


const SecondaryTemplate: StoryFn<typeof Tabs> = (args) => {
  const [currentTab, setCurrentTab] = React.useState(1);
  console.log(currentTab);
  return (
    <Tabs {...args} activeTabIndex={currentTab}
      onChange={e => setCurrentTab(getActiveTabIndex(e.target as MdTabs))}>
      <SecondaryTab icon={<Icon>favorite</Icon>}>Favorite</SecondaryTab>
      <SecondaryTab icon={<Icon>search</Icon>}>Search</SecondaryTab>
      <SecondaryTab icon={<Icon>more_vert</Icon>}>Options</SecondaryTab>
    </Tabs>)
};

export const Secondary = SecondaryTemplate.bind({});
Secondary.args = {
};
