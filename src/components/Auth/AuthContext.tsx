import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { config } from '../../index';
import { ContextSettings } from './types';

interface Props {
  children: any;
}

export const Context = React.createContext<ContextSettings | null>(null);

const AuthContext = (props: Props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setToken(await user.getIdToken());
      } else {
        setToken("");
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const handleGoogleLoginSuccess = async (payload: any) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(payload.getAuthResponse().id_token);
    const result = await firebase.auth().signInWithCredential(credential);
    const user = result.user;
    if (user) {
      setToken(await user.getIdToken());
    }
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