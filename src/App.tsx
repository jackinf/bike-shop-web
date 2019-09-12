import React, {useState} from 'react';
import firebase from 'firebase/app';
import GoogleLogin from 'react-google-login';
import { config } from './index';

const App: React.FC = () => {
  const [token, setToken] = useState("");

  const handleGoogleLoginSuccess = async (payload: any) => {
    console.log(`Success!`, payload);
    const credential = firebase.auth.GoogleAuthProvider.credential(payload.getAuthResponse().id_token);
    const result = await firebase.auth().signInWithCredential(credential);
    console.log(result);
    const user: any = result.user;
    const token = await user.getIdToken();
    setToken(token);
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Failed', error);
  };

  const googleClientId = config.google.clientId;
  if (!googleClientId) {
    return <div>No google Client Id specified</div>
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login"
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
      <p>
        {token}
      </p>
    </div>
  );
}

export default App;
