import React from 'react';
import { SearchParameters } from '../../types';

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

export interface BikeSearchResult {
  items: BikesTableItem[];
  total: number;
}