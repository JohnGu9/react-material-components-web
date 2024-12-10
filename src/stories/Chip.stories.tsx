import { Meta, StoryFn } from '@storybook/react';
import { Chip, ChipSet } from '../components/chip/Chip';
import { Icon } from '../components/icon/Icon';

export default {
  component: Chip,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = (args) =>
  <ChipSet><Chip>Front</Chip><Chip {...args}>Chip</Chip><Chip>Back</Chip></ChipSet>;

export const Primary = Template.bind({});
Primary.args = {
};

export const Graphic = Template.bind({});
Graphic.args = {
  graphic: <Icon>favorite</Icon>,
};

export const Trailing = Template.bind({});
Trailing.args = {
  trailing: <Icon>close</Icon>,
};
