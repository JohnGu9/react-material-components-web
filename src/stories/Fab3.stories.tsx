import { Meta, StoryFn } from '@storybook/react';
import { Fab } from '../components3/fab/Fab';
import { BrandedFab } from '../components3/fab/BrandedFab';
import { Icon } from '../components3/icon/Icon';

export default {
  component: Fab,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof Fab>;

const Template: StoryFn<typeof Fab> = (args) =>
  <Fab label='Fab' icon={<Icon>add</Icon>} {...args} ></Fab>;

export const Primary = Template.bind({});
Primary.args = {
};

const IconTemplate: StoryFn<typeof Fab> = (args) =>
  <Fab icon={<Icon>add</Icon>} {...args} ></Fab>;

export const IconOnly = IconTemplate.bind({});
IconOnly.args = {
};

const Textemplate: StoryFn<typeof Fab> = (args) =>
  <Fab label='Fab' {...args} ></Fab>;

export const TextOnly = Textemplate.bind({});
TextOnly.args = {
};


const BrandedFabTemplate: StoryFn<typeof BrandedFab> = (args) =>
  <BrandedFab label='BrandedFab' icon={<Icon>add</Icon>} {...args} ></BrandedFab>;

export const BrandedFabPrimary = BrandedFabTemplate.bind({});
BrandedFabPrimary.args = {
};

const BrandedFabIconTemplate: StoryFn<typeof BrandedFab> = (args) =>
  <BrandedFab icon={<Icon>add</Icon>} {...args} ></BrandedFab>;

export const BrandedFabIconOnly = BrandedFabIconTemplate.bind({});
BrandedFabIconOnly.args = {
};

const BrandedFabTextOnlyTemplate: StoryFn<typeof BrandedFab> = (args) =>
  <BrandedFab label='BrandedFab' {...args} ></BrandedFab>;

export const BrandedFabTextOnly = BrandedFabTextOnlyTemplate.bind({});
BrandedFabTextOnly.args = {
};
