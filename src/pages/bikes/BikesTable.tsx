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
import Rating from '@material-ui/lab/Rating';

import { BikesTableProps } from './types';
import { useStyles } from './styles';
import { EnhancedTableHead } from '../../components/EnchancedTableHead/EnhancedTableHead';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar/EnhancedTableToolbar';
import { Order, SearchParameters } from '../../types';

export default function BikesTable(props: BikesTableProps) {
  const classes = useStyles();
  const [keyword, setKeyword] = React.useState<string>('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [everythingSelected, setEverythingSelected] = React.useState(false);
  const [dense, setDense] = React.useState(false);

  const [searchParams, setSearchParams] = React.useState<SearchParameters>({
    page: 0,
    orderDirection: 'asc',
    orderColumn: 'createdOn',
    rowsPerPage: 5,
    filterKeyword: ''
  });

  const { handleSearch, items: rows, total } = props;

  // TODO: resolve defaults
  const { page: p, rowsPerPage: rpp, orderDirection, orderColumn } = searchParams;
  const page = p || 0;
  const rowsPerPage = rpp || 5;
  const order = orderDirection ? (orderDirection as Order) : 'asc';
  const orderBy = orderColumn || 'createdOn';
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

  useEffect(() => {
    handleSearch(searchParams);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (keyword) {
      handleSearch({...searchParams, filterKeyword: keyword});
      setKeyword('');
    } else {
      handleSearch(searchParams);
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof any) => {
    const { page, rowsPerPage, filterKeyword: keyword, orderDirection: order, orderColumn: orderBy } = searchParams;
    const isDesc = orderBy === property && order === 'desc';
    const orderDirection = isDesc ? 'asc' : 'desc';

    setSearchParams({
      page: page,
      rowsPerPage: rowsPerPage,
      orderColumn: orderBy,
      orderDirection: orderDirection,
      filterKeyword: keyword,
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
    setSearchParams({
      ...searchParams,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { orderColumn, orderDirection, filterKeyword } = searchParams;
    setSearchParams({
      page: 0,
      rowsPerPage: +event.target.value,
      orderColumn,
      orderDirection,
      filterKeyword,
    });
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const handleSearchFieldKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.keyCode === 13) { // if enter was pressed
      handleSearch({ ...searchParams, filterKeyword: keyword });
    }
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => setDense(event.target.checked);
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          total={total}
          everythingSelected={everythingSelected}
          onSearchFieldChange={handleSearchFieldChange}
          onSearchFieldKeyDown={handleSearchFieldKeyDown}
          label="Bikes"
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              headCells={[
                { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
                { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
                { id: 'price', numeric: true, disablePadding: false, label: 'Price (EUR)' },
                { id: 'stars', numeric: true, disablePadding: false, label: 'Stars' },
                { id: 'createdOn', numeric: false, disablePadding: false, label: 'Created on' },
              ]}
              numSelected={everythingSelected ? total : selected.length}
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
                    <TableCell align="right">
                      <Rating value={row.stars} readOnly />
                    </TableCell>
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