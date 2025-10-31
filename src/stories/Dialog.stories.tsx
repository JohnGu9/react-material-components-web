import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../components/button/Button';
import { Dialog } from '../components/dialog/Dialog';

export default {
  component: Dialog,
} as Meta<typeof Dialog>;

const Template: StoryFn<typeof Dialog> = (args) =>
  <Dialog open title="Title"
    actions={<>
      <Button>Cancel</Button>
      <Button>OK</Button>
    </>}
    {...args}>
    Content
  </Dialog>;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
};

export const FullScreen = Template.bind({});
FullScreen.args = {
  fullscreen: true,
  open: true,
};

export const NoContentPadding = Template.bind({});
NoContentPadding.args = {
  noContentPadding: true,
  open: true,
};

export const Stacked = Template.bind({});
Stacked.args = {
  stacked: true,
  open: true,
};
