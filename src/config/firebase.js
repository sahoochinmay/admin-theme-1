import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
// initialize app
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore()