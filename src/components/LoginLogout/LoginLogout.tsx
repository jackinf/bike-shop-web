import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { config } from '../../index';
import {Context} from '../Auth/AuthContext';

interface Props {
  children: any;
}

const LoginLogout = (props: Props) => {
  const googleClientId = config.google.clientId || '';
  return (
   <Context.Consumer>
     {(settings) => {
       if (!settings) {
         return <div>Initializing</div>
       }

       const {
         token,
         handleGoogleLoginSuccess,
         handleGoogleSignOut,
         handleGoogleLoginFailure,
       } = settings;

       if (!!token) {
         return (
           <>
             <GoogleLogout
               clientId={googleClientId}
               buttonText="Logout"
               onLogoutSuccess={handleGoogleSignOut}
             />
             <p>
               {token}
             </p>

             {props.children}
           </>
         )
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
    </Context.Consumer>

  );
};

export default LoginLogout;
