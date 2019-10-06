import React, {useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { config } from '../../index';
import BikesTable from './BikesTable';
import { BikeSearchResult, BikesTableItem } from './types';
import CircularProgress from '@material-ui/core/CircularProgress';
import composeSearchUrlParams from '../../helpers/composeSearchUrlParams';
import { SearchParameters } from '../../types';

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

  const handleSearch = (searchParameters: SearchParameters) => {
    if (!config.backend.url) {
      throw new Error("No backend url specified");
    } else {
      const urlParams = composeSearchUrlParams(searchParameters);
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
