import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { Banner } from '../components/banner/Banner';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';

export default {
  component: Banner,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Banner>;

const Template: StoryFn<typeof Banner> = (args) =>
  <Banner opened {...args} >
    There was a problem processing a transaction on your credit card.
  </Banner>;

export const Primary = Template.bind({});
Primary.args = {
  opened: true,
  graphic: <Icon>error_outline</Icon>,
  primaryAction: <Button>Primary</Button>
};

export const Centered = Template.bind({});
Centered.args = {
  centered: true,
};

export const Graphic = Template.bind({});
Graphic.args = {
  graphic: <Icon>error_outline</Icon>
};

export const PrimaryAction = Template.bind({});
PrimaryAction.args = {
  primaryAction: <Button>Primary</Button>
};

export const SecondaryAction = Template.bind({});
SecondaryAction.args = {
  primaryAction: <Button>Primary</Button>,
  secondaryAction: <Button>Secondary</Button>,
};

export const MobileStacked = Template.bind({});
MobileStacked.args = {
  mobileStacked: true,
  primaryAction: <Button>Primary</Button>
};
