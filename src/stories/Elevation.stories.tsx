import { Meta, StoryFn } from '@storybook/react';
import { Elevation } from '../components/elevation/Elevation';
import { Typography } from '../components/typography/Typography';

export default {
  component: Elevation,
} as Meta<typeof Elevation>;

const Template: StoryFn<typeof Elevation> = (args) =>
  <Elevation {...args} >
    <Typography.Headline4>Elevation</Typography.Headline4>
  </Elevation>;

export const Primary = Template.bind({});
Primary.args = {
  depth: 4,
};

export const Transition = Template.bind({});
Transition.args = {
  depth: 4,
  transition: true,
};

