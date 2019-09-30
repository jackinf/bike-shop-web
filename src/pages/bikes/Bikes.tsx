import React, {useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { config } from '../../index';
import BikesTable from './BikesTable';
import { BikeSearchResult, BikesTableItem, SearchParameters } from './types';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    progress: {
      margin: theme.spacing(2),
    }
  }),
);

export default function Bikes() {
  const classes = useStyles();
  const [items, setItems] = useState<BikesTableItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = ({ filterKeyword, page, rowsPerPage, orderColumn, orderDirection }: SearchParameters) => {
    if (!config.backend.url) {
      throw new Error("No backend url specified");
    } else {
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
      setLoading(true);

      fetch(`${config.backend.url}/bikes/search?${urlParams.toString()}`)
        .then(resp => resp.json())
        .then((resp: BikeSearchResult) => {
          setItems(resp.items);
          setTotal(resp.total)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className={classes.root}>
      <BikesTable handleSearch={handleSearch} items={items} total={total} />
      {loading && <CircularProgress className={classes.progress} />}
    </div>
  );
}
