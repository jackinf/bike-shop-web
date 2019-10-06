import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { useSearchFieldStyles } from './styles';
import { SearchFieldProps } from './types';

export default function SearchField(props: SearchFieldProps) {
  const classes = useSearchFieldStyles();
  const { onChange, onKeyDown } = props;

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Bikes"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => onChange(e)}
        onKeyDown={e => onKeyDown(e)}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={() => onKeyDown({keyCode: 13} as any)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}