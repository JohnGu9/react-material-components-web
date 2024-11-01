import { Meta, StoryFn } from '@storybook/react';
import { Elevation } from '../components3/elevation/Elevation';

export default {
  component: Elevation,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Elevation>;

const Template: StoryFn<typeof Elevation> = (args) =>
  <Elevation style={{ height: 128, width: 128, borderRadius: 16, }} {...args} >
    <div style={{ padding: 32 }}>Elevation</div>
  </Elevation>;

export const Primary = Template.bind({});
Primary.args = {
  level: 1,
};

export const Transition = Template.bind({});
Transition.args = {
  level: 1,
  transition: "250ms ease-in-out"
};

