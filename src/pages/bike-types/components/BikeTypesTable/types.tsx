import { SearchParameters } from '../../../../types';

export interface BikeTypesTableProps {
  handleSearch: (searchParameters: SearchParameters) => void;
  items: BikeTypeTableItem[];
  total: number;
}

export interface BikeTypeTableItem {
  id: string;
  title: string;
  price: number;
  stars: number;
  created_on: string;
}

export interface BikeTypeSearchResult {
  items: BikeTypeTableItem[];
  total: number;
}