import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { Icon } from '../components/icon/Icon';
import { SegmentedButton, Segment } from '../components/segmented-button/SegmentedButton';

export default {
  component: SegmentedButton,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof SegmentedButton>;

const Template: StoryFn<typeof SegmentedButton> = (args) =>
  <SegmentedButton {...args} >
    <Segment icon={<Icon>favorite</Icon>} />
    <Segment icon={<Icon>favorite</Icon>} label="Sample Text" />
    <Segment label="Sample Text" selected />
  </SegmentedButton>;

export const Primary = Template.bind({});
Primary.args = {
};
