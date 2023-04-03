// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDfXl150ftZHFXglgzTBPlmKAznjiZ_zFw",
  authDomain: "ember-cliffs.firebaseapp.com",
  projectId: "ember-cliffs",
  storageBucket: "ember-cliffs.appspot.com",
  messagingSenderId: "894620171671",
  appId: "1:894620171671:web:f2ddcaa7fd00430e4e18d2",
  measurementId: "G-1BDB5LQ3LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);