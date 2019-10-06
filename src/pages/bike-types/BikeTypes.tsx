import React, {useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

import { config } from '../../index';
import BikeTypesTable from './components/BikeTypesTable';
import composeSearchUrlParams from '../../helpers/composeSearchUrlParams';
import { SearchParameters } from '../../types';
import { useStyles } from './styles';
import { BikeTypeSearchResult, BikeTypeTableItem } from './components/BikeTypesTable/types';

function BikeTypes({history}: any) {
  const classes = useStyles();
  const [items, setItems] = useState<BikeTypeTableItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (searchParameters: SearchParameters) => {
    if (!config.backend.url) {
      throw new Error("No backend url specified");
    } else {
      const urlParams = composeSearchUrlParams(searchParameters);
      setLoading(true);

      fetch(`${config.backend.url}/bikes/search/bike-types?${urlParams.toString()}`)
        .then(resp => resp.json())
        .then((resp: BikeTypeSearchResult) => {
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
      <BikeTypesTable handleSearch={handleSearch} items={items} total={total} history={history} />
      {loading && <CircularProgress className={classes.progress} />}
    </div>
  );
}

export default withRouter(BikeTypes);