import { Meta, StoryFn } from '@storybook/react';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';
import { Radio } from '../components/radio/Radio';
import { Theme, defaultDarkTheme, defaultLightTheme, oledDarkTheme } from '../components/theme/Theme';
import { Typography } from '../components/typography/Typography';
import { IconButton } from '../components/icon-button/IconButton';
import { Dialog } from '../components/dialog/Dialog';
import React from 'react';
import { Card } from '../components/card/Card';
import { TextArea } from '../components/text-area/TextArea';
import { TextField } from '../components/text-field/TextField';
import { Switch } from '../components/switch/Switch';
import { TopAppBar } from '../components/top-app-bar/TopAppBar';
import { TabBar } from '../components/tab-bar/TabBar';
import { Tab } from '../components/tab/Tab';
import { SegmentedButton, Segment } from '../components/segmented-button/SegmentedButton';
import { Menu } from '../components/menu/Menu';
import { ListItem } from '../components/list-item/ListItem';
import { ListDivider } from '../components/list-divider/ListDivider';
import { LinearProgress } from '../components/linear-progress/LinearProgress';
import { CircularProgress } from '../components/circular-progress/CircularProgress';
import { Ripple } from '../components/ripple/Ripple';
import { Drawer } from '../components/drawer/Drawer';
import { Checkbox } from '../components/checkbox/Checkbox';
import { Slider } from '../components/slider/Slider';
import { FormField } from '../components/form-field/FormField';
import { Fab } from '../components/fab/Fab';
import { ChipSet, Chip } from '../components/chip/Chip';
import { DataTable, DataTableRow, DataTableCell } from '../components/data-table/DataTable';
import { Snackbar } from '../components/snackbar/Snackbar';
import { Tooltip } from '../components/tooltip/Tooltip';

const argTypes: { [key: string]: unknown } = {};
for (const [key, value] of Object.entries(defaultLightTheme)) {
  argTypes[key] = { control: { type: 'color', presetColors: [value] } };
}

export default {
  component: Theme,
  argTypes: {
    ...argTypes,
    oled: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  }
} as Meta<typeof Theme>;

