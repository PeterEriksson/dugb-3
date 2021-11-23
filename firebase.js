/* https://github.com/vercel/next.js/issues/1999 */

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "dugb-20d8f.firebaseapp.com",
  projectId: "dugb-20d8f",
  storageBucket: "dugb-20d8f.appspot.com",
  messagingSenderId: "1048130908514",
  appId: "1:1048130908514:web:54ea325296dc829d863c3b",
};

// Initialize Firebase
/* const firebaseApp = firebase.initializeApp(firebaseConfig); */
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

//access the db
const db = firebaseApp.firestore();

//log in, log out, create users
const auth = firebase.auth();

export { db, auth };
