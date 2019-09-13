import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {GoogleLogout} from 'react-google-login';

import AuthProvider from './components/Auth';
import Bikes from './pages/bikes';
import Account from './pages/account';
import { AuthContext } from './components/Auth/AuthProvider';
import { config } from './index';
import LoginLogout from './components/LoginLogout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AuthProvider>
        <LoginLogout>
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Bike Shop
                </Typography>
                <AuthContext.Consumer>
                  {({handleGoogleSignOut}) => (
                    <GoogleLogout
                      clientId={config.google.clientId || ''}
                      onLogoutSuccess={handleGoogleSignOut}
                      render={({onClick}) => (
                        <Button color="inherit" onClick={onClick}>Log out</Button>
                      )}
                    />
                  )}
                </AuthContext.Consumer>
              </Toolbar>
            </AppBar>

            <Container>
              <Router>
                <div>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/bikes">Bikes</Link>
                    </li>
                    <li>
                      <Link to="/account">Account</Link>
                    </li>
                  </ul>

                  <hr />

                  <Route exact path="/bikes" component={Bikes} />
                  <Route exact path="/account" component={Account} />
                </div>
              </Router>
            </Container>
          </>
        </LoginLogout>
      </AuthProvider>
    </div>
  );
};

export default App;