const Template: StoryFn<typeof Theme> = (args) => {
  const [drawer, setDrawer] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [dialog, setDialog] = React.useState(false);
  const [radio, setRadio] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState<boolean | "mixed">(true);
  const [menu, setMenu] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [selected0, setSwitch0] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [slider, setSlider] = React.useState(50);
  const [segment, setSegment] = React.useState(false);
  const [textArea, setTextArea] = React.useState("");
  const [textField, setTextField] = React.useState("");
  const { oled, ...other } = args as { oled?: boolean };
  const darkTheme = oled ? oledDarkTheme : defaultDarkTheme;
  React.useEffect(() => {
    const listener = ({ target }: MouseEvent) => {
      const button = document.querySelector("#menu-button");
      if (target instanceof Element && button !== null) {
        if (target !== button && !button.contains(target)) {
          setMenu(false);
        }
      }
    };
    window.addEventListener('click', listener, { passive: true });
    return () => { window.removeEventListener('click', listener) }
  }, []);
  return (
    <Theme darkTheme={darkTheme} {...other} style={{ position: 'relative' }} >
      <Drawer
        open={drawer}
        title="Mail"
        subtitle="email@material.io"
        content={<>
          <ListItem primaryText="DrawItem" />
          <ListItem primaryText="DrawItem" />
          <ListItem primaryText="DrawItem" />
        </>}>
        <TopAppBar
          navigationIcon={<IconButton aria-label="Open navigation menu" onClick={() => setDrawer(v => !v)}><Icon>menu</Icon></IconButton>}
          title="Title"
          actionItem={<>
            <Tooltip label="Disable">
              <Switch style={{
                '--mdc-theme-surface': 'gray',
              } as React.CSSProperties}
                selected={disabled}
                onClick={() => setDisabled(v => !v)} />
            </Tooltip>
            <IconButton ria-label="Options"><Icon>more_vert</Icon></IconButton>
          </>}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
            <Switch
              disabled={disabled}
              selected={selected0}
              onClick={() => setSwitch0(v => !v)} />
            <div><Button disabled={disabled}
              label="button"
              leading={<Icon>bookmark</Icon>}
              onClick={() => setDialog(true)} /></div>
            <Menu
              open={menu}
              surface={<>
                <ListItem primaryText="MenuItem" />
                <ListItem primaryText="MenuItem" />
                <ListItem primaryText="MenuItem" />
              </>}>
              <Button
                id='menu-button'
                label="button"
                buttonStyle="raised"
                disabled={disabled}
                leading={<Icon>bookmark</Icon>}
                onClick={() => setMenu(true)} />
            </Menu>
            <div>
              <FormField input={<Checkbox
                disabled={disabled}
                checked={checkbox}
                onChange={() => {
                  setCheckbox(v => {
                    switch (v) {
                      case true:
                        return "mixed";
                      case false:
                        return true;
                      case "mixed":
                        return false;
                    }
                    return false;
                  })
                }} />}>
                Checkbox
              </FormField>
            </div>
            <div><Radio disabled={disabled} checked={radio} onChange={() => { }} onClick={() => setRadio(v => !v)} /></div>
            <div><Fab exited={disabled}><Icon>add</Icon></Fab></div>
            <ChipSet><Chip graphic={<Icon>favorite</Icon>}>Front</Chip><Chip selected={disabled}>Chip</Chip><Chip trailing={<Icon>favorite</Icon>}>Back</Chip></ChipSet>
            <Slider style={{ width: '100%' }}
              disabled={disabled} value={slider}
              onChange={v => setSlider(v)} />
            <Typography.Subtitle1>Typography</Typography.Subtitle1>
            <div><Icon>more</Icon></div>
            <div><IconButton disabled={disabled} onClick={() => setSnackbar(true)}><Icon>star</Icon></IconButton></div>
            <Snackbar open={snackbar} action={<IconButton disabled={disabled} onClick={() => setSnackbar(false)}><Icon>close</Icon></IconButton>}>Snackbar</Snackbar>
            <Dialog open={dialog}
              onScrimClick={() => setDialog(false)}
              onEscapeKey={() => setDialog(false)}
              title="Title"
              actions={<Button label="close" onClick={() => setDialog(false)} />}>
              <ListItem
                primaryText="Content"
                meta={<IconButton><Icon>star</Icon></IconButton>} />
            </Dialog>
            <Card
              style={{ margin: 16 }}
              primaryAction={
                <div style={{ padding: 16 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                  pretium vitae est et dapibus. Aenean sit amet felis eu lorem fermentum
                  aliquam sit amet sit amet eros.
                </div>}
              actionButtons={<Button label="button" />}
              actionIcons={<IconButton><Icon>star</Icon></IconButton>} />

            <div style={{ margin: 16 }}>
              <TextField
                label="Label"
                helper="Helper"
                outlined
                value={textField}
                disabled={disabled}
                onChange={e => setTextField(e.target.value)}
              />
            </div>
            <div style={{ margin: 16 }}>
              <TextArea
                label="Label"
                helper="Helper"
                value={textArea}
                disabled={disabled}
                onChange={e => setTextArea(e.target.value)} />
            </div>
            <TabBar selected={tab} onSelected={v => setTab(v)}>
              <Tab icon={<Icon>favorite</Icon>} label="Favorite"></Tab>
              <Tab icon={<Icon>search</Icon>} label="Search"></Tab>
              <Tab icon={<Icon>more_vert</Icon>} label="Options"></Tab>
            </TabBar>
            <SegmentedButton style={{ margin: 16 }} >
              <Segment icon={<Icon>favorite</Icon>} onClick={() => setSegment(v => !v)} />
              <Segment icon={<Icon>favorite</Icon>} label="Sample Text" selected={segment} onClick={() => setSegment(v => !v)} />
              <Segment label="Sample Text" selected onClick={() => setSegment(v => !v)} />
            </SegmentedButton>

            <LinearProgress />
            <div style={{ height: 32 }} />
            <LinearProgress
              buffer={0.6}
              progress={0.4} />
            <CircularProgress />
            <ListDivider />
            <Ripple style={{
              width: 300,
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
              activated={segment}
              onClick={() => setSegment(v => !v)}>
              Ripple
            </Ripple>
            <ListDivider />
            <ListItem
              disabled={disabled}
              primaryText="ListItem"
              graphic={<Icon>star</Icon>} />
            <ListDivider />
            <ListItem
              activated
              disabled={disabled}
              primaryText="ListItem"
              graphic={<Icon>star</Icon>} />

            <DataTable
              headerColumn={0}
              numericColumns={[1, 2]}
              withSortColumns={{ 1: 'descending', 2: 'none' }}
              header={<DataTableRow>
                <DataTableCell>Dessert</DataTableCell>
                <DataTableCell>Carbs (g)</DataTableCell>
                <DataTableCell>Protein (g)</DataTableCell>
                <DataTableCell>Comments</DataTableCell>
              </DataTableRow>}>
              {[
                ['Frozen yogurt', 24, 4.0, 'Super tasty'],
                ['Ice cream sandwich', 37, 4.33333333333, 'I like ice cream more'],
                ['Eclair', 24, 6.0, 'New filing flavor']]
                .map((value, index) => {
                  return (
                    <DataTableRow key={index}>
                      {value.map((value, index) => {
                        return <DataTableCell key={index}>{value}</DataTableCell>;
                      })}
                    </DataTableRow>
                  );
                })}

              <DataTableRow selected>
                {['Eclair', 24, 6.0, 'New filing flavor'].map((value, index) => {
                  return <DataTableCell key={index}>{value}</DataTableCell>;
                })}
              </DataTableRow>
            </DataTable>
          </div>
        </TopAppBar>
      </Drawer>
    </Theme>
  )
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultLightTheme,
  withBackgroundColor: true,
};

const NoArgumentTemplate: StoryFn<typeof Theme> = (args) => {
  return <Theme {...args}>
    <ListItem primaryText="Fruits" />
    <ListDivider />
    <ListItem primaryText="Apple" />
    <ListItem primaryText="Banana" />
  </Theme>
};

export const NoArgument = NoArgumentTemplate.bind({});
NoArgument.args = {
  // storybook bug: set the props with a function-type value for no reason
  onPrimary: undefined,
  onSecondary: undefined,
  onSurface: undefined,
  withBackgroundColor: true,
};
