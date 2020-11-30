import React, { useEffect, useMemo, useState } from "react";
import firebase from "./firebase";

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
