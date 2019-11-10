import React, { useContext } from 'react';
import { injectStripe, ReactStripeElements, Elements } from 'react-stripe-elements';
import config from '../../../config';

import { Button } from '@material-ui/core';
import { AuthContext } from '../../../components/Auth/AuthProvider';

function MyStandaloneStoreCheckout(props: ReactStripeElements.InjectedStripeProps & { className?: any}) {
  const authContext = useContext(AuthContext);
  const { stripe } = props;

  const handleStartPayment = async () => {
    const httpRes = await fetch(config.endpoints.payments.startStandaloneSession(), {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${authContext.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    const res = await httpRes.json();

    // @ts-ignore  TODO: fix
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: res.sessionId //'{{CHECKOUT_SESSION_ID}}'
    }).then(function (result: any) {
      console.error('Error! ', result)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    });
  };

  return (
    <Button color="primary" variant="contained" onClick={() => handleStartPayment()} className={props.className}>
      Pay
    </Button>
  )
}

const Injected = injectStripe(MyStandaloneStoreCheckout);

export default function Wrapper(props: { className?: any}) {
  return (
    <Elements>
      <Injected className={props.className} />
    </Elements>
  )
}