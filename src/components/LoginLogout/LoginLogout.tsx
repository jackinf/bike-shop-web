import React from 'react';
import {AuthContext} from '../Auth/AuthProvider';
import Login from './Login';

interface Props {
  children: any;
}

const LoginLogout = (props: Props) => {
  return (
   <AuthContext.Consumer>
     {({ loading, token }) => {
       if (loading) {
         return <div>Loading</div>
       }

       // Is user logged in?
       if (!!token) {
         return props.children;
       } else {
         return <Login />;
       }
     }}
    </AuthContext.Consumer>

  );
};

export default LoginLogout;
