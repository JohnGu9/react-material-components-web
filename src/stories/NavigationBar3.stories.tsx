import { Meta, StoryFn } from '@storybook/react';
import { NavigationBar } from '../components3/navigation-bar/NavigationBar';
import { NavigationTab } from '../components3/navigation-bar/NavigationTab';
import { Icon } from '../components3/icon/Icon';
import { useState } from 'react';

export default {
  component: NavigationBar,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof NavigationBar>;

const Template: StoryFn<typeof NavigationBar> = (args) => {
  const [activeIndex, setActiveIndex] = useState(1);
  return <div style={{ width: 325 }}>
    <NavigationBar {...args} activeIndex={activeIndex} onInteraction={event => setActiveIndex(event.detail.index)} >
      <NavigationTab label='Favorite' inactiveIcon={<Icon>favorite</Icon>} icon={<Icon>notifications_active</Icon>} />
      <NavigationTab label='Search' inactiveIcon={<Icon>search</Icon>} icon={<Icon>notifications_active</Icon>} />
      <NavigationTab label='Options' inactiveIcon={<Icon>more_vert</Icon>} icon={<Icon>notifications_active</Icon>} />
    </NavigationBar>
  </div>;
};

export const Primary = Template.bind({});
Primary.args = {
};

const Template0: StoryFn<typeof NavigationBar> = (args) => {
  return <div style={{ width: 325 }}>
    <NavigationBar {...args}  >
      <NavigationTab label='Favorite' inactiveIcon={<Icon>favorite</Icon>} icon={<Icon>notifications_active</Icon>} />
      <NavigationTab label='Search' inactiveIcon={<Icon>search</Icon>} icon={<Icon>notifications_active</Icon>} />
      <NavigationTab label='Options' inactiveIcon={<Icon>more_vert</Icon>} icon={<Icon>notifications_active</Icon>} />
    </NavigationBar>
  </div>;
};

export const NoOnInteractionCallback = Template0.bind({});
NoOnInteractionCallback.args = {
  activeIndex: 1
};
