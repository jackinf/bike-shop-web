import React, {useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom'

import { config } from '../../index';
import BikesTable from './components/BikesTable/BikesTable';
import { BikeSearchResult, BikesTableItem } from './components/BikesTable/types';
import composeSearchUrlParams from '../../helpers/composeSearchUrlParams';
import { SearchParameters } from '../../types';
import { useStyles } from './styles';

function Bikes(props: any) {
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

      const bikeTypeId = props.match.params["bike_type_id"];

      fetch(`${config.backend.url}/bikes/search/${bikeTypeId}?${urlParams.toString()}`)
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

export default withRouter(Bikes);