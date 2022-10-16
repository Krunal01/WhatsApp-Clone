// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAHfqn_skSdZCnHDbeP3abyHQtof74ZlwI",
  authDomain: "krunal-whats-app-clone.firebaseapp.com",
  projectId: "krunal-whats-app-clone",
  storageBucket: "krunal-whats-app-clone.appspot.com",
  messagingSenderId: "34683224371",
  appId: "1:34683224371:web:cd51acab4030b18f57be46",
  measurementId: "G-297NJ6SGCP",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
