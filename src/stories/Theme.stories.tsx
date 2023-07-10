import { Meta, StoryFn } from '@storybook/react';
import 'material-icons/iconfont/material-icons.css';
import { Button } from '../components/button/Button';
import { Icon } from '../components/icon/Icon';
import { Radio } from '../components/radio/Radio';
import { Theme, defaultLightTheme } from '../components/theme/Theme';
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

export default {
  component: Theme,
  argTypes: {
    primary: { control: { type: 'color', presetColors: [defaultLightTheme.primary] } },
    secondary: { control: { type: 'color', presetColors: [defaultLightTheme.secondary] } },
    background: { control: { type: 'color', presetColors: [defaultLightTheme.background] } },
    surface: { control: { type: 'color', presetColors: [defaultLightTheme.surface] } },
    onPrimary: { control: { type: 'color', presetColors: [defaultLightTheme.onPrimary] } },
    onSecondary: { control: { type: 'color', presetColors: [defaultLightTheme.onSecondary] } },
    onSurface: { control: { type: 'color', presetColors: [defaultLightTheme.onSurface] } },
  }
} as Meta<typeof Theme>;

const Template: StoryFn<typeof Theme> = (args) => {
  const [drawer, setDrawer] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [dialog, setDialog] = React.useState(false);
  const [radio, setRadio] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState<boolean | "mixed">(true);
  const [menu, setMenu] = React.useState(false);
  const [selected, setSwitch] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [slider, setSlider] = React.useState(50);
  const [textArea, setTextArea] = React.useState("");
  const [textField, setTextField] = React.useState("");
  React.useEffect(() => {
    const listener = ({ target }: MouseEvent) => {
      const button = document.querySelector("#menu-button");
      if (target instanceof Element && button !== null) {
        if (target !== button && !button.contains(target)) {
          setMenu(false);
        }
      }
    };
    window.addEventListener('click', listener);
    return () => { window.removeEventListener('click', listener) }
  }, []);
  return (
    <Theme {...args} >
      <Drawer
        open={drawer}
        title="Mail"
        subtitle="email@material.io"
        content={<>
          Drawer Content
          <ListItem primaryText="DrawItem" />
          <ListItem primaryText="DrawItem" />
          <ListItem primaryText="DrawItem" />
        </>}>
        <TopAppBar
          navigationIcon={<IconButton aria-label="Open navigation menu" onClick={() => setDrawer(v => !v)}><Icon>menu</Icon></IconButton>}
          title="Title"
          actionItem={<>
            <IconButton aria-label="Favorite"><Icon>favorite</Icon></IconButton>
            <IconButton aria-label="Search"><Icon>search</Icon></IconButton>
            <IconButton ria-label="Options"><Icon>more_vert</Icon></IconButton>
          </>}>
          <div style={{ margin: 16 }}>
            <Switch selected={selected} onClick={() => setSwitch(v => !v)} />
            Disable
          </div>
          <div><Button disabled={selected}
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
              disabled={selected}
              leading={<Icon>bookmark</Icon>}
              onClick={() => setMenu(true)} />
          </Menu>
          <div>
            <FormField input={<Checkbox checked={checkbox} onChange={() => {
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
          <div><Radio disabled={selected} checked={radio} onChange={() => { }} onClick={() => setRadio(v => !v)} /></div>
          <div><Fab disabled={selected}><Icon>add</Icon></Fab></div>
          <ChipSet><Chip>Front</Chip><Chip >Chip</Chip><Chip>Back</Chip></ChipSet>
          <Slider disabled={selected} value={slider} onChange={v => setSlider(v)} />
          <Typography.Subtitle1>Typography</Typography.Subtitle1>
          <div><Icon>more</Icon></div>
          <div><IconButton disabled={selected} onClick={() => setSnackbar(true)}><Icon>star</Icon></IconButton></div>
          <Snackbar open={snackbar} action={<IconButton onClick={() => setSnackbar(false)}><Icon>close</Icon></IconButton>}>Snackbar</Snackbar>
          <Dialog open={dialog}
            onScrimClick={() => setDialog(false)}
            onEscapeKey={() => setDialog(false)}
            title="Title"
            actions={<Button label="close" onClick={() => setDialog(false)} />}>
            Content
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
              disabled={selected}
              onChange={e => setTextField(e.target.value)}
            />
          </div>
          <div style={{ margin: 16 }}>
            <TextArea
              label="Label"
              helper="Helper"
              value={textArea}
              disabled={selected}
              onChange={e => setTextArea(e.target.value)} />
          </div>
          <TabBar selected={tab} onSelected={v => setTab(v)}>
            <Tab icon={<Icon>favorite</Icon>} label="Favorite"></Tab>
            <Tab icon={<Icon>search</Icon>} label="Search"></Tab>
            <Tab icon={<Icon>more_vert</Icon>} label="Options"></Tab>
          </TabBar>
          <SegmentedButton style={{ margin: 16 }} >
            <Segment icon={<Icon>favorite</Icon>} />
            <Segment icon={<Icon>favorite</Icon>} label="Sample Text" />
            <Segment label="Sample Text" selected />
          </SegmentedButton>

          <LinearProgress />
          <div style={{ height: 32 }} />
          <LinearProgress
            buffer={0.6}
            progress={0.4}
          />
          <CircularProgress />
          <ListDivider />
          <Ripple style={{ width: 300, height: 300 }} />
          <ListDivider />
          <ListItem
            disabled={selected}
            primaryText="ListItem"
            graphic={<Icon>star</Icon>} />
          <ListDivider />
          <ListItem
            disabled={selected}
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

          </DataTable>
          <div style={{ height: 300 }}></div>
        </TopAppBar>
      </Drawer>

    </Theme>
  )
};

export const Primary = Template.bind({});
Primary.args = {
  primary: defaultLightTheme.primary,
  secondary: defaultLightTheme.secondary,
  background: defaultLightTheme.background,
  surface: defaultLightTheme.surface,
  onPrimary: defaultLightTheme.onPrimary,
  onSecondary: defaultLightTheme.onSecondary,
  onSurface: defaultLightTheme.onSurface,
};
