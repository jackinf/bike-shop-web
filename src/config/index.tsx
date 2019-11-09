const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  },
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
  },
  stripe: {
    apikey: process.env.REACT_APP_STRIPE_PUBLIC_API
  },
  backend: {
    url: backendUrl
  },
  endpoints: {
    bikeTypes: {
      search: (q: string = '') => `${backendUrl}/bike-types/search?${q}`,
      searchBikes: (bikeTypeId: string, q: string = '') => `${backendUrl}/bike-types/${bikeTypeId}/bikes/search?${q}`
    },
    bikes: {
      search: () => `${backendUrl}/bikes/search`,
      add: () => `${backendUrl}/bikes/add`,
      update: () => `${backendUrl}/bikes/update`,
      remove: () => `${backendUrl}/bikes/remove`,
    },
    cart: {
      getCartItems: () => `${backendUrl}/carts/current-user`,
      addToCart: (bikeId: string) => `${backendUrl}/carts/current-user?bike_id=${bikeId}`,
      removeFromCart: (bikeId: string) => `${backendUrl}/carts/current-user?bike_id=${bikeId}`,
    },
    payments: {
      startSession: () => `${backendUrl}/payments/start-session`
    }
  }
}