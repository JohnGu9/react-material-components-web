import { Meta, StoryFn } from '@storybook/react-vite';
import { AssistChip, FilterChip, InputChip, SuggestionChip } from '../components3/chip/Chip';
import { ChipSet } from '../components3/chip/ChipSet';
import { Icon } from '../components3/icon/Icon';

export default {
  component: FilterChip,
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    }
  },
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof FilterChip>;

const Template: StoryFn<typeof FilterChip> = (args) =>
  <ChipSet><AssistChip label='AssistChip' /><FilterChip label='FilterChip' {...args} /><InputChip label='InputChip' onRemoveClick={e => console.log(e)} /><SuggestionChip label='SuggestionChip' /></ChipSet>;

export const Primary = Template.bind({});
Primary.args = {
};


const FilterChipTemplate: StoryFn<typeof FilterChip> = (args) =>
  <ChipSet><FilterChip label='FilterChip' icon={<Icon>bookmark</Icon>} {...args} /></ChipSet>;
export const Clip = FilterChipTemplate.bind({});
Clip.args = {
  onRemoveClick: e => console.log(e)
};
