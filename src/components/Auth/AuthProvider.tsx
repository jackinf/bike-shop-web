import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import { config } from '../../index';
import { ContextSettings } from './types';
import { GoogleLoginResponse } from 'react-google-login';
import isUserEqual from './isUserEqual';

interface Props {
  children: any;
}

export const AuthContext = React.createContext<ContextSettings>({
  loading: true,
  token: undefined,
  handleGoogleLoginFailure: () => {},
  handleGoogleLoginSuccess: () => Promise.resolve(),
  handleGoogleSignOut: () => {}
});

const AuthProvider = (props: Props) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setToken(await user.getIdToken());
      } else {
        setToken("");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const handleGoogleLoginSuccess = async (googleUser: GoogleLoginResponse) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      unsubscribe();
      if (!firebaseUser || !isUserEqual(googleUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
        const result = await firebase.auth().signInWithCredential(credential);
        const user = result.user;
        if (user) {
          setToken(await user.getIdToken());
        }
      } else {
        setToken(await firebaseUser.getIdToken());
      }
    });
  };

  const handleGoogleLoginFailure = (error: any) => console.error('Failed', error);

  const handleGoogleSignOut = async () => {
    await firebase.auth().signOut();
    setToken("");
  };

  const googleClientId = config.google.clientId;
  if (!googleClientId) {
    return <div>No google Client Id specified</div>
  }

  return (
    <AuthContext.Provider value={{
      loading,
      token,
      handleGoogleLoginFailure,
      handleGoogleLoginSuccess,
      handleGoogleSignOut
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
