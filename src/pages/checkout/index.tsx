import React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import useScript from '../../hooks/useScript';
import MyStoreCheckout from './stripe/MyStoreCheckout';
import config from '../../config';
import MyStandaloneStoreCheckout from './stripe/MyStandaloneStoreCheckout';

export default function CheckoutEntry() {
  const [loaded, error] = useScript("https://js.stripe.com/v3/");

  if (!loaded) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading payment script</div>
  }

  if (!config.stripe.apikey) {
    throw new Error('Stripe Api Key is not defined')
  }

  return (
    <StripeProvider apiKey={config.stripe.apikey} >
      <div>
        <MyStoreCheckout />
        <hr/>
        <MyStandaloneStoreCheckout />
      </div>
    </StripeProvider>
  )
}