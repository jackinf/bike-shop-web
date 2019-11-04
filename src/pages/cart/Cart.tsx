import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

import CartItem from './components/CartItem/CartItem';
import { useStyles } from './styles';
import { AuthContext } from '../../components/Auth/AuthProvider';
import config from '../../config';
import { BackendCartItem, BackendCartItemResponse, CartItemResponse } from './types';

function Cart({history}: any) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [cartResponse, setCartResponse] = useState<CartItemResponse | undefined>(undefined);

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

  const mapCartItemsFromResponse = (response: BackendCartItemResponse): CartItemResponse => {
    return {
      items: response.items.map((item: BackendCartItem) => ({
        bikeId: item.bike_id,
        title: item.title,
        image: item.image,
        sellingPrice: item.selling_price
      })),
      totalSum: response.total_sum,
    };
  };

  useEffect(() => {
    getCartItems()
      .then(resp => resp.json())
      .then(resp => mapCartItemsFromResponse(resp))
      .then((resp: CartItemResponse) => setCartResponse(resp));
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
      .then((resp: CartItemResponse) => setCartResponse(resp));
  };

  if (cartResponse === undefined) {
    return <div>Loading...</div>;
  }

  const { items, totalSum } = cartResponse;

  return (
    <div className={classes.root}>
      <h2>Shopping basket</h2>

      {items.map(cartItem => (
        <CartItem
          key={cartItem.bikeId}
          cartItem={cartItem}
          onRemoveFromCart={handleRemoveFromCart}
        />
      ))}

      <h3>Total sum: €{totalSum}</h3>

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
