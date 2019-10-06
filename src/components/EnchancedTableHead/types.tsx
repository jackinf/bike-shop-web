import { useStyles } from '../../pages/bikes/styles';
import React from 'react';
import { Order } from '../../types';

export interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof any;
  label: string;
  numeric: boolean;
}