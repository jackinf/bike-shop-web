import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import moment from 'moment';

import config from '../../config';
import { ContextSettings, ErrorInfo, TokenMetadata } from './types';
import { GoogleLoginResponse } from 'react-google-login';
import isUserEqual from './isUserEqual';

interface Props {
  children: any;
}

export const AuthContext = React.createContext<ContextSettings>({
  loading: true,
  emailLoginInProgress: false,
  token: undefined,
  tokenMetadata: undefined,
  errorInfo: null,
  clearErrorInfo: () => {},
  handleEmailLogin: () => {},
  handleGoogleLoginFailure: () => {},
  handleGoogleLoginSuccess: () => Promise.resolve(),
  handleLogout: () => {},
  handleRefreshToken: () => {},
});


async function fetchToken(user: any, setTokenMetadata: Function, setToken: Function) {
  const token = await user.getIdToken(true);
  const expirationDate = moment().add(1, 'hours');
  setToken(token);
  if (token) {
    setTokenMetadata({ token, refreshToken: user.refreshToken, expirationDate });
  }
}

const AuthProvider = (props: Props) => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  const [token, setToken] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | undefined>(undefined);
  const [emailLoginInProgress, setEmailLoginInProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        fetchToken(user, setTokenMetadata, setToken);
      } else {
        setToken("");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const clearErrorInfo = () => setErrorInfo(null);

  const handleEmailLogin = async (email: string, pass: string) => {
    setEmailLoginInProgress(true);
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(email, pass);
      const user = result.user;
      if (user) {
        setToken(await user.getIdToken());
      }
    } catch (ex) {
      const { code, message } = ex;
      setErrorInfo({ code, message });
    } finally {
      setEmailLoginInProgress(false);
    }
  };

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

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setToken("");
  };

  const handleRefreshToken = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      fetchToken(user, setTokenMetadata, setToken);
    } else {
      setToken("");
    }
  }

  const googleClientId = config.google.clientId;
  if (!googleClientId) {
    return <div>No google Client Id specified</div>
  }

  return (
    <AuthContext.Provider value={{
      loading,
      emailLoginInProgress,
      token,
      tokenMetadata,
      errorInfo,
      clearErrorInfo,
      handleEmailLogin,
      handleGoogleLoginFailure,
      handleGoogleLoginSuccess,
      handleLogout,
      handleRefreshToken
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
