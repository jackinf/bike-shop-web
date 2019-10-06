import React, {useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { config } from '../../index';
import BikesTable from './components/BikesTable/BikesTable';
import { BikeSearchResult, BikesTableItem } from './components/BikesTable/types';
import composeSearchUrlParams from '../../helpers/composeSearchUrlParams';
import { SearchParameters } from '../../types';
import { useStyles } from './styles';

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
