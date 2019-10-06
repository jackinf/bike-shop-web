import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

import AuthProvider from './components/Auth';
import Bikes from './pages/bikes';
import BikeTypes from './pages/bike-types';
import Account from './pages/account';
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
                <Route exact path="/" component={Home} />
                <Route exact path="/bikes" component={Bikes} />
                <Route exact path="/bike-types" component={BikeTypes} />
                <Route exact path="/account" component={Account} />
              </Container>
            </main>
          </div>
        </Router>
      </LoginLogout>
    </AuthProvider>
  );
};

export default App;
