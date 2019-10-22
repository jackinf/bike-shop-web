import React from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { withRouter } from 'react-router';

import CartItem from './CartItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      margin: '0 auto',
    },
    checkoutButton: {
      marginTop: 10
    }
  }),
);

function Cart({history}: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Shopping basket</h2>

      <CartItem />
      <CartItem />
      <CartItem />

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