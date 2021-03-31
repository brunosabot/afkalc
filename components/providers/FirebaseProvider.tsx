import React, { useCallback, useEffect, useMemo, useState } from "react";
import firebase from "./firebase";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

async function logOut() {
  await firebase.auth().signOut();
}

async function logInGoogle() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(googleAuthProvider));
}

async function logInFacebook() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(facebookAuthProvider));
}

async function logInTwitter() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(twitterAuthProvider));
}

async function logInAnonymously() {
  await firebase.auth().signInAnonymously();
}

async function reLogIn() {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    await currentUser.reauthenticateWithPopup(googleAuthProvider);
  }
}

interface IFirebaseActions {
  logInGoogle: () => Promise<void>;
  logInFacebook: () => Promise<void>;
  logInTwitter: () => Promise<void>;
  logInAnonymously: () => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  linkWithFacebook: () => Promise<void>;
  linkWithTwitter: () => Promise<void>;
  logOut: () => Promise<void>;
  reLogIn: () => Promise<void>;
}

interface IfirebaseValues {
  uid: string;
  isAuth: boolean;
  isAnonymous: boolean;
  isGoogle: boolean;
  isFacebook: boolean;
  isTwitter: boolean;
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
    logInGoogle: () => Promise.resolve(),
    logInFacebook: () => Promise.resolve(),
    logInTwitter: () => Promise.resolve(),
    logInAnonymously: () => Promise.resolve(),
    linkWithGoogle: () => Promise.resolve(),
    linkWithFacebook: () => Promise.resolve(),
    linkWithTwitter: () => Promise.resolve(),
    logOut: () => Promise.resolve(),
  },
  values: {
    uid: "",
    isAnonymous: true,
    isGoogle: false,
    isFacebook: false,
    isTwitter: false,
    isAuth: false,
  },
});

const FirebaseProvider: React.FC<IProps> = ({ children }) => {
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [isFacebook, setIsFacebook] = useState<boolean>(false);
  const [isTwitter, setIsTwitter] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");

  const handleUser = useCallback((user: firebase.User | null) => {
    setIsAuth(user !== null);
    setUid(user === null ? "" : user.uid);
    setIsAnonymous(user === null ? true : user.isAnonymous);
    setIsGoogle(
      user?.providerData.some((provider) => provider?.providerId === "google.com") ?? false
    );
    setIsTwitter(
      user?.providerData.some((provider) => provider?.providerId === "twitter.com") ?? false
    );
    setIsFacebook(
      user?.providerData.some((provider) => provider?.providerId === "facebook.com") ?? false
    );
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      handleUser(user);
    });
  }, [handleUser]);

  const linkWithGoogle = useCallback(async () => {
    const { currentUser } = firebase.auth();
    if (currentUser === null) return;

    const linkResult = await currentUser.linkWithPopup(googleAuthProvider);

    if (linkResult.credential) {
      const { user } = await firebase.auth().signInWithCredential(linkResult.credential);
      handleUser(user);
    }
  }, [handleUser]);

  const linkWithFacebook = useCallback(async () => {
    const { currentUser } = firebase.auth();
    if (currentUser === null) return;

    const linkResult = await currentUser.linkWithPopup(facebookAuthProvider);

    if (linkResult.credential) {
      const { user } = await firebase.auth().signInWithCredential(linkResult.credential);
      handleUser(user);
    }
  }, [handleUser]);

  const linkWithTwitter = useCallback(async () => {
    const { currentUser } = firebase.auth();
    if (currentUser === null) return;

    const linkResult = await currentUser.linkWithPopup(facebookAuthProvider);

    if (linkResult.credential) {
      const { user } = await firebase.auth().signInWithCredential(linkResult.credential);
      handleUser(user);
    }
  }, [handleUser]);

  const value = useMemo(
    () => ({
      actions: {
        reLogIn,
        logInGoogle,
        logInFacebook,
        logInTwitter,
        logInAnonymously,
        linkWithGoogle,
        linkWithFacebook,
        linkWithTwitter,
        logOut,
      },
      values: { uid, isAuth, isAnonymous, isGoogle, isFacebook, isTwitter },
    }),
    [
      linkWithGoogle,
      linkWithFacebook,
      linkWithTwitter,
      uid,
      isAuth,
      isAnonymous,
      isGoogle,
      isFacebook,
      isTwitter,
    ]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
