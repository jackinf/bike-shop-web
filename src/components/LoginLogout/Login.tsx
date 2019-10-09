import React, { ChangeEvent, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { GoogleLogin } from 'react-google-login';
import { Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import config from '../../config';
import { AuthContext } from '../Auth/AuthProvider';
import MySnackbarContentWrapper from '../MySnackbarContentWrapper';
import { useStyles } from './styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const classes = useStyles();
  const googleClientId = config.google.clientId || '';

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);

  return (
    <AuthContext.Consumer>
      {({ handleGoogleLoginSuccess, handleGoogleLoginFailure, handleEmailLogin, errorInfo, clearErrorInfo, emailLoginInProgress }) => (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {errorInfo && (
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message={errorInfo.message}
                  onClose={clearErrorInfo}
                />
              )}

              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleEmailChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePassChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {emailLoginInProgress ? <CircularProgress className={classes.progress} /> : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e: any) => {
                      e.preventDefault();
                      handleEmailLogin(email, pass);
                    }}
                  >
                    Sign In
                  </Button>
                )}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                  <Grid item>
                    <GoogleLogin
                      clientId={googleClientId}
                      buttonText="Login"
                      onSuccess={handleGoogleLoginSuccess}
                      onFailure={handleGoogleLoginFailure}
                      cookiePolicy={'single_host_origin'}
                      render={({onClick}) => (
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                          onClick={onClick}
                        >
                          Sign In with Google
                        </Button>
                      )}
                    />
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </AuthContext.Consumer>
  );
}