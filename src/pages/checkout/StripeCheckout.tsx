import React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import useScript from '../../hooks/useScript';
import config from '../../config';
import Checkout from './Checkout';

export default function StripeCheckout() {
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
    <StripeProvider apiKey={config.stripe.apikey}>
      <Checkout />
    </StripeProvider>
  )
}