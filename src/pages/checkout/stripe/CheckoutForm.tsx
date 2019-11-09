import React from 'react';
import { injectStripe, ReactStripeElements } from 'react-stripe-elements';
import { Button } from '@material-ui/core';

import CardSection from './CardSection';

class CheckoutForm extends React.Component<ReactStripeElements.InjectedStripeProps & {clientSecret: string}> {
  handleSubmit = (ev: any) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    // ev.preventDefault();

    const {stripe, clientSecret} = this.props;
    if (stripe && clientSecret) {
      const payment_method_data = {
        billing_details: { name: 'Jenny Rosen' }
      };
      stripe.handleCardPayment(clientSecret, {payment_method_data});
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <Button color="primary" variant="contained" onClick={this.handleSubmit}>Confirm order</Button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);