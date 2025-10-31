import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../components/button/Button';
import { Card, CardMedia } from '../components/card/Card';
import { IconButton } from '../components/icon-button/IconButton';
import { Icon } from '../components/icon/Icon';
import { Typography } from '../components/typography/Typography';

export default {
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) =>
  <Card
    primaryAction={
      <div style={{ padding: 16 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
        aliquam sit amet sit amet eros.
      </div>}
    actionButtons={<>
      <Button label="Action 1"></Button>
      <Button label="Action 2"></Button>
    </>}
    actionIcons={<>
      <IconButton title="Share"><Icon>share</Icon></IconButton>
      <IconButton title="More options"><Icon>more_vert</Icon></IconButton>
    </>}
    {...args} >

  </Card>;

export const Primary = Template.bind({});
Primary.args = {
};

const TemplateWithMedia: StoryFn<typeof Card> = (args) =>
  <Card
    primaryAction={<CardMedia aspectRatio='16-9' style={{ backgroundImage: 'linear-gradient(red, yellow)' }}></CardMedia>}
    actionButtons={<>
      <Button label="Action 1"></Button>
      <Button label="Action 2"></Button>
    </>}
    actionIcons={<>
      <IconButton title="Share"><Icon>share</Icon></IconButton>
      <IconButton title="More options"><Icon>more_vert</Icon></IconButton>
    </>}
    {...args} >
    <div style={{ paddingLeft: 16, paddingRight: 16, }}>
      <Typography.Subtitle1>Title</Typography.Subtitle1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
      pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
      aliquam sit amet sit amet eros.
    </div>
  </Card>;

export const WithMedia = TemplateWithMedia.bind({});
WithMedia.args = {
};
