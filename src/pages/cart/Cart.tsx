import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

import CartItem from './components/CartItem/CartItem';
import { useStyles } from './styles';
import { AuthContext } from '../../components/Auth/AuthProvider';
import config from '../../config';
import { CartItemType, GetCartItemsResponse } from './types';

function Cart({history}: any) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const getCartItems = useCallback(async () => {
    return await fetch(config.endpoints.cart.getCartItems(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authContext.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }, [authContext.token]);

  const mapCartItemsFromResponse = (response: { items: GetCartItemsResponse[] }) => {
    return response.items.map((item: GetCartItemsResponse) => ({
      bikeId: item.bike_id,
      title: item.title,
      image: item.image
    }));
  };

  useEffect(() => {
    getCartItems()
      .then(resp => resp.json())
      .then(resp => mapCartItemsFromResponse(resp))
      .then((items: CartItemType[]) => setCartItems(items));
  }, [getCartItems, authContext.token]);

  const handleRemoveFromCart = async (bikeId: string) => {
    await fetch(config.endpoints.cart.removeFromCart(bikeId), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authContext.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    getCartItems()
      .then(resp => resp.json())
      .then(resp => mapCartItemsFromResponse(resp))
      .then((items: CartItemType[]) => setCartItems(items));
  };

  return (
    <div className={classes.root}>
      <h2>Shopping basket</h2>

      {cartItems.map(cartItem => (
        <CartItem
          bikeId={cartItem.bikeId}
          title={cartItem.title}
          image={cartItem.image}
          onRemoveFromCart={handleRemoveFromCart}
        />
      ))}

      <Button
        className={classes.checkoutButton}
        variant="contained"
        color="primary"
        onClick={() => history.push('/checkout')}
      >
        Proceed to checkout
      </Button>
    </div>
  )
}

export default withRouter(Cart);