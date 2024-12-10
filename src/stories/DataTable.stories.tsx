import { Meta, StoryFn } from '@storybook/react';
import { DataTable, DataTableBuilder, DataTableCell, DataTableRow } from '../components/data-table/DataTable';

export default {
  component: DataTable,
  parameters: {
    layout: 'centered',
  }
} as Meta<typeof DataTable>;

const Template: StoryFn<typeof DataTable> = (args) => {
  return <DataTable
    headerColumn={0}
    numericColumns={[1, 2]}
    header={<DataTableRow>
      <DataTableCell>Dessert</DataTableCell>
      <DataTableCell>Carbs (g)</DataTableCell>
      <DataTableCell>Protein (g)</DataTableCell>
      <DataTableCell>Comments</DataTableCell>
    </DataTableRow>}
    {...args}>

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

  </DataTable>;
};

export const Primary = Template.bind({});
Primary.args = {
};

export const Sorted = Template.bind({});
Sorted.args = {
  withSortColumns: { 1: 'descending', 2: 'none' },
};

const CheckboxTemplate: StoryFn<typeof DataTable> = (args) => {
  return <DataTable
    headerColumn={1}
    checkboxColumns={[0]}
    numericColumns={[2, 3]}
    header={<DataTableRow>
      <DataTableCell></DataTableCell>
      <DataTableCell>Dessert</DataTableCell>
      <DataTableCell>Carbs (g)</DataTableCell>
      <DataTableCell>Protein (g)</DataTableCell>
      <DataTableCell>Comments</DataTableCell>
    </DataTableRow>}
    {...args}>
    {[
      [undefined, 'Frozen yogurt', 24, 4.0, 'Super tasty'],
      [undefined, 'Ice cream sandwich', 37, 4.33333333333, 'I like ice cream more'],
      [undefined, 'Eclair', 24, 6.0, 'New filing flavor']]
      .map((value, index) => {
        return (
          <DataTableRow key={index}>
            {value.map((value, index) => {
              return <DataTableCell key={index}>{value}</DataTableCell>;
            })}
          </DataTableRow>
        );
      })}
  </DataTable>;
};

export const CheckboxColumn = CheckboxTemplate.bind({});
CheckboxColumn.args = {
};


const BuilderTemplate: StoryFn<typeof DataTable> = (args) => {
  return <DataTableBuilder
    itemCount={300000}
    itemBuilder={(index: number) =>
      <DataTableRow>
        <DataTableCell>{index}</DataTableCell>
        <DataTableCell>24</DataTableCell>
        <DataTableCell>4.0</DataTableCell>
        <DataTableCell>Super tasty</DataTableCell>
      </DataTableRow>}
    style={{ maxHeight: 400 }}
    headerColumn={0}
    header={<DataTableRow>
      <DataTableCell>Index</DataTableCell>
      <DataTableCell>Carbs (g)</DataTableCell>
      <DataTableCell>Protein (g)</DataTableCell>
      <DataTableCell>Comments</DataTableCell>
    </DataTableRow>}
    {...args} />;
};
export const Builder = BuilderTemplate.bind({});
Builder.args = {
  stickyHeader: true,
};
