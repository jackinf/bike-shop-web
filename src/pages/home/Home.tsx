import React, {useState, useEffect} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import config from '../../config';
import { useStyles } from './styles';
import { Tile } from './types';
import { Button } from '@material-ui/core';

export default function Home() {
  const classes = useStyles();
  const [tileData, setTileData] = useState<Tile[]>([]);

  useEffect(() => {
    fetch(config.endpoints.bikes.search())
      .then(resp => resp.json())
      .then(resp => setTileData(resp.items));
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Bikes</ListSubheader>
        </GridListTile>
        {tileData.map((tile: Tile, i: number) => (
          <GridListTile key={i}>
            <img src={tile.image} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>price: {tile.selling_price}</span>}
              actionIcon={
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <ShoppingBasketIcon /> &nbsp; Into cart
                </Button>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
