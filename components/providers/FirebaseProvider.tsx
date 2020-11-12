import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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

interface IFirebaseActions {
  logIn: () => void;
  logOut: () => void;
}

interface IfirebaseValues {
  uid: string;
  isAuth: boolean;
}

interface IFirebaseContext {
  actions: IFirebaseActions;
  values: IfirebaseValues;
}

interface IProps {
  children: React.ReactNode;
}

export const FirebaseContext = React.createContext<IFirebaseContext>({
  actions: { logIn: () => undefined, logOut: () => undefined },
  values: { uid: "", isAuth: false },
});

const FirebaseProvider: React.FC<IProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(user !== null);
      setUid(user === null ? "" : user.uid);
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
