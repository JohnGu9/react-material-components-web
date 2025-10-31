import { Meta, StoryFn } from '@storybook/react-vite';
import { IconButton } from '../components/icon-button/IconButton';
import { Icon } from '../components/icon/Icon';
import { Snackbar, useSnackbarController } from '../components/snackbar/Snackbar';
import { Button } from '../components';

export default {
  component: Snackbar,
} as Meta<typeof Snackbar>;

const Template: StoryFn<typeof Snackbar> = (args) =>
  <Snackbar action={<IconButton><Icon>close</Icon></IconButton>} {...args} >Snackbar</Snackbar>;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
};

export const Leading = Template.bind({});
Leading.args = {
  leading: true,
  open: true,
};

export const Stacked = Template.bind({});
Stacked.args = {
  stacked: true,
  open: true,
};


const Template0: StoryFn<typeof Snackbar> = (args) => {
  const { controller, props } = useSnackbarController();
  return <div>
    <Button buttonStyle='raised'
      onClick={e => {
        e.preventDefault();
        controller.post({
          children: "Message maybe delay",
          action: <IconButton><Icon>close</Icon></IconButton>,
        });
      }}>Post</Button>
    <div style={{ minWidth: 16 }} />
    <Button buttonStyle='raised'
      onClick={e => {
        e.preventDefault();
        controller.post({
          children: "Message immediately",
          action: <IconButton><Icon>close</Icon></IconButton>,
        }, true);
      }}>Post immediately</Button>
    <Snackbar {...args} {...props} />
  </div>;
};

export const SnackbarController = Template0.bind({});
SnackbarController.args = {
};
