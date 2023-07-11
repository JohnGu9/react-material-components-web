import { Meta, StoryFn } from '@storybook/react';
import { Typography } from '../components/typography/Typography';

export default {
  component: Typography.FontFamily,
  argTypes: {
    family: {
      control: 'radio', options: [undefined, 'Arial, Helvetica, sans-serif']
    }
  }
} as Meta<typeof Typography.FontFamily>;

const Template: StoryFn<typeof Typography.FontFamily> = (args) =>
  <Typography.FontFamily {...args}>
    <Typography.Headline1>Headline1</Typography.Headline1>
    <Typography.Headline2>Headline2</Typography.Headline2>
    <Typography.Headline3>Headline3</Typography.Headline3>
    <Typography.Headline4>Headline4</Typography.Headline4>
    <Typography.Headline5>Headline5</Typography.Headline5>
    <Typography.Headline6>Headline6</Typography.Headline6>
    <Typography.Subtitle1>Subtitle1</Typography.Subtitle1>
    <Typography.Subtitle2>Subtitle2</Typography.Subtitle2>
    <Typography.Body1 style={{ display: 'block' }}>Body1</Typography.Body1>
    <Typography.Body2 style={{ display: 'block' }}>Body2</Typography.Body2>
    <Typography.Caption>Caption</Typography.Caption>
    <Typography.Button>Button</Typography.Button>
    <Typography.Overline>Overline</Typography.Overline>
  </Typography.FontFamily>;

export const Primary = Template.bind({});
Primary.args = {
  family: undefined,
};
