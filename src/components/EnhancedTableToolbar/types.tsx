import React from 'react';

export interface SearchFieldProps {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  total: number;
  everythingSelected: boolean;
  onSearchFieldChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSearchFieldKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  label: string;
}