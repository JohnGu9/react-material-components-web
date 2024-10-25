import "./style.scss";
import React from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { classMap, createComponent } from "../common/Common";
import { IconButton } from "../icon-button/IconButton";
import { ListViewBuilder } from "../common/ListViewBuilder";

const Context = React.createContext<{ isHeader?: boolean }>({ isHeader: false, });

type SortedType = 'none' | 'ascending' | 'descending' | 'other';

const RowContext = React.createContext<{
  headerColumn?: number,
  numericColumns?: Set<number>,
  checkboxColumns?: Set<number>,
  withSortColumns?: { [key: number]: SortedType },
}>({});

const CellContext = React.createContext<{
  isRowHeader?: boolean,
  isNumeric?: boolean,
  isCheckbox?: boolean,
  isWithSort?: SortedType,
}>({});

export type DataTableProps = {
  header?: React.ReactNode,
  stickyHeader?: boolean,
  headerColumn?: number,
  numericColumns?: Iterable<number>,
  checkboxColumns?: Iterable<number>,
  withSortColumns?: { [key: number]: SortedType },
};

export const DataTable = createComponent<HTMLDivElement, DataTableProps>(
  function DataTable({
    header,
    stickyHeader,
    headerColumn,
    numericColumns,
    checkboxColumns,
    withSortColumns,
    className,
    children,
    ...props
  }, ref) {
    const classes = {
      'mdc-data-table': true,
      'mdc-data-table--sticky-header': stickyHeader,
    };

    return (
      <div ref={ref} className={classMap(classes, className)} {...props}>
        <div className="mdc-data-table__table-container">
          <table className="mdc-data-table__table">
            <RowContext.Provider value={{
              headerColumn,
              numericColumns: new Set(numericColumns),
              checkboxColumns: new Set(checkboxColumns),
              withSortColumns,
            }}>
              <thead>
                <Context.Provider value={{ isHeader: true }}>
                  {header}
                </Context.Provider>
              </thead>
              <tbody className="mdc-data-table__content">
                {children}
              </tbody>
            </RowContext.Provider>
          </table>
        </div>
      </div>
    );
  }
);

export type DataTableBuilderProps = DataTableProps & {
  itemExtent?: number,
  itemCount: number,
  itemBuilder: (index: number) => React.ReactNode,
};

export const DataTableBuilder = createComponent<HTMLDivElement, DataTableBuilderProps>(
  function DataTableBuilder({
    header,
    stickyHeader,
    headerColumn,
    numericColumns,
    checkboxColumns,
    withSortColumns,
    className,
    itemExtent = 52,
    itemCount,
    itemBuilder,
    children,
    ...props
  }, ref) {
    const classes = {
      'mdc-data-table': true,
      'mdc-data-table--sticky-header': stickyHeader,
    };

    const rowContext = React.useMemo(() => {
      return {
        headerColumn,
        numericColumns: new Set(numericColumns),
        checkboxColumns: new Set(checkboxColumns),
        withSortColumns,
      };
    }, [checkboxColumns, headerColumn, numericColumns, withSortColumns]);

    return (
      <div ref={ref} className={classMap(classes, className)} {...props}>
        <ListViewBuilder className="mdc-data-table__table-container" itemCount={itemCount} itemExtent={itemExtent}
          childrenBuilder={(paddingStart, paddingEnd, childrenIndexes) =>
            <table className="mdc-data-table__table">
              <RowContext.Provider value={rowContext}>
                <thead>
                  <Context.Provider value={{ isHeader: true }}>
                    {header}
                  </Context.Provider>
                </thead>
                <tbody className="mdc-data-table__content">
                  <tr key={-1} aria-label="placeholder" style={{ display: "block", minHeight: paddingStart }} />
                  {childrenIndexes.map(index => <React.Fragment key={index}>{itemBuilder(index)}</React.Fragment>)}
                  <tr key={-2} aria-label="placeholder" style={{ display: "block", minHeight: paddingEnd }} />
                </tbody>
              </RowContext.Provider>
            </table>
          }>
        </ListViewBuilder>
      </div>
    );
  }
);

