import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';

export default {
  component: Button,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) =>
  <Button label='Button' {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const ButtonStyle = Template.bind({});
ButtonStyle.args = {
  buttonStyle: "outlined",
};

export const Leading = Template.bind({});
Leading.args = {
  leading: <Icon>bookmark</Icon>
};

export const Trailing = Template.bind({});
Trailing.args = {
  trailing: <Icon>bookmark</Icon>
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

