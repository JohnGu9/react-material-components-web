import { Meta, StoryFn } from '@storybook/react-vite';
import { Fab } from '../components/fab/Fab';
import { Icon } from '../components/icon/Icon';

export default {
  component: Fab,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Fab>;

const Template: StoryFn<typeof Fab> = (args) =>
  <Fab {...args} ><Icon>add</Icon></Fab>;

export const Primary = Template.bind({});
Primary.args = {
};

export const Mini = Template.bind({});
Mini.args = {
  mini: true,
};

export const Label = Template.bind({});
Label.args = {
  label: 'Add'
};

export const Exited = Template.bind({});
Exited.args = {
  exited: true,
};