export type DataTableRowProps = {
  selected?: boolean,
};

export const DataTableRow = createComponent<HTMLTableRowElement, DataTableRowProps>(
  function DataTableRow({
    selected,
    className,
    children,
    ...props
  }, ref) {
    const { isHeader } = React.useContext(Context);
    const { headerColumn, numericColumns, checkboxColumns, withSortColumns } = React.useContext(RowContext);

    const classes = {
      'mdc-data-table__header-row': isHeader,
      'mdc-data-table__row': !isHeader,
      'mdc-data-table__row--selected': selected && !isHeader,
    };

    return <tr ref={ref}
      className={classMap(classes, className)}
      aria-selected={selected}
      {...props} >
      {React.Children.map(children, function (child, index) {
        return <CellContext.Provider value={{
          isRowHeader: headerColumn === index,
          isNumeric: numericColumns?.has(index),
          isCheckbox: checkboxColumns?.has(index),
          isWithSort: withSortColumns?.[index],
        }}>{child}</CellContext.Provider>;
      })}
    </tr>;
  }
);

export type DataTableCellProps = {
};

export const DataTableCell = createComponent<HTMLTableCellElement, DataTableCellProps>(
  function DataTableCell({
    className,
    children,
    ...props
  }, ref) {
    const { isRowHeader, isNumeric, isCheckbox, isWithSort } = React.useContext(CellContext);
    const { isHeader } = React.useContext(Context);
    if (isHeader) {
      const classes = {
        'mdc-data-table__header-cell': true,
        'mdc-data-table__header-cell--checkbox': isCheckbox,
        'mdc-data-table__header-cell--numeric': isNumeric,
      }

      const extend = (() => {
        switch (isWithSort) {
          case 'none': {
            return 'mdc-data-table__header-cell--with-sort';
          }
          case 'other':
          case 'ascending': {
            return 'mdc-data-table__header-cell--with-sort mdc-data-table__header-cell--sorted';
          }
          case 'descending': {
            return 'mdc-data-table__header-cell--with-sort mdc-data-table__header-cell--sorted mdc-data-table__header-cell--sorted-descending';
          }
        }
      })();

      return <th ref={ref}
        className={classMap(classes, extend, className)}
        role='columnheader'
        scope='col'
        aria-sort={isWithSort}
        {...props} >
        <div className="mdc-data-table__header-cell-wrapper">
          {(() => {
            switch (isWithSort) {
              case 'ascending':
              case 'descending':
                return <IconButton className="material-icons mdc-data-table__sort-icon-button">arrow_upward</IconButton>
              case 'other':
              case 'none':
                return <IconButton className="material-icons mdc-data-table__sort-icon-button">sort</IconButton>
            }
            return undefined;
          })()}
          <div className="mdc-data-table__header-cell-label">
            {children ?? (isCheckbox ? <Checkbox /> : undefined)}
          </div>
        </div>
      </th>;
    }

    const classes = {
      'mdc-data-table__cell': true,
      'mdc-data-table__cell--checkbox': isCheckbox,
      'mdc-data-table__cell--numeric': isNumeric,
    }

    if (isRowHeader)
      return <th ref={ref}
        className={classMap(classes, className)}
        scope={isRowHeader ? 'row' : undefined}
        {...props} >
        <div className="mdc-data-table__cell__background" aria-hidden />
        {children ?? (isCheckbox ? <Checkbox /> : undefined)}
      </th>;
    else
      return <td ref={ref}
        className={classMap(classes, className)} {...props} >
        <div className="mdc-data-table__cell__background" aria-hidden />
        {children ?? (isCheckbox ? <Checkbox /> : undefined)}
      </td>;
  }
);
