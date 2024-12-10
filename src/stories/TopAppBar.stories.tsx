import { Meta, StoryFn } from '@storybook/react';
import { IconButton } from '../components/icon-button/IconButton';
import { Icon } from '../components/icon/Icon';
import { ShortTopAppBar, TopAppBar } from '../components/top-app-bar/TopAppBar';

export default {
  component: TopAppBar,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof TopAppBar>;

const Template: StoryFn<typeof TopAppBar> = (args) =>
  <TopAppBar
    navigationIcon={<IconButton aria-label="Open navigation menu"><Icon>menu</Icon></IconButton>}
    title="Title"
    actionItem={<>
      <IconButton aria-label="Favorite"><Icon>favorite</Icon></IconButton>
      <IconButton aria-label="Search"><Icon>search</Icon></IconButton>
      <IconButton ria-label="Options"><Icon>more_vert</Icon></IconButton>
    </>}
    {...args}>
    Main Content
    <div style={{ height: 3000 }}></div>
  </TopAppBar>;

export const Primary = Template.bind({});
Primary.args = {
};

export const Fixed = Template.bind({});
Fixed.args = {
  fixed: true,
};

export const Prominent = Template.bind({});
Prominent.args = {
  prominent: true,
};

export const Dense = Template.bind({});
Dense.args = {
  dense: true,
};

const ShortTemplate: StoryFn<typeof ShortTopAppBar> = (args) =>
  <ShortTopAppBar
    navigationIcon={<IconButton aria-label="Open navigation menu"><Icon>menu</Icon></IconButton>}
    title="Title"
    actionItem={<IconButton ria-label="Options"><Icon>more_vert</Icon></IconButton>}
    {...args}>
    Main Content
    <div style={{ height: 3000 }}></div>
  </ShortTopAppBar>;

export const Short = ShortTemplate.bind({});
Short.args = {
};

export const ShortCollapsed = ShortTemplate.bind({});
ShortCollapsed.args = {
  collapsed: true,
};
