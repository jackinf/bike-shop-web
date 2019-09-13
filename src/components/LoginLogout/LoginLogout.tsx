import React from 'react';
import {GoogleLogin} from 'react-google-login';
import { config } from '../../index';
import {AuthContext} from '../Auth/AuthProvider';

interface Props {
  children: any;
}

const LoginLogout = (props: Props) => {
  const googleClientId = config.google.clientId || '';
  return (
   <AuthContext.Consumer>
     {(settings) => {
       if (settings.loading) {
         return <div>Loading</div>
       }

       const {
         token,
         handleGoogleLoginSuccess,
         handleGoogleLoginFailure,
       } = settings;

       if (!!token) {
         return (props.children)
       }

       return (
         <GoogleLogin
           clientId={googleClientId}
           buttonText="Login"
           onSuccess={handleGoogleLoginSuccess}
           onFailure={handleGoogleLoginFailure}
           cookiePolicy={'single_host_origin'}
         />
       )

     }}
    </AuthContext.Consumer>

  );
};

export default LoginLogout;
