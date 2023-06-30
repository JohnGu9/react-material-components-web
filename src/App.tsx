import 'material-icons/iconfont/material-icons.css';
import React from 'react';
import "./App.css";
import { Drawer } from './components/drawer/Drawer';
import { IconButton } from './components/icon-button/IconButton';
import { Icon } from './components/icon/Icon';
import { ListDivider } from './components/list-divider/ListDivider';
import { ListItem } from './components/list-item/ListItem';
import { TopAppBar } from './components/top-app-bar/TopAppBar';
import { Typography } from './components/typography/Typography';

enum SortType {
  Type,
  Alphabet,
}

function App() {
  const [open, setOpen] = React.useState(true);
  const [sort, setSort] = React.useState(SortType.Type);
  const [expanded, setExpanded] = React.useState(false);
  return (
    <TopAppBar
      navigationIcon={<IconButton onClick={() => setOpen(!open)}><Icon>menu</Icon></IconButton>}
      title="React MWC">
      <Drawer opened={open}
        content={<nav>
          <ListItem
            nonInteractive
            expanded={expanded}
            primaryText={<Typography.Overline >components</Typography.Overline>}
            meta={<IconButton
              onClick={_ => setExpanded(value => !value)}>
              <Icon>
                {(() => {
                  if (expanded) return 'expand_less';
                  switch (sort) {
                    case SortType.Type:
                      return 'category';
                    case SortType.Alphabet:
                      return 'sort_by_alpha';
                  }
                })()}
              </Icon>
            </IconButton>} >
            <ListItem primaryText={<Typography.Overline >category</Typography.Overline>} selected={sort === SortType.Type}
              onClick={_ => { setSort(SortType.Type); setExpanded(false); }}
              meta={<IconButton><Icon>category</Icon></IconButton>} />
            <ListItem primaryText={<Typography.Overline >alphabet</Typography.Overline>} selected={sort === SortType.Alphabet}
              onClick={_ => { setSort(SortType.Alphabet); setExpanded(false); }}
              meta={<IconButton><Icon>sort_by_alpha</Icon></IconButton>} />
            <div style={{ height: 8 }} />
          </ListItem>
          <ListDivider padding leading trailing />
          <ListItem primaryText="Banner" />
          <ListItem primaryText="Button" />
          <ListItem primaryText="Card" />
          <ListItem primaryText="Checkbox" />
          <ListItem primaryText="Chip" />
          <ListItem primaryText="CircularProgress" />
          <ListItem primaryText="DataTable" />
          <ListItem primaryText="Dialog" />
          <ListItem primaryText="Drawer" />
          <ListItem primaryText="Elevation" />
          <ListItem primaryText="Fab" />
          <ListItem primaryText="FormField" />
          <ListItem primaryText="Card" />
          <ListItem primaryText="Icon" />
          <ListItem primaryText="IconButton" />
          <ListItem primaryText="LinearProgress" />
          <ListItem primaryText="ListDivider" />
          <ListItem primaryText="ListItem" />
          <ListItem primaryText="Menu" />
          <ListItem primaryText="Radio" />
          <ListItem primaryText="Ripple" />
          <ListItem primaryText="SegmentedButton" />
          <ListItem primaryText="Select" />
          <ListItem primaryText="Slider" />
          <ListItem primaryText="Snackbar" />
          <ListItem primaryText="Switch" />
          <ListItem primaryText="TabBar" />
          <ListItem primaryText="TextArea" />
          <ListItem primaryText="TextField" />
          <ListItem primaryText="Theme" />
          <ListItem primaryText="Tooltip" />
          <ListItem primaryText="TopAppBar" />
          <ListItem primaryText="Typography" />
        </nav>}>
      </Drawer>
    </TopAppBar>
  );
}

export default App;



