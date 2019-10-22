import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

import AuthProvider from './components/Auth';
import Bikes from './pages/bikes';
import BikeTypes from './pages/bike-types';
import Account from './pages/account';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import LoginLogout from './components/LoginLogout';
import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

import Home from './pages/home';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <AuthProvider>
      <LoginLogout>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Container>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/bikes/:bike_type_id" component={Bikes} />
                  <Route exact path="/bike-types" component={BikeTypes} />
                  <Route exact path="/account" component={Account} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/checkout" component={Checkout} />
                </Switch>
              </Container>
            </main>
          </div>
        </Router>
      </LoginLogout>
    </AuthProvider>
  );
};

export default App;
