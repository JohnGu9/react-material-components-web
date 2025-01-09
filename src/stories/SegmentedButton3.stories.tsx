import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '../components3/icon/Icon';
import { SegmentedButton } from '../components3/segmented-button/SegmentedButton';
import { SegmentedButtonSet } from '../components3/segmented-button/SegmentedButtonSet';

export default {
  component: SegmentedButton,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof SegmentedButton>;

const Template: StoryFn<typeof SegmentedButtonSet> = (args) =>
  <SegmentedButtonSet {...args} >
    <SegmentedButton icon={<Icon>favorite</Icon>} />
    <SegmentedButton icon={<Icon>favorite</Icon>} label="Sample Text" />
    <SegmentedButton label="Sample Text" selected />
  </SegmentedButtonSet>;

export const Primary = Template.bind({});
Primary.args = {
};


const _SegmentedButton: StoryFn<typeof SegmentedButton> = (args) =>
  <SegmentedButtonSet  >
    <SegmentedButton icon={<Icon>favorite</Icon>} />
    <SegmentedButton icon={<Icon>favorite</Icon>} label="Sample Text" {...args} />
    <SegmentedButton label="Sample Text" selected />
  </SegmentedButtonSet>;

export const Selected = _SegmentedButton.bind({});
Selected.args = {
  selected: true
};
