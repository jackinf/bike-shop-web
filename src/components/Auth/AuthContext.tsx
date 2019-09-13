import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { config } from '../../index';
import { ContextSettings } from './types';
import { GoogleLoginResponse } from 'react-google-login';

interface Props {
  children: any;
}

export const Context = React.createContext<ContextSettings | null>({
  loading: true,
  token: undefined,
  handleGoogleLoginFailure: () => {},
  handleGoogleLoginSuccess: () => Promise.resolve(),
  handleGoogleSignOut: () => {}
});

function isUserEqual(googleUser: GoogleLoginResponse, firebaseUser: firebase.User) {
  const providerData = firebaseUser.providerData;
  for (let i = 0; i < providerData.length; i++) {
    const providerDataItem = providerData[i];
    if (providerDataItem !== null && providerDataItem.providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
      providerDataItem.uid === googleUser.getBasicProfile().getId()) {
      return true; // We don't need to re-auth the Firebase connection.
    }
  }

  return false;
}

const AuthContext = (props: Props) => {
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
    <Context.Provider value={{
      loading,
      token,
      handleGoogleLoginFailure,
      handleGoogleLoginSuccess,
      handleGoogleSignOut
    }}>
      {props.children}
    </Context.Provider>
  );
};

export default AuthContext;
