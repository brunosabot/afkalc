import React, { useEffect, useMemo, useState } from "react";
import firebase from "./firebase";

const provider = new firebase.auth.GoogleAuthProvider();

async function logOut() {
  await firebase.auth().signOut();
}

async function logIn() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(provider));
}

async function reLogIn() {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    await currentUser.reauthenticateWithPopup(provider);
  }
}

interface IFirebaseActions {
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
  reLogIn: () => Promise<void>;
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
  actions: {
    reLogIn: () => Promise.resolve(),
    logIn: () => Promise.resolve(),
    logOut: () => Promise.resolve(),
  },
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
      actions: { reLogIn, logIn, logOut },
      values: { uid, isAuth },
    }),
    [uid, isAuth]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
