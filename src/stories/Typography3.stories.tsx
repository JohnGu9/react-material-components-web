import { Meta, StoryFn } from '@storybook/react';
import { Typography } from '../components3/typography/Typography';

export default {
  component: Typography.FontFamily,
} as Meta<typeof Typography.FontFamily>;

const Template: StoryFn<typeof Typography.FontFamily> = (args) =>
  <Typography.FontFamily {...args}>
    <Typography.Display.Large tag='div'>Display.Large</Typography.Display.Large>
    <Typography.Display.Medium tag='div'>Display.Medium</Typography.Display.Medium>
    <Typography.Display.Small tag='div'>Display.Small</Typography.Display.Small>
    <Typography.Headline.Large tag='div'>Headline.Large</Typography.Headline.Large>
    <Typography.Headline.Medium tag='div'>Headline.Medium</Typography.Headline.Medium>
    <Typography.Headline.Small tag='div'>Headline.Small</Typography.Headline.Small>
    <Typography.Title.Large tag='div'>Title.Large</Typography.Title.Large>
    <Typography.Title.Medium tag='div'>Title.Medium</Typography.Title.Medium>
    <Typography.Title.Small tag='div'>Title.Small</Typography.Title.Small>
    <Typography.Body.Large tag='div'>Body.Large</Typography.Body.Large>
    <Typography.Body.Medium tag='div'>Body.Medium</Typography.Body.Medium>
    <Typography.Body.Small tag='div'>Body.Small</Typography.Body.Small>
    <Typography.Label.Large tag='div'>Label.Large</Typography.Label.Large>
    <Typography.Label.Medium tag='div'>Label.Medium</Typography.Label.Medium>
    <Typography.Label.Small tag='div'>Label.Small</Typography.Label.Small>
  </Typography.FontFamily>;

export const Primary = Template.bind({});
Primary.args = {
};
