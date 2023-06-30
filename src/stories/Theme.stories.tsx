import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';
import { Radio } from '../components/radio/Radio';
import { Theme } from '../components/theme/Theme';
import { Typography } from '../components/typography/Typography';

export default {
  component: Theme,
  argTypes: {
    primary: { control: { type: 'color', presetColors: ['#e57373'] } },
    secondary: { control: { type: 'color', presetColors: ['#e57373'] } },
    background: { control: { type: 'color', presetColors: ['#e57373'] } },
    surface: { control: { type: 'color', presetColors: ['#e57373'] } },
    onPrimary: { control: { type: 'color', presetColors: ['#e57373'] } },
    onSecondary: { control: { type: 'color', presetColors: ['#e57373'] } },
    onSurface: { control: { type: 'color', presetColors: ['#e57373'] } },
  }
} as Meta<typeof Theme>;

const Template: StoryFn<typeof Theme> = (args) =>
  <Theme {...args} >
    <Button label="Button" leading={<Icon>bookmark</Icon>} />
    <Radio checked onChange={() => { }} />
    <Typography.Subtitle1>Typography</Typography.Subtitle1>
  </Theme>;

export const Primary = Template.bind({});
Primary.args = {
  primary: '#e57373',
  secondary: '#e57373',
  background: '#e57373',
  surface: '#e57373',
  onPrimary: '#e57373',
  onSecondary: '#e57373',
  onSurface: '#e57373',
};
