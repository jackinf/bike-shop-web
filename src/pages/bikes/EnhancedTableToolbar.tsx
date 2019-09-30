import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/core/SvgIcon/SvgIcon';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useToolbarStyles } from './styles';
import { EnhancedTableToolbarProps } from './types';

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const classes = useToolbarStyles();
  const { numSelected, total, everythingSelected } = props;
  const showSelectedNr = everythingSelected ? total - numSelected : numSelected;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {showSelectedNr > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {showSelectedNr} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Bikes
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {showSelectedNr > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};
