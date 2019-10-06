import React from 'react';
import { SearchParameters } from '../../../../types';

export interface BikesTableProps {
  handleSearch: (searchParameters: SearchParameters) => void;
  items: BikesTableItem[];
  total: number;
}

export interface BikesTableItem {
  id: string;
  user: string;
  purchase_price: number;
  selling_price: number;
  status: string;
  created_on: string;
}

export interface BikeSearchResult {
  items: BikesTableItem[];
  total: number;
}