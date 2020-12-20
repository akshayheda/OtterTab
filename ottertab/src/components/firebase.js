import firebase from "firebase/app";
import "firebase/firestore";

// config to initialize firebase. Pulls apikey from secret env variables.
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FSAPI_API_KEY,
    authDomain: "ottertest2.firebaseapp.com",
    projectId: "ottertest2",
    storageBucket: "ottertest2.appspot.com",
    messagingSenderId: "96019149760",
    appId: "1:96019149760:web:7ca4672e57304bcab44e25"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;