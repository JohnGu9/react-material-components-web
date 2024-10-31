import { Meta, StoryFn } from '@storybook/react';
import { Ripple } from '../components3/ripple/Ripple';

export default {
  component: Ripple,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Ripple>;

const Template: StoryFn<typeof Ripple> = (args) =>
  <Ripple style={{ borderRadius: 16 }} {...args} >
    <div style={{ width: 200, height: 200, borderStyle: 'dotted', borderRadius: 16 }} >Children</div>
  </Ripple>;

export const Primary = Template.bind({});
Primary.args = {
};


export const Unbounded = Template.bind({});
Unbounded.args = {
  unbounded: true,
};


