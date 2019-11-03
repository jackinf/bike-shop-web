import React, {useState, useEffect, useContext, useCallback} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Button } from '@material-ui/core';

import config from '../../config';
import { useStyles } from './styles';
import { Tile } from './types';
import { AuthContext } from '../../components/Auth/AuthProvider';

export default function Home() {
  const classes = useStyles();
  const [tileData, setTileData] = useState<Tile[]>([]);
  const authContext = useContext(AuthContext);

  const getAllBikes = useCallback(async () => {
    return await fetch(config.endpoints.bikes.search(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authContext.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }, [authContext.token]);

  useEffect(() => {
    if (!authContext.token) {
      return;
    }
    getAllBikes()
      .then(resp => resp.json())
      .then(resp => setTileData(resp.items));
  }, [getAllBikes, authContext.token]);

  const handleAddToCart = async (bikeId: string) => {
    try {
      await fetch(config.endpoints.cart.addToCart(bikeId), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authContext.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({a: 1, b: 'Textual content'})
      });

      getAllBikes()
        .then(resp => resp.json())
        .then(resp => setTileData(resp.items));
    } catch {

    }
  };

  const handleRemoveFromCart = async (bikeId: string) => {
    try {
      await fetch(config.endpoints.cart.removeFromCart(bikeId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authContext.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      getAllBikes()
        .then(resp => resp.json())
        .then(resp => setTileData(resp.items));
    } catch {

    }
  };

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
              actionIcon={tile.in_cart ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => handleRemoveFromCart(tile.id)}
                >
                  <ShoppingBasketIcon /> &nbsp; Remove from cart
                </Button>
                ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleAddToCart(tile.id)}
                >
                  <ShoppingBasketIcon /> &nbsp; Add into cart
                </Button>
              )
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
