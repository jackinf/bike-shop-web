import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';

import AuthProvider from './components/Auth';
import Bikes from './pages/bikes';
import Account from './pages/account';
import LoginLogout from './components/LoginLogout';
import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

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
                <Route exact path="/bikes" component={Bikes} />
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
