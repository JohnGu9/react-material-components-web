import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../components3/button/Button';
import { Dialog } from '../components3/dialog/Dialog';

export default {
  component: Dialog,
} as Meta<typeof Dialog>;

const Template: StoryFn<typeof Dialog> = (args) =>
  <Dialog
    headline="Title"
    actions={<>
      <Button buttonStyle='text'>Cancel</Button>
      <Button buttonStyle='text'>OK</Button>
    </>}
    {...args}>
    Content
  </Dialog>;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
};
