// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "dugb-20d8f.firebaseapp.com",
  projectId: "dugb-20d8f",
  storageBucket: "dugb-20d8f.appspot.com",
  messagingSenderId: "1048130908514",
  appId: "1:1048130908514:web:54ea325296dc829d863c3b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db };
