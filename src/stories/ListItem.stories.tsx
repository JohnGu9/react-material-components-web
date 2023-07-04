import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { Checkbox } from '../components/checkbox/Checkbox';
import { Icon } from '../components/icon/Icon';
import { ListDivider } from '../components/list-divider/ListDivider';
import { ListItem } from '../components/list-item/ListItem';
import { Radio } from '../components/radio/Radio';
import { IconButton } from '../components/icon-button/IconButton';

export default {
  component: ListItem,
} as Meta<typeof ListItem>;

const Template: StoryFn<typeof ListItem> = (args) =>
  <ListItem {...args} />;

export const PrimaryText = Template.bind({});
PrimaryText.args = {
  primaryText: 'PrimaryText'
};

export const SecondaryText = Template.bind({});
SecondaryText.args = {
  secondaryText: 'SecondaryText',
  primaryText: 'PrimaryText'
};

export const Graphic = Template.bind({});
Graphic.args = {
  graphic: <Icon>favorite</Icon>,
  primaryText: 'PrimaryText',
};

export const GraphicCheckbox = Template.bind({});
GraphicCheckbox.args = {
  graphic: <Checkbox readOnly />,
  primaryText: 'PrimaryText',
};

export const GraphicRadio = Template.bind({});
GraphicRadio.args = {
  graphic: <Radio readOnly />,
  primaryText: 'PrimaryText',
};

export const Meta0 = Template.bind({});
Meta0.args = {
  meta: 'meta',
  primaryText: 'PrimaryText',
};

export const MetaCheckbox = Template.bind({});
MetaCheckbox.args = {
  meta: <Checkbox readOnly />,
  primaryText: 'PrimaryText',
};

export const MetaRadio = Template.bind({});
MetaRadio.args = {
  meta: <Radio readOnly />,
  primaryText: 'PrimaryText',
};

export const MetaIcon = Template.bind({});
MetaIcon.args = {
  meta: <Icon>favorite</Icon>,
  primaryText: 'PrimaryText',
};

export const Full = Template.bind({});
Full.args = {
  graphic: <Icon>favorite</Icon>,
  primaryText: 'PrimaryText',
  secondaryText: 'SecondaryText',
  meta: <IconButton><Icon>more</Icon></IconButton>,
};

const NestedTemplate: StoryFn<typeof ListItem> = (args) =>
  <>
    <ListItem primaryText="ListItem" {...args} >
      <ListItem primaryText="Item" />
      <ListItem primaryText="Item" />
      <ListItem primaryText="Item" >
        <ListItem primaryText="E" />
        <ListItem primaryText="E" />
        <ListItem primaryText="E" />
      </ListItem>
      <ListDivider />
      <ListItem primaryText="Item" />
    </ListItem>
    <ListDivider />
    <ListItem primaryText="ListItem" />
  </>;

export const Nested = NestedTemplate.bind({});
