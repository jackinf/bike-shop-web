import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

import { config } from './index';

const App: React.FC = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setToken(await user.getIdToken());
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
    <div className="App">
      {!!token ? (
        <div>
          <GoogleLogout
            clientId={googleClientId}
            buttonText="Logout"
            onLogoutSuccess={handleGoogleSignOut}
          />
          <p>
            {token}
          </p>
        </div>
      ) : (
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default App;
