import React, { useEffect, useState, useMemo } from "react";

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const logOut = () => {
  firebase.auth().signOut();
};

const logIn = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(provider));
};

export const FirebaseContext = React.createContext({});

const FirebaseProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();
  const [uid, setUid] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(user !== null);
      setUid(user === null ? null : user.uid);
    });
  }, []);

  const value = useMemo(
    () => ({
      actions: { logIn, logOut },
      values: { uid, isAuth },
    }),
    [uid, isAuth]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
