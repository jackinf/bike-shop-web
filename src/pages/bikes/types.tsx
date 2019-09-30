import React from 'react';
import { useStyles } from './styles';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof BikesTableItem;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof BikesTableItem) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  total: number;
  everythingSelected: boolean;
  onSearchFieldChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSearchFieldKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export type Order = 'asc' | 'desc';

export interface SearchParameters {
  filterKeyword?: string;
  page?: number;
  rowsPerPage?: number;
  orderColumn?: string;
  orderDirection?: string;
}

export interface BikesTableProps {
  handleSearch: (searchParameters: SearchParameters) => void;
  items: BikesTableItem[];
  total: number;
}

export interface BikesTableItem {
  id: string;
  title: string;
  price: number;
  stars: number;
  createdOn: string;
}

export interface SearchFieldProps {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}