import { Meta, StoryFn } from '@storybook/react';
import { IconButton } from '../components3/icon-button/IconButton';
import { Icon } from '../components3/icon/Icon';
import "material-symbols/outlined.css";

export default {
  component: IconButton,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = (args) =>
  <IconButton {...args} ><Icon>favorite</Icon></IconButton>;

export const Primary = Template.bind({});
Primary.args = {
};

export const ButtonStyle = Template.bind({});
ButtonStyle.args = {
  buttonStyle: "filled",
};
