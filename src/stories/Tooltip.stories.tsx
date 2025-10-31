import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../components/button/Button';
import { RichTooltip, RichTooltipLink, Tooltip } from '../components/tooltip/Tooltip';
import { Typography } from '../components/typography/Typography';

export default {
  component: Tooltip,
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) =>
  <Tooltip style={{ borderStyle: 'dotted', display: 'grid', justifyContent: 'center' }}  {...args} >
    <Typography.Subtitle1>Anchor</Typography.Subtitle1>
  </Tooltip>;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Tooltip'
};

const RichTemplate: StoryFn<typeof RichTooltip> = (args) =>
  <RichTooltip style={{ borderStyle: 'dotted', display: 'grid', justifyContent: 'center' }} {...args} >
    <Typography.Subtitle1>Anchor</Typography.Subtitle1>
  </RichTooltip>;

export const Rich = RichTemplate.bind({});
Rich.args = {
  title: 'Lorem Ipsum',
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
    aliquam sit amet sit amet eros.`,
  actions: <Button label='Action'></Button>,
};


export const Link = RichTemplate.bind({});
Link.args = {
  title: 'Lorem Ipsum',
  content: <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
    aliquam sit amet sit amet eros.
    <RichTooltipLink href="google.com">link</RichTooltipLink>
  </>,
  actions: <Button label='Action'></Button>,
};
