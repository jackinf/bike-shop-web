import React, { useContext, useState } from 'react';
import {Elements} from 'react-stripe-elements';
import config from '../../../config';

import InjectedCheckoutForm from './CheckoutForm';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../../components/Auth/AuthProvider';

function MyStoreCheckout() {
  const [clientSecret, setClientSecret] = useState('');
  const authContext = useContext(AuthContext);

  const handleStartPayment = async () => {
    const httpRes = await fetch(config.endpoints.payments.startSession(), {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${authContext.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const res = await httpRes.json();
    setClientSecret(res.clientSecret);
  };

  if (!clientSecret) {
    return <Button color="primary" variant="contained" onClick={() => handleStartPayment()}>Start Payment</Button>
  }

  return (
    <Elements>
      <InjectedCheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}

export default MyStoreCheckout;