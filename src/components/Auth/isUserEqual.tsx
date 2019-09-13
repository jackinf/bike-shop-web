import { GoogleLoginResponse } from 'react-google-login';
import firebase from 'firebase/app';

export default function isUserEqual(googleUser: GoogleLoginResponse, firebaseUser: firebase.User) {
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
