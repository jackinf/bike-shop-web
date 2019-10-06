export type Order = 'asc' | 'desc';

export interface SearchParameters {
  filterKeyword?: string;
  page?: number;
  rowsPerPage?: number;
  orderColumn?: string;
  orderDirection?: string;
}