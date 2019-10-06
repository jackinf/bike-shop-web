import { SearchParameters } from '../../types';

export default function composeSearchUrlParams(searchParams: SearchParameters) {
  const { filterKeyword, page, rowsPerPage, orderColumn, orderDirection } = searchParams;

  const urlParams = new URLSearchParams();
  if (filterKeyword) {
    urlParams.append('filter_keyword', filterKeyword);
  }
  if (page) {
    urlParams.append('page', `${page}`);
  }
  if (rowsPerPage) {
    urlParams.append('rows_per_page', `${rowsPerPage}`);
  }
  if (orderColumn) {
    urlParams.append('order_column', orderColumn);
  }
  if (orderDirection) {
    urlParams.append('order_direction', orderDirection);
  }

  return urlParams;
}