import { Meta, StoryFn } from '@storybook/react';
import { Menu } from '../components3/menu/Menu';
import { MenuItem } from '../components3/menu/MenuItem';
import { SubMenu } from '../components3/menu/SubMenu';
import { Icon } from '../components3/icon/Icon';

export default {
  component: Menu,
} as Meta<typeof Menu>;

const Template: StoryFn<typeof Menu> = (args) =>
  <Menu
    {...args}
    surface={<>
      <MenuItem headline="Apple" />
      <MenuItem headline="Banana" />
      <MenuItem headline="Cucumber" />
    </>}
    anchor="usage-anchor">
    <div style={{ width: 150, height: 100, border: "solid", borderRadius: 8 }}>
      Anchor
    </div>
  </Menu>;

export const Primary = Template.bind({});
Primary.args = {
  open: true,
};


const SubMenuTemplate: StoryFn<typeof Menu> = (args) =>
  <Menu
    {...args}
    surface={<>
      <MenuItem headline="Apple" />
      <MenuItem headline="Banana" />
      <MenuItem headline="Cucumber" />
      <SubMenu surface={<>
        <MenuItem headline="Apricot" />
        <MenuItem headline="Avocado" />
      </>}>
        <MenuItem headline="Fruits with A" end={<Icon>arrow_right</Icon>} />
      </SubMenu>
    </>}
    anchor="usage-anchor">
    <div style={{ width: 150, height: 100, border: "solid", borderRadius: 8 }}>
      Anchor
    </div>
  </Menu>;

export const SubMenuPrimary = SubMenuTemplate.bind({});
SubMenuPrimary.args = {
  open: true,
};
