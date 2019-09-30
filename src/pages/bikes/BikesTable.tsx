import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { BikesTableItem, BikesTableProps, Order } from './types';
import { EnhancedTableHead } from './EnhancedTableHead';
import { useStyles } from './styles';
import EnhancedTableToolbar from './EnhancedTableToolbar';

export default function BikesTable(props: BikesTableProps) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof BikesTableItem>('createdOn');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [everythingSelected, setEverythingSelected] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { handleSearch, items: rows, total } = props;

  useEffect(() => {
    handleSearch({
      page: page,
      rowsPerPage: rowsPerPage,
      orderColumn: orderBy,
      orderDirection: order
    });
    // eslint-disable-next-line
  }, []); // TODO: use a single object and react to the changes of that object

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof BikesTableItem) => {
    const isDesc = orderBy === property && order === 'desc';
    const orderDirection = isDesc ? 'asc' : 'desc';
    setOrder(orderDirection);
    setOrderBy(property);

    handleSearch({
      page: page,
      rowsPerPage: rowsPerPage,
      orderColumn: orderBy,
      orderDirection: orderDirection
    });
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEverythingSelected(event.target.checked);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    handleSearch({
      page: newPage,
      rowsPerPage: rowsPerPage,
      orderColumn: orderBy,
      orderDirection: order
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);

    handleSearch({
      page: 0,
      rowsPerPage: +event.target.value,
      orderColumn: orderBy,
      orderDirection: order
    });
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => setDense(event.target.checked);
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          total={total}
          everythingSelected={everythingSelected}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={everythingSelected ? total : selected.length /* TODO: pass rows total when everything is selected*/}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={total}
            />
            <TableBody>
              {rows.map((row, index) => {
                const exclusiveCondition = everythingSelected && !isSelected(row.id);
                const inclusiveCondition = !everythingSelected && isSelected(row.id);
                const isItemSelected = exclusiveCondition || inclusiveCondition;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={event => handleClick(event, row.id)}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.id}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.stars}</TableCell>
                    <TableCell align="right">{row.createdOn}</TableCell>
                  </TableRow>
                )
              })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}